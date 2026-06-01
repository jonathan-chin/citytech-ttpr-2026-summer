// Marp CLI configuration.
// See https://github.com/marp-team/marp-cli#configuration-file
module.exports = {
  // Convert every Markdown file under ./slides into a sibling PDF.
  inputDir: './slides',
  output: undefined, // keep PDFs alongside their source .md (slides/YYYY-MM-DD.pdf)
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
