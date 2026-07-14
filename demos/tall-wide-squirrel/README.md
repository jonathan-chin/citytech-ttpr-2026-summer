# Tall vs Wide: The Squirrel Census

A short demo of **data shape**: why `melt()` and `pivot_table()` exist, and why
plotting sometimes feels impossible until you reshape.

It uses real data, not invented data: the **2018 Central Park Squirrel Census**
(3,023 squirrels) from
[NYC Open Data](https://data.cityofnewyork.us/Environment/2018-Central-Park-Squirrel-Census-Squirrel-Data/vfnx-vebw)
(dataset `vfnx-vebw`).

## The point

The squirrel census stores each activity as its **own boolean column**
(`running`, `chasing`, `climbing`, `eating`, `foraging`). That is **wide** data:
the variable name `activity` is hiding in the **column headers**.

That makes a simple-sounding question surprisingly awkward:

> **Which activity is most common?**

seaborn needs **one column** to point `x` at, and there isn't one. The notebook
walks through three attempts to answer it **without reshaping**:

1. Plot a single activity (answers the wrong question)
2. Make five separate charts (hard to compare)
3. Hand-sum the columns (works, but drops out of the DataFrame and won't take a `hue`)

Then it reshapes with **`melt()`** and answers the question in one call, and gets
`hue` for free. Finally it uses **`pivot_table()`** to turn the result back into a
wide table a human can read.

## Files

- **`tall_wide_squirrel.ipynb`** - the demo
- **`squirrel_census.csv`** - the full dataset (3,023 rows)

The same CSV also lives in `../eda-squirrel/`. Each demo keeps its own copy so it
runs standalone.

## Run

```bash
pip install pandas seaborn jupyter   # if you don't have them
jupyter lab                          # or: jupyter notebook
```

Open `tall_wide_squirrel.ipynb` and run the cells top to bottom
(**Kernel > Restart Kernel and Run All Cells** for a clean pass).

## Takeaway

- **`melt()`**: wide -> long. The columns melt *down* into rows.
- **`pivot_table()`**: long -> wide. The rows pivot *up* into columns.
- **seaborn wants long. Reports want wide.**
