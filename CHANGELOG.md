# chronosis

## 0.2.0

### Minor Changes

- 4ee5c7a: `get` now returns undefined when its unit is invalid.
- 4ee5c7a: `set`, `add` and `subtract` now return an invalid date if their value or unit is invalid.

### Patch Changes

- 77ecff3: Significantly optimize performance for `endOf`, `startOf` and `isValid`
- 518b73e: Fix 12am/12pm being formatted as '0'.

## 0.1.1

### Patch Changes

- 8689bd0: `get` and `set` now use a map to improve compression.
- a692689: `Chronosis` now supports CJS imports (`require()`).

## 0.1.0

### Minor Changes

- b3ca854: BREAKING: All `Chronosis` objects are now immutable.

### Patch Changes

- d3cb0d4: `add` and `subtract` now use milliseconds as a default unit.
- 3c9978d: Invalid set values are no longer discarded. Beware!
- e0f7084: BREAKING: Implement `toDate`, remove `get()` (`get` with no arg).
- b6b0a08: BREAKING: Remove `set(datelike)` pattern, now useless due to immutablity.

## 0.0.3

### Patch Changes

- 3e60e0b: `new Chronosis()` no longer accepts a locale as a second argument. Instead, a locale can be entered as a second argument to `format`.
- d4d1c86: `chronosis` no longer bundles a sourcemap with each release.
- ed39710: Fix possible regular expression DOS in formatter

## 0.0.2

### Patch Changes

- d01f129: Test release

## 0.0.1

### Patch Changes

- 4890ecb: Initial release
