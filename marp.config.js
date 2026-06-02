// Marp CLI configuration.
// See https://github.com/marp-team/marp-cli#configuration-file
module.exports = {
  // The input dir / file is passed on the CLI (see package.json scripts) so we
  // can build either every deck or a single day. Keep PDFs alongside their
  // source .md (slides/YYYY-MM-DD.pdf).
  output: undefined,
  allowLocalFiles: true,
  pdf: true,
  // Allow raw HTML in slides so we can embed Mermaid diagrams
  // (<div class="mermaid">…</div> plus the Mermaid loader script).
  html: true,
  options: {
    // Marpit/Marp Core options
    looseYAML: false,
  },
};
