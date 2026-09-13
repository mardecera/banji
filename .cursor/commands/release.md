---
description: Create a GitHub release with semver bump, tag, and generated notes
disable-model-invocation: true
---

# /release — Banji GitHub Release

Create a production release from `main`. Analyze commits since the last `v*` tag, propose semver bump, fill the release template, confirm with the user, then run `tools/scripts/release.sh`.

## Prerequisites

- On branch `main` with a clean working tree
- `gh` authenticated (`gh auth status`)
- Python available (`python3` or `python`)

## Step 1 — Analyze commits

Run:

```bash
git describe --tags --abbrev=0 2>/dev/null || echo "no-tag"
git log "$(git describe --tags --abbrev=0 2>/dev/null)..HEAD" --oneline 2>/dev/null || git log --oneline
git diff --name-only "$(git describe --tags --abbrev=0 2>/dev/null)..HEAD" 2>/dev/null || git diff --name-only HEAD~20..HEAD
```

## Step 2 — Determine semver bump

Use Conventional Commits from the log:

| Signal | Bump |
|--------|------|
| `BREAKING CHANGE` or `feat!:` / `fix!:` | **major** |
| `feat:` | **minor** |
| `fix:`, `perf:`, `chore:`, `refactor:`, etc. | **patch** |

If commits are not conventional or ambiguous, **ask the user** — do not guess.

## Step 3 — Detect affected apps

From changed paths under `apps/`:

- `apps/banji-web/**` → `banji-web`
- `apps/banji-go/**` → `banji-go`
- `apps/banji-crypt/**` → `banji-crypt`

If only `packages/**` changed, list all three apps or ask the user.

## Step 4 — Fill release template

Use this exact template (replace placeholders):

```markdown
## Banji vX.Y.Z

- Date: YYYY-MM-DD
- Apps: banji-web, banji-go
- Summary: <one-line description of this release>

## Changes
```

Write the filled template to a temp file (e.g. `/tmp/banji-release-notes.md` or `.cursor/release-notes.md`).

## Step 5 — Preview and confirm

Show the user:

- Proposed bump type and new version (current root `package.json` version + bump)
- Affected apps
- Full release notes body

**Wait for explicit confirmation** before executing.

## Step 6 — Execute release

After confirmation:

```bash
bash tools/scripts/release.sh <patch|minor|major> "<apps-comma-separated>" "<summary>" "<notes-file>"
```

Example:

```bash
bash tools/scripts/release.sh patch "banji-web,banji-go" "Bug fixes for locale routing" ".cursor/release-notes.md"
```

Do **not** run git tag / gh release manually — always use the script.

## Rules

- Never push or tag without user confirmation
- Never edit the plan file
- If `release.sh` fails, report the error and do not retry automatically
