# CityTech TTP Summer Bootcamp

[![Content: CC BY-NC-SA 4.0](https://img.shields.io/badge/Content-CC%20BY--NC--SA%204.0-blue.svg)](LICENSE) [![Tooling: MIT](https://img.shields.io/badge/Tooling-MIT-green.svg)](LICENSE)

Documentation, slides, and supporting files for the CityTech TTP 12-week summer
coding bootcamp.

## Repository layout

```
.
├── slides/                 # Lecture decks — one file per session
│   ├── YYYY-MM-DD.md           # Marp-format Markdown source
│   ├── YYYY-MM-DD.pdf          # Generated PDF (built from the .md)
│   └── diagrams/               # Mermaid diagrams used in the slides
│       ├── *.mmd                  # Mermaid source
│       └── *.svg                  # Generated SVG (built from the .mmd)
├── project_specs/          # Project / assignment sheets
│   ├── name.md                 # Markdown source
│   └── name.pdf                # Generated PDF (built from the .md)
├── scripts/                # Build scripts
├── course_outline.pdf      # The 12-week curriculum outline
├── marp.config.js          # Marp CLI configuration
└── package.json
```

## Slides

Each session's deck lives in `slides/` as a [Marp](https://marp.app/)-format
Markdown file named for its date: `YYYY-MM-DD.md`. The matching
`YYYY-MM-DD.pdf` is generated from that source — **don't edit the PDF by hand.**

### Diagrams (Mermaid)

Diagrams are authored in [Mermaid](https://mermaid.js.org/) under
`slides/diagrams/` as `*.mmd` files and pre-rendered to `*.svg` at build time
(this avoids the text-clipping issues of rendering Mermaid live in a PDF).

To add a diagram:

1. Create `slides/diagrams/my-diagram.mmd`.
2. Reference the generated SVG from a slide, e.g.
   `![Alt text w:780](diagrams/my-diagram.svg)`.
3. Run `yarn build:slides` (which renders diagrams first).

### Building

```bash
yarn install                 # first time only
yarn build:slides            # render diagrams, then build every slides/*.md → *.pdf
yarn build:day 2026-06-02    # build just one day's deck → slides/2026-06-02.pdf
```

Other helpers:

- `yarn build:diagrams [YYYY-MM-DD]` — render all diagrams, or only the ones a given day's deck references
- `yarn watch:slides` — rebuild PDFs on save
- `yarn preview:slides` — live preview server in the browser

`build:day` accepts the date with or without the extension
(`2026-06-02` or `2026-06-02.md`). With **no argument**, it builds the
**latest** dated deck.

## Project specs

Project / assignment sheets live in `project_specs/` as Markdown
(`snake_case.md`), and render on GitHub as-is. Each has a matching PDF handout
built from the source — **don't edit the PDF by hand.**

```bash
yarn build:project_specs                          # build every project_specs/*.md → *.pdf
yarn build:project_spec college_schedule_builder  # build just one
```

Files named with a leading underscore (e.g. `_template.md`) are skipped.
PDFs render via pandoc → headless Chrome (the Puppeteer Chromium).

> Both the PDF export and Mermaid rendering use a headless Chromium under the
> hood (via Marp CLI / mermaid-cli + Puppeteer), downloaded automatically on
> `yarn install`.

## Course outline

[`course_outline.pdf`](course_outline.pdf) is the 12-week
curriculum: full-stack web development, AI-assisted coding, secure development,
data science, networking & security, and a student-driven capstone.

## License

This repository is **dual-licensed**:

- **Course content** (slides, documentation, diagrams) — [CC BY-NC-SA 4.0](LICENSE):
  share and adapt with attribution, non-commercially, and under the same license.
- **Build tooling** (`scripts/`, `marp.config.js`, `package.json`) — [MIT](LICENSE).

See [`LICENSE`](LICENSE) for full terms.

---

## A note on AI assistance

Claude helps Jon Chin build and maintain this repository (scaffolding,
formatting, and editing). All ideas, curriculum decisions, and content direction
are Jon Chin's own, and everything here is critically reviewed and edited by him
before it is used.
