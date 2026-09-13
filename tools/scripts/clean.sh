#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT"

echo "Cleaning $ROOT"

count=0
while IFS= read -r -d '' dir; do
  path="$ROOT/${dir#./}"
  echo "Removing $path"
  rm -rf "$path"
  count=$((count + 1))
done < <(
  find . -type d \( \
    -name node_modules -o \
    -name .turbo -o \
    -name dist -o \
    -name .next -o \
    -name coverage \
  \) -prune -print0 | sort -z
)

echo "Removed $count directories."
