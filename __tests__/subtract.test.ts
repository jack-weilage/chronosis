import { beforeAll, expect, setSystemTime, test } from 'bun:test'
import { Chronosis } from '../src/index.ts'

beforeAll(() => {
	setSystemTime(new Date(2020, 5, 15, 11, 29, 29, 499))
})

test('no arg', () => {
	const chrono = new Chronosis()

	// Within normal range
	const normal = chrono.subtract(250)
	expect(normal.get('millisecond')).toBe(249)
	expect(normal.get('second')).toBe(29)

	// Should wrap back
	const wrapBack = chrono.subtract(750)
	expect(wrapBack.get('millisecond')).toBe(749)
	expect(wrapBack.get('second')).toBe(28)
})
test('immutable', () => {
	const first = new Chronosis()
	const second = new Chronosis()

	first.subtract(200)

	expect(first.valueOf()).toBe(second.valueOf())
})
test('invalid unit', () => {
	const chrono = new Chronosis()

	//@ts-expect-error
	expect(chrono.subtract('not real', 6).isValid()).toBeFalse()
	//@ts-expect-error
	expect(chrono.subtract([], 6).isValid()).toBeFalse()
})
test('invalid value', () => {
	const chrono = new Chronosis()

	//@ts-expect-error
	expect(chrono.subtract('day', []).isValid()).toBeFalse()
	//@ts-expect-error
	expect(chrono.subtract('day', 'string').isValid()).toBeFalse()
})
test('millisecond', () => {
	const chrono = new Chronosis()

	// Within normal range
	const normal = chrono.subtract(250, 'millisecond')
	expect(normal.get('millisecond')).toBe(249)
	expect(normal.get('second')).toBe(29)

	// Should wrap back
	const wrapBack = chrono.subtract(750, 'millisecond')
	expect(wrapBack.get('millisecond')).toBe(749)
	expect(wrapBack.get('second')).toBe(28)
})
test('second', () => {
	const chrono = new Chronosis()

	// Within normal range
	const normal = chrono.subtract(15, 'second')
	expect(normal.get('second')).toBe(14)
	expect(normal.get('minute')).toBe(29)

	// Should wrap back
	const wrapForward = chrono.subtract(45, 'second')
	expect(wrapForward.get('second')).toBe(44)
	expect(wrapForward.get('minute')).toBe(28)
})
test('minute', () => {
	const chrono = new Chronosis()

	// Within normal range
	const normal = chrono.subtract(15, 'minute')
	expect(normal.get('minute')).toBe(14)
	expect(normal.get('hour')).toBe(11)

	// Should wrap back
	const wrapForward = chrono.subtract(35, 'minute')
	expect(wrapForward.get('minute')).toBe(54)
	expect(wrapForward.get('hour')).toBe(10)
})
test('hour', () => {
	const chrono = new Chronosis()

	// Within normal range
	const normal = chrono.subtract(8, 'hour')
	expect(normal.get('hour')).toBe(3)
	expect(normal.get('day')).toBe(15)

	// Should wrap back
	const wrapForward = chrono.subtract(25, 'hour')
	expect(wrapForward.get('hour')).toBe(10)
	expect(wrapForward.get('day')).toBe(14)
})
test('day', () => {
	const chrono = new Chronosis()

	// Within normal range
	const normal = chrono.subtract(10, 'day')
	expect(normal.get('day')).toBe(5)
	expect(normal.get('month')).toBe(5)

	// Should wrap back
	const wrapForward = chrono.subtract(20, 'day')
	expect(wrapForward.get('day')).toBe(26)
	expect(wrapForward.get('month')).toBe(4)
})
test('month', () => {
	const chrono = new Chronosis()

	// Within normal range
	const normal = chrono.subtract(3, 'month')
	expect(normal.get('month')).toBe(2)
	expect(normal.get('year')).toBe(2020)

	// Should wrap back
	const wrapForward = chrono.subtract(8, 'month')
	expect(wrapForward.get('month')).toBe(9)
	expect(wrapForward.get('year')).toBe(2019)
})
test('year', () => {
	const chrono = new Chronosis()

	// Within normal range
	const normal = chrono.subtract(3, 'year')
	expect(normal.get('year')).toBe(2017)
})
