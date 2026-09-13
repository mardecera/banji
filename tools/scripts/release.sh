#!/usr/bin/env bash
set -euo pipefail

# Usage: release.sh <patch|minor|major> <apps-comma-separated> <summary> <notes-file>
BUMP_TYPE="${1:?Bump type required: patch|minor|major}"
APPS="${2:?Apps required, e.g. banji-web,banji-go}"
SUMMARY="${3:?Summary required}"
NOTES_FILE="${4:?Notes file path required}"

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT"

PYTHON=""
if command -v python3 >/dev/null 2>&1; then
  PYTHON="python3"
elif command -v python >/dev/null 2>&1; then
  PYTHON="python"
else
  echo "Error: Python is required but not installed (python3 or python)." >&2
  exit 1
fi

if ! command -v gh >/dev/null 2>&1; then
  echo "Error: GitHub CLI (gh) is required but not installed." >&2
  exit 1
fi

if [[ "$(git branch --show-current)" != "main" ]]; then
  echo "Error: releases must be created from the main branch." >&2
  exit 1
fi

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Error: working tree must be clean before releasing." >&2
  exit 1
fi

NEW_VERSION="$("$PYTHON" - "$BUMP_TYPE" <<'PY'
import json
import re
import sys

bump = sys.argv[1]
with open("package.json", encoding="utf-8") as f:
    data = json.load(f)

match = re.match(r"^(\d+)\.(\d+)\.(\d+)$", data.get("version", "0.0.0"))
if not match:
    raise SystemExit("Invalid version in package.json")

major, minor, patch = map(int, match.groups())
if bump == "major":
    major, minor, patch = major + 1, 0, 0
elif bump == "minor":
    minor, patch = minor + 1, 0
elif bump == "patch":
    patch += 1
else:
    raise SystemExit(f"Unknown bump type: {bump}")

data["version"] = f"{major}.{minor}.{patch}"
with open("package.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2)
    f.write("\n")

print(data["version"])
PY
)"

TAG="v${NEW_VERSION}"

git add package.json
git commit -m "chore: release ${TAG}"
git tag "${TAG}"
git push origin main
git push origin "${TAG}"

gh release create "${TAG}" \
  --title "${TAG}" \
  --notes-file "${NOTES_FILE}" \
  --generate-notes

echo "Released ${TAG}"
echo "Apps: ${APPS}"
echo "Summary: ${SUMMARY}"
