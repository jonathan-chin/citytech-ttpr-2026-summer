# CLAUDE.md for `project_specs/`

Assignment and project sheets in Markdown, each building to a sibling PDF via pandoc then
headless Chrome. Build one with `yarn build:project_spec name`, or all with
`yarn build:project_specs`. Files starting with `_` (for example `_template.md`) are
skipped. See the root `CLAUDE.md` for writing conventions.

- **Don't edit the `.pdf`;** edit the `.md` and rebuild.
- Styling is shared across every spec via `../scripts/spec.css`. A change there affects
  all spec PDFs, so rebuild the ones you care about to see it.
- pandoc uses **soft line breaks**: a lone newline renders as a space, joining lines into
  one paragraph. To force a break within a paragraph (for example a stacked metadata
  header), end the line with a backslash `\`.
- Nested sub-lists under a bullet need **4-space** indentation to render as a sublist.
- `spec.css` top-aligns table cells and draws row separators; plain Markdown tables pick
  this up automatically.
- Follow the root conventions: no em or en dashes, and prefer "and" over "&".
