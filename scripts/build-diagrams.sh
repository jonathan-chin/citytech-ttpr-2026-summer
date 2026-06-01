#!/usr/bin/env bash
# Render every Mermaid source (slides/diagrams/*.mmd) to a sibling SVG.
# Invoked by `yarn build:diagrams` (and indirectly by `yarn build:slides`).
set -euo pipefail

shopt -s nullglob
for f in slides/diagrams/*.mmd; do
  echo "mermaid: $f -> ${f%.mmd}.svg"
  mmdc --input "$f" --output "${f%.mmd}.svg" --backgroundColor transparent
done
