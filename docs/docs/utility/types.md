---
sidebar_position: 1
---

# types

`Chronosis` uses [TypeScript](https://www.typescriptlang.org) for development, so

## `DateLike`

```ts
type DateLike = Date | (string & {}) | number
```

`DateLike` generally represents anything that can be passed into a `Date` constructor. It's used to describe the input of [`constructor`](./constructor.md).

## `TimeUnit`

```ts
type TimeUnit =
	| 'millisecond'
	| 'second'
	| 'minute'
	| 'hour'
	| 'day'
	| 'month'
	| 'year'
```

`TimeUnit` represents every unit of time considered by `Chronosis`. It's used to describe the input of [manipulation functions](../category/manipulation) ([`get`](../manipulation/get.md), [`set`](../manipulation/set.md), [`add`](../manipulation/add.md), [`subtract`](../manipulation/subtract.md), [`startOf`](../manipulation/start-of.md), and [`endOf`](../manipulation/end-of.md)),
