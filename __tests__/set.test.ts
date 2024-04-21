import { beforeAll, expect, setSystemTime, test } from 'bun:test'
import { Chronosis } from '../src/index.ts'

beforeAll(() => {
	setSystemTime(new Date(2020, 5, 15, 11, 29, 29, 499))
})

test('immutable', () => {
	const first = new Chronosis()
	const second = new Chronosis()

	first.set('millisecond', 500000)

	expect(first.valueOf()).toBe(second.valueOf())
})
test('invalid unit', () => {
	const chrono = new Chronosis()

	//@ts-expect-error
	expect(chrono.set('not real', 6).isValid()).toBeFalse()
	//@ts-expect-error
	expect(chrono.set([], 6).isValid()).toBeFalse()
})
test('invalid value', () => {
	const chrono = new Chronosis()

	//@ts-expect-error
	expect(chrono.set('day', []).isValid()).toBeFalse()
	//@ts-expect-error
	expect(chrono.set('day', 'string').isValid()).toBeFalse()
})
test('millisecond', () => {
	const chrono = new Chronosis()

	// Within normal range
	const normal = chrono.set('millisecond', 250)
	expect(normal.get('millisecond')).toBe(250)
	expect(normal.get('second')).toBe(29)

	// Negative, should wrap back
	const wrapBack = chrono.set('millisecond', -500)
	expect(wrapBack.get('millisecond')).toBe(500)
	expect(wrapBack.get('second')).toBe(28)

	// Positive, should wrap forward
	const wrapForward = chrono.set('millisecond', 2500)
	expect(wrapForward.get('millisecond')).toBe(500)
	expect(wrapForward.get('second')).toBe(31)
})
test('second', () => {
	const chrono = new Chronosis()

	// Within normal range
	const normal = chrono.set('second', 15)
	expect(normal.get('second')).toBe(15)
	expect(normal.get('minute')).toBe(29)

	// Negative, should wrap back
	const wrapBack = chrono.set('second', -25)
	expect(wrapBack.get('second')).toBe(35)
	expect(wrapBack.get('minute')).toBe(28)

	// Positive, should wrap forward
	const wrapForward = chrono.set('second', 80)
	expect(wrapForward.get('second')).toBe(20)
	expect(wrapForward.get('minute')).toBe(30)
})
test('minute', () => {
	const chrono = new Chronosis()

	// Within normal range
	const normal = chrono.set('minute', 15)
	expect(normal.get('minute')).toBe(15)
	expect(normal.get('hour')).toBe(11)

	// Negative, should wrap back
	const wrapBack = chrono.set('minute', -25)
	expect(wrapBack.get('minute')).toBe(35)
	expect(wrapBack.get('hour')).toBe(10)

	// Positive, should wrap forward
	const wrapForward = chrono.set('minute', 80)
	expect(wrapForward.get('minute')).toBe(20)
	expect(wrapForward.get('hour')).toBe(12)
})
test('hour', () => {
	const chrono = new Chronosis()

	// Within normal range
	const normal = chrono.set('hour', 15)
	expect(normal.get('hour')).toBe(15)
	expect(normal.get('day')).toBe(15)

	// Negative, should wrap back
	const wrapBack = chrono.set('hour', -8)
	expect(wrapBack.get('hour')).toBe(16)
	expect(wrapBack.get('day')).toBe(14)

	// Positive, should wrap forward
	const wrapForward = chrono.set('hour', 35)
	expect(wrapForward.get('hour')).toBe(11)
	expect(wrapForward.get('day')).toBe(16)
})
test('day', () => {
	const chrono = new Chronosis()

	// Within normal range
	const normal = chrono.set('day', 15)
	expect(normal.get('day')).toBe(15)
	expect(normal.get('month')).toBe(5)

	// Negative, should wrap back
	const wrapBack = chrono.set('day', -8)
	expect(wrapBack.get('day')).toBe(23)
	expect(wrapBack.get('month')).toBe(4)

	// Positive, should wrap forward
	const wrapForward = chrono.set('day', 35)
	expect(wrapForward.get('day')).toBe(5)
	expect(wrapForward.get('month')).toBe(6)
})
test('month', () => {
	const chrono = new Chronosis()

	// Within normal range
	const normal = chrono.set('month', 8)
	expect(normal.get('month')).toBe(8)
	expect(normal.get('year')).toBe(2020)

	// Negative, should wrap back
	const wrapBack = chrono.set('month', -5)
	expect(wrapBack.get('month')).toBe(7)
	expect(wrapBack.get('year')).toBe(2019)

	// Positive, should wrap forward
	const wrapForward = chrono.set('month', 18)
	expect(wrapForward.get('month')).toBe(6)
	expect(wrapForward.get('year')).toBe(2021)
})
test('year', () => {
	const chrono = new Chronosis()

	// Within normal range
	const normal = chrono.set('year', 2023)
	expect(normal.get('year')).toBe(2023)
})
