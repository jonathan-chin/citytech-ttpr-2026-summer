# CLAUDE.md

Guidance for AI agents (and contributors) working in this repo. See `README.md` for
full build details, and the area-specific `CLAUDE.md` files linked below.

## What this is

Course materials for the CityTech TTP 12-week summer coding bootcamp: lecture slide
decks, project and assignment specs, and runnable in-class demos. Author and instructor:
Jon Chin. Everything here is reviewed and edited by Jon before it is used.

## Three build pipelines

| Area | Source | Output | Build one |
| --- | --- | --- | --- |
| `slides/` | `YYYY-MM-DD.md` (Marp) | sibling `.pdf` | `yarn build:day 2026-08-03` |
| `project_specs/` | `name.md` (pandoc) | sibling `.pdf` | `yarn build:project_spec name` |
| `demos/` | notebooks, Ionic/React apps | runnable | see each demo's README |

Every PDF is generated. **Never edit a `.pdf` by hand: edit the `.md` and rebuild.** PDF
and diagram rendering use a headless Chromium (Marp CLI, mermaid-cli, Puppeteer),
installed on `yarn install`.

Area-specific gotchas live in nested guides:

- `slides/CLAUDE.md`: the `---` seam trap, external SVGs, two-column layout
- `project_specs/CLAUDE.md`: pandoc plus the shared `spec.css`
- `demos/CLAUDE.md`: commit notebooks with outputs, Ionic quirks

## Writing conventions (student-facing content)

- **No em or en dashes** (`—` or `–`) in slides or specs. Use a hyphen, colon, or
  semicolon, or reword.
- Write **`git`** in lowercase when it means the tool, even in headings. Keep product
  names as written (GitHub, GitLab).
- Prefer **"and"** over **"&"** in prose. Keep `&` only inside a proper name (for
  example MITRE ATT&CK).

## Working norms

- **Build and ship only when asked.** Editing `.md` is fine anytime; building PDFs and
  committing or pushing happen only on explicit instruction.
- **Manual verification.** Jon reviews rendered PDFs and visuals himself. When a render is
  hard to check automatically, or a browser preview is flaky, do the cheap checks (build
  succeeded, seams and structure correct) and hand it off for a human look rather than
  fighting brittle automation.
- **Vet external media.** Before adding any image, comic, or link to student-facing
  content, confirm it is appropriate for the classroom.
- **Build PDFs, not PNGs.** Rendering a slide to PNG for a quick sanity check in a scratch
  directory is fine, but do not commit PNG renders of slides.
- **Don't narrate routine compliance.** When reporting edits, skip notes like "now
  dash-free" or "kept git lowercase"; these conventions are assumed.
- After editing a deck, **check slide seams** (see `slides/CLAUDE.md`).
- Keep commits scoped and focused. AI-assisted commits carry a `Co-Authored-By` trailer;
  match the existing history.

## Where things live

- `data/`: sample databases for code-alongs
- `scripts/`: build scripts and `spec.css`
- `reference_docs/`: course outline and setup guides
- `lessons_learned.md`: notes for improving the program next run
