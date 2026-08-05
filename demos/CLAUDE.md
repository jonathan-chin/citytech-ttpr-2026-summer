# CLAUDE.md for `demos/`

Runnable in-class demos and practice datasets. **Reference material, not starter code for
students to fork.** See `../README.md` for the code-along vs reference distinction and the
list of live-build demos.

## Jupyter notebooks

- **Commit notebooks WITH their outputs.** Execute top to bottom before committing, so the
  saved `.ipynb` includes rendered charts, tables, and stream output.
- **Bundle each notebook's own copy of its dataset** in the demo folder, so it runs
  standalone. Do not rely on a sibling demo's data file.
- Put generated artifacts (for example an exported `.html`) in a local `.gitignore`
  instead of committing them.

## Ionic and React apps

- Stack in use here: Ionic React with Vite and Capacitor, React 19, yarn 4
  (`nodeLinker: node-modules`); Recharts for charts.
- The demo's `.gitignore` must cover `/node_modules`, `/dist`, and
  `.yarn/install-state.gz`. Before committing, run `git add -n <demo>/` and confirm it
  stages only source.
- Recharts in this setup: set `isAnimationActive={false}` on marks. The mount animation
  can otherwise collapse a chart to near-zero height.

## Verify before committing

- Notebooks: re-run top to bottom and confirm there are no error cells.
- Apps: `yarn install`, `tsc --noEmit`, and a production build should all pass.
