import { beforeAll, expect, setSystemTime, test } from 'bun:test'
import { Chronosis } from '../src/index.ts'

beforeAll(() => {
	setSystemTime(new Date(2020, 5, 15, 11, 29, 29, 499))
})

test('no arg', () => {
	const chrono = new Chronosis()

	// Within normal range
	const normal = chrono.add(250)
	expect(normal.get('millisecond')).toBe(749)
	expect(normal.get('second')).toBe(29)

	// Should add one to the next unit
	const wrap_forward = chrono.add(750)
	expect(wrap_forward.get('millisecond')).toBe(249)
	expect(wrap_forward.get('second')).toBe(30)
})
test('immutable', () => {
	const first = new Chronosis()
	const second = new Chronosis()

	first.add(200)

	expect(first.valueOf()).toBe(second.valueOf())
})
test('millisecond', () => {
	const chrono = new Chronosis()

	// Within normal range
	const normal = chrono.add(250, 'millisecond')
	expect(normal.get('millisecond')).toBe(749)
	expect(normal.get('second')).toBe(29)

	// Should add one to the next unit
	const wrap_forward = chrono.add(750, 'millisecond')
	expect(wrap_forward.get('millisecond')).toBe(249)
	expect(wrap_forward.get('second')).toBe(30)
})
test('second', () => {
	const chrono = new Chronosis()

	// Within normal range
	const normal = chrono.add(15, 'second')
	expect(normal.get('second')).toBe(44)
	expect(normal.get('minute')).toBe(29)

	// Should add one to the next unit
	const wrap_forward = chrono.add(45, 'second')
	expect(wrap_forward.get('second')).toBe(14)
	expect(wrap_forward.get('minute')).toBe(30)
})
test('minute', () => {
	const chrono = new Chronosis()

	// Within normal range
	const normal = chrono.add(15, 'minute')
	expect(normal.get('minute')).toBe(44)
	expect(normal.get('hour')).toBe(11)

	// Should add one to the next unit
	const wrap_forward = chrono.add(35, 'minute')
	expect(wrap_forward.get('minute')).toBe(4)
	expect(wrap_forward.get('hour')).toBe(12)
})
test('hour', () => {
	const chrono = new Chronosis()

	// Within normal range
	const normal = chrono.add(8, 'hour')
	expect(normal.get('hour')).toBe(19)
	expect(normal.get('day')).toBe(15)

	// Should add one to the next unit
	const wrap_forward = chrono.add(25, 'hour')
	expect(wrap_forward.get('hour')).toBe(12)
	expect(wrap_forward.get('day')).toBe(16)
})
test('day', () => {
	const chrono = new Chronosis()

	// Within normal range
	const normal = chrono.add(10, 'day')
	expect(normal.get('day')).toBe(25)
	expect(normal.get('month')).toBe(5)

	// Should add one to the next unit
	const wrap_forward = chrono.add(20, 'day')
	expect(wrap_forward.get('day')).toBe(5)
	expect(wrap_forward.get('month')).toBe(6)
})
test('month', () => {
	const chrono = new Chronosis()

	// Within normal range
	const normal = chrono.add(3, 'month')
	expect(normal.get('month')).toBe(8)
	expect(normal.get('year')).toBe(2020)

	// Should add one to the next unit
	const wrap_forward = chrono.add(18, 'month')
	expect(wrap_forward.get('month')).toBe(11)
	expect(wrap_forward.get('year')).toBe(2021)
})
test('year', () => {
	const chrono = new Chronosis()

	// Within normal range
	const normal = chrono.add(3, 'year')
	expect(normal.get('year')).toBe(2023)
})
