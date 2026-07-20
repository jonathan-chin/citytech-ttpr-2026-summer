# Train and Test (scoring a model honestly)

A short Jupyter notebook showing **why you hold rows back** when you score a model, and
what goes wrong when you do not.

It picks up where `../linear-regression-intro/` left off, using the same NYC rent data.

## What it covers

- The tempting mistake: `model.score(X, y)`, graded on the rows it trained on
- `train_test_split`: fit on **train**, score on **test**, and what `test_size` and
  `random_state` do
- A plot of **which rows the model learned from** and which it was graded on
- Widening to more features, still fitting on train and reporting test
- Reading the **gap** between the two scores

## Data

`nyc_rent.csv` is **invented (synthetic) data**, the same file used by
`../linear-regression-intro/`. The patterns are realistic, but the rows are **not real
listings**, so the numbers should not be cited.

## Run

```bash
jupyter lab        # then open train_test_split.ipynb
```

Missing a package? Install it from a notebook cell:

```python
%pip install pandas scikit-learn
```

## Where to look

- **`train_test_split.ipynb`** — the walkthrough, cell by cell
- **`nyc_rent.csv`** — the bundled (synthetic) dataset
