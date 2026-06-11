#!/usr/bin/env bash
# Build a single day's deck to PDF (renders diagrams first).
#
# Usage:
#   yarn build:day 2026-06-02   # build that day's deck
#   yarn build:day              # build the latest dated deck
set -euo pipefail
shopt -s nullglob

if [ $# -lt 1 ]; then
  # No date given: pick the latest dated deck (YYYY-MM-DD sorts chronologically).
  latest=""
  for f in slides/[0-9]*.md; do latest="$f"; done   # last after glob sort = newest
  [ -n "$latest" ] || { echo "No dated decks found in slides/" >&2; exit 1; }
  day="$(basename "${latest%.md}")"
  echo "No date given — building the latest deck: $day"
else
  # Accept "2026-06-02", "2026-06-02.md", or "slides/2026-06-02.md"
  day="${1##*/}"        # strip any leading path
  day="${day%.md}"      # strip a trailing .md
fi
file="slides/${day}.md"

if [ ! -f "$file" ]; then
  echo "No such deck: $file" >&2
  exit 1
fi

bash ./scripts/build-diagrams.sh "$day"
marp --config-file ./marp.config.js --pdf --allow-local-files "$file"
