---
sidebar_position: 2
---

# set

```ts
function set(unit: TimeUnit, value: number): Chronosis
```

Sets `unit` to `value`, returning a new object.

```ts
const now = new Chronosis()
// Sets the current month to June
const now_in_june = now.set('month', 5)
```

## Edge Cases

If `unit` isn't a valid [`TimeUnit`](../utility/types.md#timeunit), or `value` isn't a number, this function returns an invalid date.

```ts
const invalid = now.set('invalid', 4)
const also_invalid = now.set('month', false)
const really_invalid = now.set('invalid', {})
```

If called with a value greater than can fit in the unit (e.g. 130 seconds), the value wraps around to the next unit.

```ts
// Adds 2 minutes and sets seconds to 10
const later = now.set(130, 'seconds')
```
