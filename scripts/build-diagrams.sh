#!/usr/bin/env bash
# Render Mermaid sources (slides/diagrams/*.mmd) to sibling SVGs.
#
# Usage:
#   bash scripts/build-diagrams.sh              # render every diagram
#   bash scripts/build-diagrams.sh 2026-06-08   # render only the diagrams
#                                               # referenced by that day's deck
set -euo pipefail
shopt -s nullglob

render_one() {
  local src="$1"
  echo "mermaid: $src -> ${src%.mmd}.svg"
  mmdc --input "$src" --output "${src%.mmd}.svg" --backgroundColor transparent
}

if [ $# -ge 1 ]; then
  # Render only the diagrams referenced by a specific day's deck.
  day="${1##*/}"        # strip any leading path
  day="${day%.md}"      # strip a trailing .md
  deck="slides/${day}.md"
  if [ ! -f "$deck" ]; then
    echo "No such deck: $deck" >&2
    exit 1
  fi
  names=$(grep -oE 'diagrams/[A-Za-z0-9_-]+\.svg' "$deck" \
            | sed -E 's#diagrams/##; s#\.svg$##' | sort -u || true)
  if [ -z "$names" ]; then
    echo "No diagrams referenced in $deck — nothing to render."
    exit 0
  fi
  for n in $names; do
    src="slides/diagrams/${n}.mmd"
    if [ -f "$src" ]; then
      render_one "$src"
    elif [ -f "slides/diagrams/${n}.svg" ]; then
      : # SVG authored directly (matplotlib/seaborn output, or hand-written).
        # There is no Mermaid source to render from, and none is expected.
    else
      echo "ERROR: $deck references $n, but neither slides/diagrams/${n}.mmd nor slides/diagrams/${n}.svg exists" >&2
      missing=1
    fi
  done
  if [ "${missing:-0}" -eq 1 ]; then
    exit 1
  fi
else
  # No argument: render every diagram.
  for src in slides/diagrams/*.mmd; do
    render_one "$src"
  done
fi
