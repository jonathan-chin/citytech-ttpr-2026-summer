# Group Project: Data for a Better NYC

**Assigned:** 2026-07-15  ·  **Due:** 2026-07-21 (in-class presentations)  ·  **Team size:** 2

## Purpose

- To practice the full **data workflow**: collect, clean, analyze, visualize, and interpret.
- To **combine more than one dataset** to answer a question a single dataset cannot.
- To apply this week's skills: **seaborn** charts, **rates vs counts**, **disaggregation**, **reshaping**, and **reading correlation** carefully.
- To use real data to propose a **change that would make life better for NYC residents**.
- To practice **communicating findings** to an audience.

## The Project

Pick a question about life in NYC, then use data to explore it and make a recommendation. This is the same idea as Monday's pair activity, taken further: a deeper analysis, more than one dataset, and a presentation.

**Start with a question, not a dataset.** Let the data lead you to better questions.

## Requirements

- Work in **teams of 2**.
- Use **at least two datasets**.
- **At least one** must come from **[NYC Open Data](https://opendata.cityofnewyork.us/)**.
- The datasets must actually **work together**: merged on a shared key, compared, or one giving **context** for the other (for example, population to turn counts into rates).
- Track your work in a **GitHub repo** with **commits from both members**.
- **Keep large data files out of git.** Add them to `.gitignore`, and instead put clear instructions for **obtaining each dataset** (a link plus any steps) in the **first cell** of your notebook, so a reader can reproduce your work.
- You may use **AI** at any stage, but **disclose** how and where you used it.

## Deliverables

**1. A Jupyter notebook** that reads like a **report**:

- **Markdown cells** explaining your reasoning around the code
- The **data cleaning / wrangling** you did
- **Static visualizations** (**seaborn** or matplotlib) that support your points
- A clear **insight** and a **recommendation**

**2. A short presentation** covering:

1. Your **initial questions**
2. How you **chose your datasets**
3. What you did during **cleaning**
4. Your **final visualizations**
5. How your **question evolved** (or didn't)
6. Your **final recommendations**

## Submission

- Push your final work to **GitHub**.
- Submit the repo link via the **submission form in Slack**.
- **Present in class on the due date.**

## What We're Looking For

- A **clear question** and an honest path to answering it.
- **Careful cleaning**: types, missing values, duplicates, outliers.
- **Rates, not just counts**, where the groups differ in size.
- **Effective, honest visualizations** that fit the question.
- A **defensible recommendation**, and awareness of what the data does **not** show.

## Tiered Learning Goals

Static **seaborn** charts are the required baseline. These are extra, on top of that:

- Add **interactive** charts with **Plotly** (or **Recharts** in a web app), and export one to a standalone **HTML** page.
- Bring in **3 or more datasets** for extra context.
- Fit a simple **machine-learning model** (for example, linear regression or k-means clustering with scikit-learn) and explain what it found.
