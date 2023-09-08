import { beforeAll, expect, setSystemTime, test } from 'bun:test'
import { Chronosis } from '../src/index.ts'

beforeAll(() => {
	setSystemTime(new Date(2020, 5, 15, 11, 29, 29, 499))
})

test('second', () => {
	const start = new Chronosis().startOf('second')

	expect(start.get('millisecond')).toBe(0)
	expect(start.get('second')).toBe(29)
})
test('minute', () => {
	const start = new Chronosis().startOf('minute')

	expect(start.get('millisecond')).toBe(0)
	expect(start.get('second')).toBe(0)
	expect(start.get('minute')).toBe(29)
})
test('hour', () => {
	const start = new Chronosis().startOf('hour')

	expect(start.get('millisecond')).toBe(0)
	expect(start.get('second')).toBe(0)
	expect(start.get('minute')).toBe(0)
	expect(start.get('hour')).toBe(11)
})
test('day', () => {
	const start = new Chronosis().startOf('day')

	expect(start.get('millisecond')).toBe(0)
	expect(start.get('second')).toBe(0)
	expect(start.get('minute')).toBe(0)
	expect(start.get('hour')).toBe(0)
	expect(start.get('day')).toBe(15)
})
test('month', () => {
	const start = new Chronosis().startOf('month')

	expect(start.get('millisecond')).toBe(0)
	expect(start.get('second')).toBe(0)
	expect(start.get('minute')).toBe(0)
	expect(start.get('hour')).toBe(0)
	expect(start.get('day')).toBe(1)
	expect(start.get('month')).toBe(5)
})
test('year', () => {
	const start = new Chronosis().startOf('year')

	expect(start.get('millisecond')).toBe(0)
	expect(start.get('second')).toBe(0)
	expect(start.get('minute')).toBe(0)
	expect(start.get('hour')).toBe(0)
	expect(start.get('day')).toBe(1)
	expect(start.get('month')).toBe(0)
	expect(start.get('year')).toBe(2020)
})
