# EDA Demo: NYC Squirrel Census

A pandas exploratory-data-analysis walkthrough on the **2018 Central Park
Squirrel Census**.

- **`squirrel_census.csv`** — the full dataset (3,023 rows), from
  [2018 Central Park Squirrel Census - Squirrel Data](https://data.cityofnewyork.us/Environment/2018-Central-Park-Squirrel-Census-Squirrel-Data/vfnx-vebw)
  on NYC Open Data (dataset `vfnx-vebw`)
- **`squirrel_eda.ipynb`** — explores pandas' built-in EDA tools:
  `head`, `tail`, `shape`, `info`, `sample`, `describe`,
  `mean` / `median` / `std` / `min` / `max` / `quantile`,
  `value_counts`, `unique` / `nunique`, `isna`, and `dropna`

## Run

```bash
pip install pandas jupyter   # if you don't have them
jupyter lab                  # or: jupyter notebook
```

Open `squirrel_eda.ipynb` and run the cells top to bottom
(**Kernel > Restart Kernel and Run All Cells** for a clean pass).
