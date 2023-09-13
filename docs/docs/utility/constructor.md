---
sidebar_position: 2
---

# constructor

```ts
constructor(datelike?: DateLike): Chronosis
```

Creates a new `Chronosis` object. If `datelike` is undefined, the contained date will be set to now. If `datelike` is defined, the contained date will be set to an interpretation of `datelike`. This interpretation is done via the built-in `Date`.

```ts
const now = new Chronosis()
const specific = new Chronosis('1995-06-21')
```
