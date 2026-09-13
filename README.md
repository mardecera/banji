# Banji Monorepo

Turborepo + pnpm monorepo with three Next.js apps and shared packages.

## Requirements

- Node.js 24+
- pnpm 10+
- Python 3 (optional, for icon barrel generation)
- GitHub CLI (`gh`, optional, for `/release`)

## Apps

| App | Port | Command |
|-----|------|---------|
| banji-web | 3000 | `pnpm --filter banji-web dev` |
| banji-go | 3001 | `pnpm --filter banji-go dev` |
| banji-crypt | 3002 | `pnpm --filter banji-crypt dev` |

With a single app, run `pnpm package:watch` in another terminal so shared packages rebuild on change.

## Packages

- `@banji/ui` — Button
- `@banji/ui/client` — LocaleSwitcher, ThemeToggle
- `@banji/contexts` — ThemeProvider
- `@banji/i18n` — shared routing, navigation, canonical helpers
- `@banji/utils` — utilities (`capitalize`)
- `@banji/hooks` — React hooks (`useToggle`)
- `@banji/assets` — icons, illustrations, images, fonts

## Scripts

```bash
pnpm install
pnpm dev            # apps in TUI; packages rebuild in the background
pnpm package:watch  # rebuild packages on change (use with a single app)
pnpm compile        # rebuild shared packages once
pnpm build          # build all
pnpm verify         # lint + types + tests
pnpm clean          # remove artifacts
```

## i18n

Locales: `es` (default), `en`. Language lives in the URL path only (`/es`, `/en`). No locale cookie.

## Release

Use the Cursor command `/release` to analyze commits, propose semver bump, and create a GitHub Release via `tools/scripts/release.sh`.

## Deploy (Vercel)

Create one Vercel project per app with:

- Root Directory: `apps/banji-web` (or go/crypt)
- Install: `pnpm install`
- Build: `cd ../.. && pnpm turbo build --filter=banji-web`
