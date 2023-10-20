---
sidebar_position: 1
slug: /
---

# Introduction

`Chronosis` is a **crazy small**, [**crazy fast**](./benchmarks/benchmarks.mdx) date management library, built to plug all the nasty, painful holes in the built-in `Date` class. Many libraries built for a similar purpose ([moment](https://github.com/moment/moment) and [luxon](https://github.com/moment/luxon) come to mind) are absolutely massive, so `Chronosis` is less than _1 kilobyte_ when gzipped! That means you can import the _entirety_ of `Chronosis` for less than _just the format function_ from [date-fns](https://github.com/date-fns/date-fns).

According to [bundlephobia](https://bundlephobia.com), `Chronosis` downloads ~23x faster than [luxon](https://github.com/moment/luxon) (339ms vs. 19ms).

## Installation

Install `chronosis` from npm with your favorite package manager.

```bash npm2yarn
npm install chronosis
```

## Usage

To use `chronosis` in your code, just import `Chronosis` from the package, and start programming!

```ts
import { Chronosis } from 'chronosis'

const now = new Chronosis()
```

:::note
Documentation will be in ESM module format, but `Chronosis` supports CJS as well!
:::
