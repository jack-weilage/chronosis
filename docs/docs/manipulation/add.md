---
sidebar_position: 3
---

# add

```ts
function add(count: number, unit: TimeUnit): Chronosis
```

Adds `count` of `unit` to the contained date, returning a new object.

```ts
const now = new Chronosis()
// Adds 1 day to the current date.
const tomorrow = now.add(1, 'day')
```

If called with a value greater than can fit in the unit (e.g. 130 seconds), the value wraps around to the next unit.

```ts
// Adds 2 minutes and 10 seconds to the current date.
const later = now.add(130, 'seconds')
```

If called without a `unit`, the unit is assumed to be milliseconds.

```ts
// Adds 1000 milliseconds to the current date.
const soon = now.add(1000)
```
