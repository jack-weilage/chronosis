export type TimeUnit =
	| 'millisecond'
	| 'second'
	| 'minute'
	| 'hour'
	| 'day'
	| 'month'
	| 'year'

export type DateLike = Date | (string & {}) | number

export const FORMAT_REGEX =
	/\[([^\]]*)\]|Y{4}|Y{2}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|m{1,2}|s{1,2}|S{3}|a|A|Z/g

export const padToDigits = (n: number, pad = 2) =>
	n.toString().padStart(pad, '0')

type DateGetters<T = keyof Date> = T extends `${'get'}${infer N}` ? N : never
type DateSetters<T = keyof Date> = T extends `${'set'}${infer N}` ? N : never

export const TIME_UNIT_TO_DATE_FUNC = {
	millisecond: 'Milliseconds',
	second: 'Seconds',
	minute: 'Minutes',
	hour: 'Hours',
	day: 'Date',
	month: 'Month',
	year: 'FullYear',
} as Record<TimeUnit, Extract<DateGetters, DateSetters>>
