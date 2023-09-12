---
sidebar_position: 3
---

# toString

```ts
function toString(): string
```

Calls the contained date's `toString` method.

```ts
const now = new Chronosis()
// Returns a simple string representation.
const string = now.toString()
```

:::note
If you are looking for more advanced stringification (for display to users, etc), see [`format`](./format/format.mdx).
:::
