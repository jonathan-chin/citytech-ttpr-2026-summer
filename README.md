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
│   ├── diagrams/               # Mermaid diagrams used in the slides
│   │   ├── *.mmd                  # Mermaid source
│   │   └── *.svg                  # Generated SVG (built from the .mmd)
│   └── assets/                 # Images embedded in slides (e.g. comics)
├── project_specs/          # Project / assignment sheets
│   ├── name.md                 # Markdown source
│   └── name.pdf                # Generated PDF (built from the .md)
├── data/                   # Sample databases for code-alongs (e.g. *.sqlite)
├── demos/                  # Runnable in-class demo apps (not for students to fork)
├── scripts/                # Build scripts
├── course_outline.pdf      # The 12-week curriculum outline
├── lessons_learned.md      # Ideas for refining the program next time
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

## Demos

Runnable in-class demo apps live in `demos/`. They are reference material, not
starter code for students to fork.

### Live coding demos (code-alongs)

Several demos are **code-alongs**: in class I start from a **blank or lightly
scaffolded** project and we build it up **live, together** with the students. The
version committed here is the **finished** (or scaffolded starting) result,
pushed so students can **review** it afterward.

If you are an **educator** using this repo as a model or reference, treat these
as **build-from-scratch** exercises: start with an empty (or freshly scaffolded)
project and code along with your own students, rather than handing over the
finished files provided here.

The code-along demos, and the sessions they appear in:

- **`demos/ionic-chat-app`**: Ionic + React + React Hook Form chat app, committed
  as the blank Ionic starter and built up live (`2026-07-01`)
- **`demos/react-chat-app`**: plain-React "fake chatroom," the vanilla
  DOM-handling version built together (`2026-06-08`)
- **`demos/tanstack-polling`**: TanStack Query polling client plus a tiny Express
  server (`2026-07-01`, `2026-07-02`)
- **`demos/eda-squirrel/squirrel_eda.ipynb`**: squirrel-census EDA notebook
  explored and extended live (`2026-07-06`, `2026-07-07`)

The other items in `demos/` are **reference examples** or **practice datasets**
(for example `eda-murals/` and `eda-fridge/` provide messy data for students to
wrangle in their own notebooks), not live builds.

## Course outline

[`course_outline.pdf`](course_outline.pdf) is the 12-week
curriculum: full-stack web development, AI-assisted coding, secure development,
data science, networking & security, and a student-driven capstone.

## Lessons learned

[`lessons_learned.md`](lessons_learned.md) collects ideas for refining the
program in future runs — things worth doing differently next time, written up as
they come up during the course.

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
