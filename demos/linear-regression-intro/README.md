# Linear Regression Intro (scikit-learn)

A short Jupyter notebook that trains a first **machine learning** model. It predicts
the **monthly rent** of a NYC apartment from features like its **size**, distance to
the **subway**, and distance to **Manhattan**.

The point is how little code it takes. Every scikit-learn model follows the same
rhythm: **make** the model, **fit** it, then **predict** with it.

## What it covers

- Load the data and pick **features** (`X`, always 2D) and a **target** (`y`, 1D)
- `make -> fit -> predict` with `LinearRegression`
- Read what it learned: `coef_`, `intercept_`, and `score()` (R-squared)
- Plot the fitted **line** over the data (rent vs size)
- Use a **correlation heatmap** to pick good features (and spot useless ones)
- Add more features (subway distance, bedrooms, ...) and watch R-squared improve
- Predict the rent for a specific described apartment
- Split into train and test rows, the way you would in practice

## Data

`nyc_rent.csv` is **invented (synthetic) data**, generated for teaching. The patterns
are realistic (bigger and closer-in apartments cost more), but the rows are **not real
listings**, so the numbers should not be cited. Columns:

| column | meaning |
| --- | --- |
| `size_sqft` | apartment size (square feet) |
| `bedrooms` | number of bedrooms (0 = studio) |
| `subway_min` | walking minutes to the nearest subway |
| `dist_manhattan_mi` | miles to Midtown Manhattan |
| `building_age` | age of the building (years) |
| `days_listed` | days the listing has been up (a deliberately useless feature) |
| `rent` | monthly rent in dollars (the target) |

## Run

```bash
jupyter lab        # then open linear_regression_intro.ipynb
```

Missing a package? Install it from a notebook cell:

```python
%pip install pandas scikit-learn matplotlib
```

## Where to look

- **`linear_regression_intro.ipynb`** — the walkthrough, cell by cell
- **`nyc_rent.csv`** — the bundled (synthetic) dataset
