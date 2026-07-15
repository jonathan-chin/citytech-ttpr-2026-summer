# Interactive Charts with Plotly

A short demo of **Plotly**, contrasted with seaborn: seaborn makes **static** charts
(good for a report), Plotly makes **interactive** ones (good for a dashboard) that
you can hover, zoom, pan, and filter.

It uses real data, not invented data: the **2018 Central Park Squirrel Census**
(3,023 squirrels) from
[NYC Open Data](https://data.cityofnewyork.us/Environment/2018-Central-Park-Squirrel-Census-Squirrel-Data/vfnx-vebw)
(dataset `vfnx-vebw`).

## The point

Each squirrel has an `x` (longitude) and `y` (latitude), so plotting them traces out
**Central Park**. The notebook maps the squirrels by fur color and by age, charts
their activities, and exports a figure to a standalone web page.

> **Run this notebook to see the interactivity.** On GitHub the charts look static;
> live in Jupyter you can hover a point, drag to zoom, and click the legend to hide
> a series.

## Files

- **`plotly_intro.ipynb`** - the demo
- **`squirrel_census.csv`** - the full dataset (3,023 rows)

The same CSV also lives in `../eda-squirrel/`. Each demo keeps its own copy so it
runs standalone.

## Run

```bash
pip install pandas plotly jupyter   # if you don't have them
jupyter lab                         # or: jupyter notebook
```

Open `plotly_intro.ipynb` and run the cells top to bottom
(**Kernel > Restart Kernel and Run All Cells** for a clean pass).

## Takeaway

- **Seaborn**: static charts for a **report** or a slide.
- **Plotly**: interactive charts for a **dashboard** or exploration.
- Same data, two jobs, pick the tool that fits how the chart will be used.
