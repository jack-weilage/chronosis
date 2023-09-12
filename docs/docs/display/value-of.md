---
sidebar_position: 4
---

# valueOf

```ts
function valueOf(): number
```

Converts the contained date to milliseconds since epoch (Jan 1, 1970).

```ts
const first = new Chronosis('2023-06-13')
const second = new Chronosis('2022-06-13')
// Returns true.
first.valueOf() > second.valueOf()
```
