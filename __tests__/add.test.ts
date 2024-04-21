import { beforeAll, expect, setSystemTime, test } from 'bun:test'
import { Chronosis } from '../src/index.ts'

beforeAll(() => {
	setSystemTime(new Date(2020, 5, 15, 11, 29, 29, 499))
})

test('only value', () => {
	const chrono = new Chronosis()

	// Within normal range
	const normal = chrono.add(250)
	expect(normal.get('millisecond')).toBe(749)
	expect(normal.get('second')).toBe(29)

	// Should add one to the next unit
	const wrapForward = chrono.add(750)
	expect(wrapForward.get('millisecond')).toBe(249)
	expect(wrapForward.get('second')).toBe(30)
})
test('immutable', () => {
	const first = new Chronosis()
	const second = new Chronosis()

	first.add(200)

	expect(first.valueOf()).toBe(second.valueOf())
})
test('invalid unit', () => {
	const chrono = new Chronosis()

	//@ts-expect-error
	expect(chrono.add('not real', 6).isValid()).toBeFalse()
	//@ts-expect-error
	expect(chrono.add([], 6).isValid()).toBeFalse()
})
test('invalid value', () => {
	const chrono = new Chronosis()

	//@ts-expect-error
	expect(chrono.add('day', []).isValid()).toBeFalse()
	//@ts-expect-error
	expect(chrono.add('day', 'string').isValid()).toBeFalse()
})
test('millisecond', () => {
	const chrono = new Chronosis()

	// Within normal range
	const normal = chrono.add(250, 'millisecond')
	expect(normal.get('millisecond')).toBe(749)
	expect(normal.get('second')).toBe(29)

	// Should add one to the next unit
	const wrapForward = chrono.add(750, 'millisecond')
	expect(wrapForward.get('millisecond')).toBe(249)
	expect(wrapForward.get('second')).toBe(30)
})
test('second', () => {
	const chrono = new Chronosis()

	// Within normal range
	const normal = chrono.add(15, 'second')
	expect(normal.get('second')).toBe(44)
	expect(normal.get('minute')).toBe(29)

	// Should add one to the next unit
	const wrapForward = chrono.add(45, 'second')
	expect(wrapForward.get('second')).toBe(14)
	expect(wrapForward.get('minute')).toBe(30)
})
test('minute', () => {
	const chrono = new Chronosis()

	// Within normal range
	const normal = chrono.add(15, 'minute')
	expect(normal.get('minute')).toBe(44)
	expect(normal.get('hour')).toBe(11)

	// Should add one to the next unit
	const wrapForward = chrono.add(35, 'minute')
	expect(wrapForward.get('minute')).toBe(4)
	expect(wrapForward.get('hour')).toBe(12)
})
test('hour', () => {
	const chrono = new Chronosis()

	// Within normal range
	const normal = chrono.add(8, 'hour')
	expect(normal.get('hour')).toBe(19)
	expect(normal.get('day')).toBe(15)

	// Should add one to the next unit
	const wrapForward = chrono.add(25, 'hour')
	expect(wrapForward.get('hour')).toBe(12)
	expect(wrapForward.get('day')).toBe(16)
})
test('day', () => {
	const chrono = new Chronosis()

	// Within normal range
	const normal = chrono.add(10, 'day')
	expect(normal.get('day')).toBe(25)
	expect(normal.get('month')).toBe(5)

	// Should add one to the next unit
	const wrapForward = chrono.add(20, 'day')
	expect(wrapForward.get('day')).toBe(5)
	expect(wrapForward.get('month')).toBe(6)
})
test('month', () => {
	const chrono = new Chronosis()

	// Within normal range
	const normal = chrono.add(3, 'month')
	expect(normal.get('month')).toBe(8)
	expect(normal.get('year')).toBe(2020)

	// Should add one to the next unit
	const wrapForward = chrono.add(18, 'month')
	expect(wrapForward.get('month')).toBe(11)
	expect(wrapForward.get('year')).toBe(2021)
})
test('year', () => {
	const chrono = new Chronosis()

	// Within normal range
	const normal = chrono.add(3, 'year')
	expect(normal.get('year')).toBe(2023)
})
