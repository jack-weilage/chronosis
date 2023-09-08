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
	#locale: string

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
	constructor(date: DateLike)
	constructor(date?: DateLike, locale = 'en-US') {
		this.#date = date !== undefined ? new Date(date) : new Date()
		this.#locale = locale
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
		// If the function is called without a unit, return the internal date.
		if (!unit) {
			return this.#date
		}

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
		}
	}

	/**
	 * Sets the contained date to `date`.
	 *
	 * ```ts
	 * const chrono = new Chronosis()
	 * // Some logic here...
	 * chrono.set(new Date()) // Update the contained date.
	 * ```
	 */
	set(date: DateLike): Chronosis
	/**
	 * Sets `unit` to `value`.
	 *
	 * If the value is outside of the possible range, the change propagates to other units (5:75 AM == 6:15 AM).
	 *
	 * ```ts
	 * new Chronosis().set('hour', 5) // Sets the hour to 5 AM
	 * ```
	 */
	set(unit: TimeUnit, value: number): Chronosis
	set(unit_or_date: TimeUnit | DateLike, value?: number): Chronosis {
		if (typeof value !== 'number') {
			// If an input isn't a number, prevent undefined behavior by forcing the input to be invalid.
			// @ts-expect-error - Assigning a string to a number to cause an invalid date
			value = 'a' as number
		}

		switch (unit_or_date) {
			case 'millisecond':
				this.#date.setMilliseconds(value)
				break
			case 'second':
				this.#date.setSeconds(value)
				break
			case 'minute':
				this.#date.setMinutes(value)
				break
			case 'hour':
				this.#date.setHours(value)
				break
			case 'day':
				this.#date.setDate(value)
				break
			case 'month':
				this.#date.setMonth(value)
				break
			case 'year':
				this.#date.setFullYear(value)
				break
			default:
				this.#date = new Date(unit_or_date)
		}

		return this
	}

	/**
	 * Adds `count` of `unit` to the contained date.
	 *
	 * If the resulting value is outside of the possible range, the change propagates to other units (5:30 AM + 50 minutes == 6:20 AM)
	 *
	 * ```ts
	 * new Chronosis().add(15, 'day') // Adds 15 days to the current date
	 * ```
	 */
	add(count: number, unit: TimeUnit): Chronosis {
		return this.set(unit, this.get(unit) + count)
	}

	/**
	 * Subtracts `count` of `unit` from the contained date.
	 *
	 * If the resulting value is outside of the possible range, the change propagates to other units (5:30 AM - 50 minutes == 4:40 AM)
	 *
	 * ```ts
	 * new Chronosis().subtract(2, 'year') // Subtracts 2 years from the current date
	 * ```
	 */
	subtract(count: number, unit: TimeUnit): Chronosis {
		return this.set(unit, this.get(unit) - count)
	}

	/**
	 * Sets the contained date to the start of `unit`.
	 *
	 * ```ts
	 * new Chronosis().startOf('year') // Sets the date to the start of the year
	 * ```
	 */
	startOf(unit: Exclude<TimeUnit, 'millisecond'>): Chronosis {
		// This could be turned into a simple loop...
		// Unfortunately, this works best with gzip.
		switch (unit) {
			case 'year':
				this.set('month', 0)
			case 'month':
				// The month starts on day 1, not 0
				this.set('day', 1)
			case 'day':
				this.set('hour', 0)
			case 'hour':
				this.set('minute', 0)
			case 'minute':
				this.set('second', 0)
			case 'second':
				this.set('millisecond', 0)
		}

		return this
	}

	/**
	 * Sets the contained date to the end of `unit`.
	 *
	 * ```ts
	 * new Chronosis().endOf('month') // Sets the date to the end of the month
	 * ```
	 */
	endOf(unit: Exclude<TimeUnit, 'millisecond'>): Chronosis {
		// This could be turned into a simple loop...
		// Unfortunately, this works best with gzip.
		switch (unit) {
			case 'year':
				this.set('month', 11)
			case 'month':
				// We could have a list of month lengths + leap year...
				// but this solution is short and easily understandable.
				this.add(1, 'month').set('day', 0)
			case 'day':
				this.set('hour', 23)
			case 'hour':
				this.set('minute', 59)
			case 'minute':
				this.set('second', 59)
			case 'second':
				this.set('millisecond', 999)
		}

		return this
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
	format(format_string: string): string {
		return format_string.replace(FORMAT_REGEX, (match, $1) => {
			// If we match the capture pattern '\[(.*)\]' we should break out early.
			if ($1 !== undefined) {
				return $1
			}

			//PERF: Intl.DateTimeFormat is very slow, but very small compared to other solutions.
			//TODO: Search for a faster solution?
			const intl_format = (options: Intl.DateTimeFormatOptions) =>
				new Intl.DateTimeFormat(this.#locale, options).format(this.#date)

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
					return intl_format({ month: 'short' })
				case 'MMMM':
					return intl_format({ month: 'long' })
				case 'D':
					return this.get('day')
				case 'DD':
					return pad_to_digits(this.get('day'))
				case 'd':
					return this.#date.getDay()
				case 'dd':
					return intl_format({ weekday: 'narrow' })
				case 'ddd':
					return intl_format({ weekday: 'short' })
				case 'dddd':
					return intl_format({ weekday: 'long' })
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
