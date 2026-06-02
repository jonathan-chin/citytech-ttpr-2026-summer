#!/usr/bin/env python3
"""Generate example EDA visualizations used in the Day 2 slides.

Produces slides/images/eda-examples.png — a histogram (distribution of a
single variable) and a scatter plot (relationship between two variables),
the two charts you most often create while first exploring a dataset.

Run from the repo root:  python3 scripts/build-eda-charts.py
"""
import os

import numpy as np
import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt

rng = np.random.default_rng(42)

fig, axes = plt.subplots(1, 2, figsize=(11, 4.2))

# 1) Histogram — distribution of a single variable
ages = rng.normal(34, 8, 1000)
axes[0].hist(ages, bins=20, color="#4C72B0", edgecolor="white")
axes[0].set_title("Histogram — distribution of customer age")
axes[0].set_xlabel("Age")
axes[0].set_ylabel("Count")

# 2) Scatter — relationship between two variables
hours = rng.uniform(0, 10, 200)
score = 50 + 4.5 * hours + rng.normal(0, 6, 200)
axes[1].scatter(hours, score, color="#C44E52", alpha=0.6,
                edgecolor="white", linewidth=0.3)
axes[1].set_title("Scatter — study hours vs. exam score")
axes[1].set_xlabel("Hours studied")
axes[1].set_ylabel("Exam score")

fig.tight_layout()
os.makedirs("slides/images", exist_ok=True)
out = "slides/images/eda-examples.png"
fig.savefig(out, dpi=150)
print(f"wrote {out}")
