---
sidebar_position: 4
---

# isValid

```ts
function isValid(): boolean
```

Checks if the contained date is valid. If an incorrect type is passed to a function, the date may become invalid **without warning**. Be careful!

```ts
const invalid = new Chronosis('some random string')
// Returns false.
invalid.isValid()
```
