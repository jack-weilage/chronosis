---
sidebar_position: 6
---

# endOf

```ts
function endOf(unit: TimeUnit): Chronosis
```

Sets the contained date to the end of `unit`, returning a new object.

```ts
const now = new Chronosis()
// Sets the contained date to the exact end of the current day
const midnight = now.endOf('day')
```
