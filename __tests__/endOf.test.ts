import { beforeAll, expect, setSystemTime, test } from 'bun:test'
import { Chronosis } from '../src/index.ts'

beforeAll(() => {
	setSystemTime(new Date(2020, 5, 15, 11, 29, 29, 499))
})

test('second', () => {
	const end = new Chronosis().endOf('second')

	expect(end.get('millisecond')).toBe(999)
	expect(end.get('second')).toBe(29)
})
test('minute', () => {
	const end = new Chronosis().endOf('minute')

	expect(end.get('millisecond')).toBe(999)
	expect(end.get('second')).toBe(59)
	expect(end.get('minute')).toBe(29)
})
test('hour', () => {
	const end = new Chronosis().endOf('hour')

	expect(end.get('millisecond')).toBe(999)
	expect(end.get('second')).toBe(59)
	expect(end.get('minute')).toBe(59)
	expect(end.get('hour')).toBe(11)
})
test('day', () => {
	const end = new Chronosis().endOf('day')

	expect(end.get('millisecond')).toBe(999)
	expect(end.get('second')).toBe(59)
	expect(end.get('minute')).toBe(59)
	expect(end.get('hour')).toBe(23)
	expect(end.get('day')).toBe(15)
})
test('month', () => {
	const end = new Chronosis().endOf('month')

	expect(end.get('millisecond')).toBe(999)
	expect(end.get('second')).toBe(59)
	expect(end.get('minute')).toBe(59)
	expect(end.get('hour')).toBe(23)
	expect(end.get('day')).toBe(30)
	expect(end.get('month')).toBe(5)
})
test('year', () => {
	const end = new Chronosis().endOf('year')

	expect(end.get('millisecond')).toBe(999)
	expect(end.get('second')).toBe(59)
	expect(end.get('minute')).toBe(59)
	expect(end.get('hour')).toBe(23)
	expect(end.get('day')).toBe(31)
	expect(end.get('month')).toBe(11)
	expect(end.get('year')).toBe(2020)
})
