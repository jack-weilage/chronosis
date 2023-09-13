---
sidebar_position: 4
---

# subtract

```ts
function subtract(count: number, unit: TimeUnit): Chronosis
```

Subtracts `count` of `unit` from the contained date, returning a new object.

```ts
const now = new Chronosis()
// Subtracts 1 day from the current date.
const yesterday = now.subtract(1, 'day')
```

If called with a value greater than can fit in the unit (e.g. 130 seconds), the value wraps around to the next unit.

```ts
// Subtracts 2 minutes and 10 seconds from the current date.
const later = now.add(130, 'seconds')
```

If called without a `unit`, the unit is assumed to be milliseconds.

```ts
// Subtracts 1000 milliseconds from the current date.
const recently = now.add(1000)
```
