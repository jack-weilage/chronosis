---
sidebar_position: 1
---

# get

```ts
function get(unit: TimeUnit): number
```

Returns the value of `unit` as a number.

```ts
const now = new Chronosis()
// Retrieves the current month
const month = now.get('month')
```

:::note
If you need a way to retrive the name of a unit (e.g. July or Monday), see [`format`](../display/format/format.mdx).
:::
