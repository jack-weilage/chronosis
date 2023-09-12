---
sidebar_position: 5
---

# startOf

```ts
function startOf(unit: TimeUnit): Chronosis
```

Sets the contained date to the start of `unit`, returning a new object.

```ts
const now = new Chronosis()
// Sets the contained date to the exact start of the current hour
const start_of_hour = now.startOf('hour')
```
