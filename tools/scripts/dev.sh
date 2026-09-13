#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT"

LOG="$ROOT/.turbo/package-watch.log"
mkdir -p "$ROOT/.turbo"

echo "Compiling packages..."
pnpm exec turbo run build --filter=./packages/* --ui=stream

echo "Watching packages in the background (logs: $LOG)"
pnpm exec turbo watch build --filter=./packages/* --ui=stream >>"$LOG" 2>&1 &
WATCH_PID=$!

cleanup() {
  if kill -0 "$WATCH_PID" 2>/dev/null; then
    kill "$WATCH_PID" 2>/dev/null || true
    wait "$WATCH_PID" 2>/dev/null || true
  fi
}
trap cleanup EXIT INT TERM

pnpm exec turbo run dev --filter=./apps/* --only --ui=tui
