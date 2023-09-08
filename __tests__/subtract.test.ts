import { beforeAll, expect, setSystemTime, test } from 'bun:test'
import { Chronosis } from '../src/index.ts'

beforeAll(() => {
	setSystemTime(new Date(2020, 5, 15, 11, 29, 29, 499))
})

test('millisecond', () => {
	const chrono = new Chronosis()

	// Within normal range
	const normal = chrono.clone().subtract(250, 'millisecond')
	expect(normal.get('millisecond')).toBe(249)
	expect(normal.get('second')).toBe(29)

	// Should wrap back
	const wrap_back = chrono.clone().subtract(750, 'millisecond')
	expect(wrap_back.get('millisecond')).toBe(749)
	expect(wrap_back.get('second')).toBe(28)
})
test('second', () => {
	const chrono = new Chronosis()

	// Within normal range
	const normal = chrono.clone().subtract(15, 'second')
	expect(normal.get('second')).toBe(14)
	expect(normal.get('minute')).toBe(29)

	// Should wrap back
	const wrap_forward = chrono.clone().subtract(45, 'second')
	expect(wrap_forward.get('second')).toBe(44)
	expect(wrap_forward.get('minute')).toBe(28)
})
test('minute', () => {
	const chrono = new Chronosis()

	// Within normal range
	const normal = chrono.clone().subtract(15, 'minute')
	expect(normal.get('minute')).toBe(14)
	expect(normal.get('hour')).toBe(11)

	// Should wrap back
	const wrap_forward = chrono.clone().subtract(35, 'minute')
	expect(wrap_forward.get('minute')).toBe(54)
	expect(wrap_forward.get('hour')).toBe(10)
})
test('hour', () => {
	const chrono = new Chronosis()

	// Within normal range
	const normal = chrono.clone().subtract(8, 'hour')
	expect(normal.get('hour')).toBe(3)
	expect(normal.get('day')).toBe(15)

	// Should wrap back
	const wrap_forward = chrono.clone().subtract(25, 'hour')
	expect(wrap_forward.get('hour')).toBe(10)
	expect(wrap_forward.get('day')).toBe(14)
})
test('day', () => {
	const chrono = new Chronosis()

	// Within normal range
	const normal = chrono.clone().subtract(10, 'day')
	expect(normal.get('day')).toBe(5)
	expect(normal.get('month')).toBe(5)

	// Should wrap back
	const wrap_forward = chrono.clone().subtract(20, 'day')
	expect(wrap_forward.get('day')).toBe(26)
	expect(wrap_forward.get('month')).toBe(4)
})
test('month', () => {
	const chrono = new Chronosis()

	// Within normal range
	const normal = chrono.clone().subtract(3, 'month')
	expect(normal.get('month')).toBe(2)
	expect(normal.get('year')).toBe(2020)

	// Should wrap back
	const wrap_forward = chrono.clone().subtract(8, 'month')
	expect(wrap_forward.get('month')).toBe(9)
	expect(wrap_forward.get('year')).toBe(2019)
})
test('year', () => {
	const chrono = new Chronosis()

	// Within normal range
	const normal = chrono.clone().subtract(3, 'year')
	expect(normal.get('year')).toBe(2017)
})
