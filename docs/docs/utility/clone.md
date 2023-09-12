---
sidebar_position: 3
---

# clone

```ts
function clone(): Chronosis
```

Creates a clone of the current `Chronosis` object. `Chronosis` objects are already immutable, but `clone` can create a new clone if needed.

```ts
const base = new Chronosis()
const clone = new Chronosis()
// Returns true.
base.valueOf() === clone.valueOf()
```
