import type { DateLike, TimeUnit } from './utils.ts'
import { FORMAT_REGEX, pad_to_digits } from './utils.ts'

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
	 */
	constructor()
	/**
	 * Creates a new Chronosis object, representing a specific date.
	 *
	 * ```ts
	 * new Chronosis(new Date(2020, 5, 15)) // Represents June 15th, 2020
	 * ```
	 */
	constructor(datelike: DateLike)
	constructor(datelike?: DateLike) {
		this.#date = datelike !== undefined ? new Date(datelike) : new Date()
	}

	/**
	 * Returns a reference to the contained date.
	 *
	 * ```ts
	 * new Chronosis().get().toISOString() // Calls `.toISOString()` on the contained date.
	 * ```
	 */
	get(): Date
	/**
	 * Returns the value of `unit`.
	 *
	 * ```ts
	 * new Chronosis().get('year') // Get the current year.
	 * ```
	 */
	get(unit: TimeUnit): number
	get(unit?: TimeUnit): Date | number {
		switch (unit) {
			case 'millisecond':
				return this.#date.getMilliseconds()
			case 'second':
				return this.#date.getSeconds()
			case 'minute':
				return this.#date.getMinutes()
			case 'hour':
				return this.#date.getHours()
			case 'day':
				return this.#date.getDate()
			case 'month':
				return this.#date.getMonth()
			case 'year':
				return this.#date.getFullYear()
			case undefined:
				// If the function is called without a unit, return the internal date.
				// Could save 4 bytes by leaving this the end of the function
				return this.#date
		}
	}

	/**
	 * Sets `unit` to `value`, returning a new object.
	 *
	 * If the value is outside of the possible range, the change propagates to other units (5:75 AM == 6:15 AM).
	 *
	 * ```ts
	 * new Chronosis().set('hour', 5) // Sets the hour to 5 AM
	 * ```
	 */
	set(unit: TimeUnit, value: number): Chronosis {
		//TODO: This could be refactored with a TimeUnit - fn name map
		// Would be smaller, but slightly slower.

		let clone = new Date(this.#date)
		switch (unit) {
			case 'millisecond':
				clone.setMilliseconds(value as number)
				break
			case 'second':
				clone.setSeconds(value as number)
				break
			case 'minute':
				clone.setMinutes(value as number)
				break
			case 'hour':
				clone.setHours(value as number)
				break
			case 'day':
				clone.setDate(value as number)
				break
			case 'month':
				clone.setMonth(value as number)
				break
			case 'year':
				clone.setFullYear(value as number)
				break
		}

		return new Chronosis(clone)
	}

	/**
	 * Adds `ms` milliseconds to the contained date, returning a new object.
	 *
	 * If the resulting value is outside of the possible range, the change propagates to other units (5:30 AM + 50 minutes == 6:20 AM)
	 *
	 * ```ts
	 * new Chronosis().add(2500) // Adds 2,500 milliseconds to the current date
	 * ```
	 */
	add(ms: number): Chronosis
	/**
	 * Adds `count` of `unit` to the contained date, returning a new object.
	 *
	 * If the resulting value is outside of the possible range, the change propagates to other units (5:30 AM + 50 minutes == 6:20 AM)
	 *
	 * ```ts
	 * new Chronosis().add(15, 'day') // Adds 15 days to the current date
	 * ```
	 */
	add(count: number, unit: TimeUnit): Chronosis
	add(count: number, unit: TimeUnit = 'millisecond'): Chronosis {
		return this.set(unit, this.get(unit) + count)
	}

	/**
	 * Subtracts `ms` milliseconds from the contained date, returning a new object.
	 *
	 * If the resulting value is outside of the possible range, the change propagates to other units (5:30 AM - 50 minutes == 4:40 AM)
	 *
	 * ```ts
	 * new Chronosis().subtract(2000) // Subtracts 2,000 milliseconds from the current date
	 * ```
	 */
	subtract(ms: number): Chronosis
	/**
	 * Subtracts `count` of `unit` from the contained date, returning a new object.
	 *
	 * If the resulting value is outside of the possible range, the change propagates to other units (5:30 AM - 50 minutes == 4:40 AM)
	 *
	 * ```ts
	 * new Chronosis().subtract(2, 'year') // Subtracts 2 years from the current date
	 * ```
	 */
	subtract(count: number, unit: TimeUnit): Chronosis
	subtract(count: number, unit: TimeUnit = 'millisecond'): Chronosis {
		return this.set(unit, this.get(unit) - count)
	}

	/**
	 * Sets the contained date to the start of `unit`, returning a new object.
	 *
	 * ```ts
	 * new Chronosis().startOf('year') // Sets the date to the start of the year
	 * ```
	 */
	startOf(unit: Exclude<TimeUnit, 'millisecond'>): Chronosis {
		let clone = this.clone()

		// This could be turned into a simple loop...
		// Unfortunately, this works best with gzip.
		switch (unit) {
			case 'year':
				clone = clone.set('month', 0)
			case 'month':
				// The month starts on day 1, not 0
				clone = clone.set('day', 1)
			case 'day':
				clone = clone.set('hour', 0)
			case 'hour':
				clone = clone.set('minute', 0)
			case 'minute':
				clone = clone.set('second', 0)
			case 'second':
				clone = clone.set('millisecond', 0)
		}

		return clone
	}

	/**
	 * Sets the contained date to the end of `unit`, returning a new object.
	 *
	 * ```ts
	 * new Chronosis().endOf('month') // Sets the date to the end of the month
	 * ```
	 */
	endOf(unit: Exclude<TimeUnit, 'millisecond'>): Chronosis {
		let clone = this.clone()

		// This could be turned into a simple loop...
		// Unfortunately, this works best with gzip.
		switch (unit) {
			case 'year':
				clone = clone.set('month', 11)
			case 'month':
				// We could have a list of month lengths + leap year...
				// but this solution is short and easily understandable.
				clone = clone.add(1, 'month').set('day', 0)
			case 'day':
				clone = clone.set('hour', 23)
			case 'hour':
				clone = clone.set('minute', 59)
			case 'minute':
				clone = clone.set('second', 59)
			case 'second':
				clone = clone.set('millisecond', 999)
		}

		return clone
	}

	/**
	 * Constructs a formatted date string from an input string.
	 *
	 * To escape characters, wrap them in square brackets, like '[escaped text] YYYY'.
	 *
	 * For more information on what tokens are available, see [dayjs's website](https://day.js.org/docs/en/display/format).
	 *
	 * ```ts
	 * new Chronosis('01/26/2024').format("[Today:] MMMM D, YYYY") // 'Today: January 26, 2024'
	 *
	 * ```
	 */
	format(format_string: string, locale?: string): string {
		return (
			format_string
				// Prevent possible regex DOS due to massive strings
				.substring(0, 1000)
				.replace(FORMAT_REGEX, (match, $1) => {
					// If we match the capture pattern '\[(.*)\]' we should break out early.
					if ($1 !== undefined) {
						return $1
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
							return this.get('hour') % 12
						case 'hh':
							return pad_to_digits(this.get('hour') % 12)
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
						default:
							return match
					}
				})
		)
	}

	/**
	 * Creates a clone from a Chronosis object.
	 *
	 * ```ts
	 * const base = new Chronosis()
	 * const clone = chrono.clone() // Represents the exact same date
	 * ```
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
	 */
	isValid(): boolean {
		return this.toString() !== 'Invalid Date'
	}

	/**
	 * Calls the contained date's `toUTCString` method.
	 *
	 * If you want more advanced stringification, check out {@link format()}.
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
	 */
	valueOf(): number {
		return this.#date.valueOf()
	}
}
