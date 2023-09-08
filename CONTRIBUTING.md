# Contributing to Chronosis

## When to do what

If your change...

- Changes the layout of the repository (removes/adds files)...
- Changes the internal or external API...

Please _file an issue_ before creating a pull request.

If your change doesn't do any of that, feel free to open a pull request with a descriptive branch name!

## Installation

Chronosis uses [bun.sh](https://bun.sh) as a package manager, script runner, and test runner. If you don't have bun installed, follow the instructions on their website.

## Tools

To help discover possible size improvements, this repository has `size` and `size:watch` scripts. It's suggested to keep `size:watch` running as you make your change to ensure that you don't run over-budget.
