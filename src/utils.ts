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

export const pad_to_digits = (n: number, pad = 2) =>
	n.toString().padStart(pad, '0')
