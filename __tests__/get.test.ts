import { beforeAll, expect, setSystemTime, test } from 'bun:test'
import { Chronosis } from '../src/index.ts'

beforeAll(() => {
	setSystemTime(new Date(2020, 5, 15, 11, 29, 29, 499))
})

test('millisecond', () => {
	const chrono = new Chronosis()

	expect(chrono.get('millisecond')).toBe(499)
})
test('second', () => {
	const chrono = new Chronosis()

	expect(chrono.get('second')).toBe(29)
})
test('minute', () => {
	const chrono = new Chronosis()

	expect(chrono.get('minute')).toBe(29)
})
test('hour', () => {
	const chrono = new Chronosis()

	expect(chrono.get('hour')).toBe(11)
})
test('day', () => {
	const chrono = new Chronosis()

	expect(chrono.get('day')).toBe(15)
})
test('month', () => {
	const chrono = new Chronosis()

	expect(chrono.get('month')).toBe(5)
})
test('year', () => {
	const chrono = new Chronosis()

	expect(chrono.get('year')).toBe(2020)
})
