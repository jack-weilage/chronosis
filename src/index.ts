import type { DateLike, TimeUnit } from './utils.ts'
import { FORMAT_REGEX, TIME_UNIT_TO_DATE_FUNC, pad_to_digits } from './utils.ts'

/**
 * The basic class used to construct a Chronosis object.
 *
 * ```ts
 * new Chronosis() // Creates a new object.
 * ```
 */
export class Chronosis {
	#date: Date

	/**
	 * Creates a new Chronosis object, representing the current date.
	 *
	 * ```ts
	 * new Chronosis() // Represents Date.now()
	 * ```
	 *
	 * [Link to documentation](https://chronosis.js.org/utility/constructor)
	 */
	constructor()
	/**
	 * Creates a new Chronosis object, representing a specific date.
	 *
	 * ```ts
	 * new Chronosis(new Date(2020, 5, 15)) // Represents June 15th, 2020
	 * ```
	 *
	 * [Link to documentation](https://chronosis.js.org/utility/constructor)
	 */
	constructor(datelike: DateLike)
	constructor(datelike?: DateLike) {
		this.#date = datelike !== undefined ? new Date(datelike) : new Date()
	}

	/**
	 * Creates a clone from a Chronosis object.
	 *
	 * If you need simpler stringification, see {@link toString()}
	 *
	 * ```ts
	 * const base = new Chronosis()
	 * const clone = base.clone() // Represents the exact same date
	 * ```
	 *
	 * [Link to documentation](https://chronosis.js.org/utility/clone)
	 */
	clone(): Chronosis {
		return new Chronosis(this.#date)
	}

	/**
	 * Checks if the contained date is valid.
	 *
	 * ```ts
	 * new Chronosis('not a date').isValid() // false
	 * ```
	 *
	 * [Link to documentation](https://chronosis.js.org/utility/is-valid)
	 */
	isValid(): boolean {
		// Global isNaN already coerces to number.
		return !isNaN(this.#date as unknown as number)
	}

	/**
	 * Returns the value of `unit`.
	 *
	 * If `unit` is invalid, returns undefined.
	 *
	 * ```ts
	 * new Chronosis().get('year') // Get the current year.
	 * ```
	 *
	 * [Link to documentation](https://chronosis.js.org/manipulation/get)
	 */
	get(unit: TimeUnit): number {
		/*
		Mildly horrifying code.

		1. Index to function based on `unit`.
		2a. If `unit` is invalid, return undefined.
		2b. If `unit` is valid, return number.
		*/
		return this.#date[`get${TIME_UNIT_TO_DATE_FUNC[unit]}`]?.()
	}

	/**
	 * Sets `unit` to `value`, returning a new object.
	 *
	 * If the value is outside of the possible range, the change propagates to other units (5:75 AM == 6:15 AM).
	 *
	 * If `unit` or `value` are invalid, the date becomes invalid.
	 *
	 * ```ts
	 * new Chronosis().set('hour', 5) // Sets the hour to 5 AM
	 * ```
	 *
	 * [Link to documentation](https://chronosis.js.org/manipulation/set)
	 */
	set(unit: TimeUnit, value: number): Chronosis {
		/*
		Horrifying code.

		1. Copy contained date.
		2. Index to function based on `unit`.

		3a. If `unit` is valid (indexes date), call function.
			4a. If value is valid (number), use number.
			5a. Else, make sure date is invalid.
		3b. If `unit` is invalid (returns undefined), return string to force invalid date.

		4. Take whatever is returned and make a new object out of it.
		*/

		return new Chronosis(
			this.clone().#date[`set${TIME_UNIT_TO_DATE_FUNC[unit]}`]?.(
				typeof value === 'number' ? value : ('a' as unknown as number),
			) ?? '',
		)
	}

	/**
	 * Adds `ms` milliseconds to the contained date, returning a new object.
	 *
	 * If the resulting value is outside of the possible range, the change propagates to other units (5:30 AM + 50 minutes == 6:20 AM)
	 *
	 * If `ms` is invalid, the date becomes invalid.
	 *
	 * ```ts
	 * new Chronosis().add(2500) // Adds 2,500 milliseconds to the current date
	 * ```
	 *
	 * [Link to documentation](https://chronosis.js.org/manipulation/add)
	 */
	add(ms: number): Chronosis
	/**
	 * Adds `count` of `unit` to the contained date, returning a new object.
	 *
	 * If the resulting value is outside of the possible range, the change propagates to other units (5:30 AM + 50 minutes == 6:20 AM)
	 *
	 * If `count` or `unit` are invalid, the date becomes invalid.
	 *
	 * ```ts
	 * new Chronosis().add(15, 'day') // Adds 15 days to the current date
	 * ```
	 *
	 * [Link to documentation](https://chronosis.js.org/manipulation/add)
	 */
	add(count: number, unit: TimeUnit): Chronosis
	add(count: number, unit: TimeUnit = 'millisecond'): Chronosis {
		// TODO(PERF): This could be replaced with adding ms for ms, s, m, h, d.
		return this.set(unit, this.get(unit) + count)
	}

	/**
	 * Subtracts `ms` milliseconds from the contained date, returning a new object.
	 *
	 * If the resulting value is outside of the possible range, the change propagates to other units (5:30 AM - 50 minutes == 4:40 AM)
	 *
	 * If `ms` is invalid, the date becomes invalid.
	 *
	 * ```ts
	 * new Chronosis().subtract(2000) // Subtracts 2,000 milliseconds from the current date
	 * ```
	 *
	 * [Link to documentation](https://chronosis.js.org/manipulation/subtract)
	 */
	subtract(ms: number): Chronosis
	/**
	 * Subtracts `count` of `unit` from the contained date, returning a new object.
	 *
	 * If the resulting value is outside of the possible range, the change propagates to other units (5:30 AM - 50 minutes == 4:40 AM)
	 *
	 * If `count` or `unit` is invalid, the date becomes invalid.
	 *
	 * ```ts
	 * new Chronosis().subtract(2, 'year') // Subtracts 2 years from the current date
	 * ```
	 *
	 * [Link to documentation](https://chronosis.js.org/manipulation/subtract)
	 */
	subtract(count: number, unit: TimeUnit): Chronosis
	subtract(count: number, unit: TimeUnit = 'millisecond'): Chronosis {
		// TODO(PERF): This could be replaced with subtracting ms for ms, s, m, h, d.
		return this.set(unit, this.get(unit) - count)
	}

	/**
	 * Sets the contained date to the start of `unit`, returning a new object.
	 *
	 * ```ts
	 * new Chronosis().startOf('year') // Sets the date to the start of the year
	 * ```
	 *
	 * [Link to documentation](https://chronosis.js.org/manipulation/start-of)
	 */
	startOf(unit: Exclude<TimeUnit, 'millisecond'>): Chronosis {
		//PERF: Each `this.get` call is expensive. At ~4 calls, it's faster to just use the raw date.
		switch (unit) {
			case 'year':
				return new Chronosis(Date.UTC(this.get('year')))
			case 'month':
				return new Chronosis(Date.UTC(this.get('year'), this.get('month')))
			case 'day':
				return new Chronosis(
					Date.UTC(this.get('year'), this.get('month'), this.get('day')),
				)
			case 'hour':
				return new Chronosis(this.toDate().setMinutes(0, 0, 0))
			case 'minute':
				return new Chronosis(this.toDate().setSeconds(0, 0))
			case 'second':
				return new Chronosis(this.toDate().setMilliseconds(0))
		}

		return this
	}

	/**
	 * Sets the contained date to the end of `unit`, returning a new object.
	 *
	 * ```ts
	 * new Chronosis().endOf('month') // Sets the date to the end of the month
	 * ```
	 *
	 * [Link to documentation](https://chronosis.js.org/manipulation/end-of)
	 */
	endOf(unit: Exclude<TimeUnit, 'millisecond'>): Chronosis {
		//PERF: Each `this.get` call is expensive. At ~4 calls, it's faster to just use the raw date.
		switch (unit) {
			case 'year':
				return new Chronosis(Date.UTC(this.get('year') + 1, 0, 1) - 1)
			case 'month':
				return new Chronosis(
					Date.UTC(this.get('year'), this.get('month') + 1, 1) - 1,
				)
			case 'day':
				return new Chronosis(
					Date.UTC(this.get('year'), this.get('month'), this.get('day') + 1) -
						1,
				)
			case 'hour':
				return new Chronosis(this.toDate().setMinutes(59, 59, 999))
			case 'minute':
				return new Chronosis(this.toDate().setSeconds(59, 999))
			case 'second':
				return new Chronosis(this.toDate().setMilliseconds(999))
		}

		return this
	}

	/**
	 * Constructs a formatted date string from an input string.
	 *
	 * ```ts
	 * new Chronosis('01/26/2024').format("[Today:] MMMM D, YYYY") // 'Today: January 26, 2024'
	 *
	 * ```
	 *
	 * [Link to documentation](https://chronosis.js.org/display/format)
	 */
	format(format_string: string, locale?: string): string {
		return (
			format_string
				// Prevent possible regex DOS due to massive strings
				.substring(0, 1000)
				.replace(FORMAT_REGEX, (match, escaped_text) => {
					// If we match the capture pattern '\[(.*)\]' we should break out early.
					if (escaped_text) {
						return escaped_text
					}

					//PERF: Intl.DateTimeFormat is very slow, but very small compared to other solutions.
					//TODO: Create a cache of already-used DateTimeFormat objects for use later.
					switch (match) {
						case 'YY':
							return pad_to_digits(this.get('year') % 100)
						case 'YYYY':
							return this.get('year')
						case 'M':
							return this.get('month') + 1
						case 'MM':
							return pad_to_digits(this.get('month') + 1)
						case 'MMM':
							return this.#date.toLocaleString(locale, { month: 'short' })
						case 'MMMM':
							return this.#date.toLocaleString(locale, { month: 'long' })
						case 'D':
							return this.get('day')
						case 'DD':
							return pad_to_digits(this.get('day'))
						case 'd':
							return this.#date.getDay()
						case 'dd':
							return this.#date.toLocaleString(locale, { weekday: 'narrow' })
						case 'ddd':
							return this.#date.toLocaleString(locale, { weekday: 'short' })
						case 'dddd':
							return this.#date.toLocaleString(locale, { weekday: 'long' })
						case 'H':
							return this.get('hour')
						case 'HH':
							return pad_to_digits(this.get('hour'))
						case 'h':
							return this.get('hour') % 12 || 12
						case 'hh':
							return pad_to_digits(this.get('hour') % 12 || 12)
						case 'm':
							return this.get('minute')
						case 'mm':
							return pad_to_digits(this.get('minute'))
						case 's':
							return this.get('second')
						case 'ss':
							return pad_to_digits(this.get('second'))
						case 'SSS':
							return pad_to_digits(this.get('millisecond'), 3)
						case 'Z':
							return `+${pad_to_digits(this.#date.getTimezoneOffset() / 60)}:00`
						case 'a':
							return this.get('hour') < 12 ? 'am' : 'pm'
						case 'A':
							return this.get('hour') < 12 ? 'AM' : 'PM'
					}

					return match
				})
		)
	}

	/**
	 * Returns a copy of the contained date.
	 *
	 * ```ts
	 * new Chronosis().toDate() // Same as new Date()
	 * ```
	 *
	 * [Link to documentation](https://chronosis.js.org/display/to-date)
	 */
	toDate(): Date {
		return new Date(this.#date)
	}
	/**
	 * Calls the contained date's `toString` method.
	 *
	 * If you need more advanced stringification, see {@link format()}.
	 *
	 * [Link to documentation](https://chronosis.js.org/display/to-string)
	 */
	toString(): string {
		//PERF: Slower than `toUTCString`
		return this.#date.toString()
	}

	/**
	 * Converts the contained date to milliseconds since epoch (Jan 1, 1970).
	 *
	 * ```ts
	 * const ms = new Chronosis().valueOf() // or `+new Chronosis()`
	 * ```
	 *
	 * [Link to documentation](https://chronosis.js.org/display/value-of)
	 */
	valueOf(): number {
		return this.#date.valueOf()
	}
}
