# State Management Demo (Ionic + React)

One Ionic app, three tabs, the same `AddItemButton` / `CartSummary` pair rebuilt
three ways - pairs with the `2026-08-06` mini workshop slide deck
(`../../slides/2026-08-06.md`).

- **No State** (`src/demos/no-state`): each component holds its own local
  `useState`. Click Add to Cart - Cart Summary never updates, because nothing
  connects the two.
- **Context** (`src/demos/context`): a `CartProvider` wraps both components;
  they read and update the same value through `useContext`.
- **Zustand** (`src/demos/zustand`): both components import a `useCartStore`
  hook directly - no provider, same result.

The file tree mirrors the comparison: three sibling folders, each holding an
`AddItemButton` and `CartSummary` wired up a different way.

## Run

```bash
yarn install
yarn dev        # or: ionic serve
```
