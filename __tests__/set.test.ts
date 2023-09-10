import { beforeAll, expect, setSystemTime, test } from 'bun:test'
import { Chronosis } from '../src/index.ts'

beforeAll(() => {
	setSystemTime(new Date(2020, 5, 15, 11, 29, 29, 499))
})

test('date', () => {
	let chrono = new Chronosis()

	expect(chrono.valueOf()).toBe(new Date().valueOf())

	chrono = chrono.set(new Date(2021, 8, 21))
	expect(chrono.valueOf()).toBe(new Date(2021, 8, 21).valueOf())
})
test('date-like', () => {
	let chrono = new Chronosis()

	chrono = chrono.set('09/21/2021')
	expect(chrono.valueOf()).toBe(new Date(2021, 8, 21).valueOf())

	chrono = chrono.set(1632182400000)
	expect(chrono.valueOf()).toBe(new Date(2021, 8, 21).valueOf())
})
test('immutable', () => {
	const first = new Chronosis()
	const second = new Chronosis()

	first.set(500000)

	expect(first.valueOf()).toBe(second.valueOf())
})
test('millisecond', () => {
	const chrono = new Chronosis()

	// Within normal range
	const normal = chrono.set('millisecond', 250)
	expect(normal.get('millisecond')).toBe(250)
	expect(normal.get('second')).toBe(29)

	// Negative, should wrap back
	const wrap_back = chrono.set('millisecond', -500)
	expect(wrap_back.get('millisecond')).toBe(500)
	expect(wrap_back.get('second')).toBe(28)

	// Positive, should wrap forward
	const wrap_forward = chrono.set('millisecond', 2500)
	expect(wrap_forward.get('millisecond')).toBe(500)
	expect(wrap_forward.get('second')).toBe(31)
})
test('second', () => {
	const chrono = new Chronosis()

	// Within normal range
	const normal = chrono.set('second', 15)
	expect(normal.get('second')).toBe(15)
	expect(normal.get('minute')).toBe(29)

	// Negative, should wrap back
	const wrap_back = chrono.set('second', -25)
	expect(wrap_back.get('second')).toBe(35)
	expect(wrap_back.get('minute')).toBe(28)

	// Positive, should wrap forward
	const wrap_forward = chrono.set('second', 80)
	expect(wrap_forward.get('second')).toBe(20)
	expect(wrap_forward.get('minute')).toBe(30)
})
test('minute', () => {
	const chrono = new Chronosis()

	// Within normal range
	const normal = chrono.set('minute', 15)
	expect(normal.get('minute')).toBe(15)
	expect(normal.get('hour')).toBe(11)

	// Negative, should wrap back
	const wrap_back = chrono.set('minute', -25)
	expect(wrap_back.get('minute')).toBe(35)
	expect(wrap_back.get('hour')).toBe(10)

	// Positive, should wrap forward
	const wrap_forward = chrono.set('minute', 80)
	expect(wrap_forward.get('minute')).toBe(20)
	expect(wrap_forward.get('hour')).toBe(12)
})
test('hour', () => {
	const chrono = new Chronosis()

	// Within normal range
	const normal = chrono.set('hour', 15)
	expect(normal.get('hour')).toBe(15)
	expect(normal.get('day')).toBe(15)

	// Negative, should wrap back
	const wrap_back = chrono.set('hour', -8)
	expect(wrap_back.get('hour')).toBe(16)
	expect(wrap_back.get('day')).toBe(14)

	// Positive, should wrap forward
	const wrap_forward = chrono.set('hour', 35)
	expect(wrap_forward.get('hour')).toBe(11)
	expect(wrap_forward.get('day')).toBe(16)
})
test('day', () => {
	const chrono = new Chronosis()

	// Within normal range
	const normal = chrono.set('day', 15)
	expect(normal.get('day')).toBe(15)
	expect(normal.get('month')).toBe(5)

	// Negative, should wrap back
	const wrap_back = chrono.set('day', -8)
	expect(wrap_back.get('day')).toBe(23)
	expect(wrap_back.get('month')).toBe(4)

	// Positive, should wrap forward
	const wrap_forward = chrono.set('day', 35)
	expect(wrap_forward.get('day')).toBe(5)
	expect(wrap_forward.get('month')).toBe(6)
})
test('month', () => {
	const chrono = new Chronosis()

	// Within normal range
	const normal = chrono.set('month', 8)
	expect(normal.get('month')).toBe(8)
	expect(normal.get('year')).toBe(2020)

	// Negative, should wrap back
	const wrap_back = chrono.set('month', -5)
	expect(wrap_back.get('month')).toBe(7)
	expect(wrap_back.get('year')).toBe(2019)

	// Positive, should wrap forward
	const wrap_forward = chrono.set('month', 18)
	expect(wrap_forward.get('month')).toBe(6)
	expect(wrap_forward.get('year')).toBe(2021)
})
test('year', () => {
	const chrono = new Chronosis()

	// Within normal range
	const normal = chrono.set('year', 2023)
	expect(normal.get('year')).toBe(2023)
})
