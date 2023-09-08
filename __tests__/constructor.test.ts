import { beforeAll, expect, setSystemTime, test } from 'bun:test'
import { Chronosis } from '../src/index.ts'

beforeAll(() => {
	setSystemTime(new Date(2020, 5, 15))
})

test('no input', () => {
	const chrono = new Chronosis()

	expect(chrono).toBeInstanceOf(Chronosis)
	expect(chrono.isValid()).toBeTrue()

	expect(chrono.get('year')).toBe(2020)
	expect(chrono.get('month')).toBe(5)
	expect(chrono.get('day')).toBe(15)
})
test('date', () => {
	// Set time to tick normally
	setSystemTime()

	const date = new Date()
	const chrono = new Chronosis(date)

	expect(chrono).toBeInstanceOf(Chronosis)
	expect(chrono.isValid()).toBeTrue()
	expect(chrono.valueOf()).toBe(date.valueOf())
})
test('date string', () => {
	const chrono = new Chronosis('03/11/2021')

	expect(chrono).toBeInstanceOf(Chronosis)
	expect(chrono.isValid()).toBeTrue()

	expect(chrono.get('year')).toBe(2021)
	expect(chrono.get('month')).toBe(3 - 1) // Zero-indexed
	expect(chrono.get('day')).toBe(11)
})
test('date number', () => {
	const chrono = new Chronosis(1615449600000)

	expect(chrono).toBeInstanceOf(Chronosis)
	expect(chrono.isValid()).toBeTrue()

	expect(chrono.get('year')).toBe(2021)
	expect(chrono.get('month')).toBe(3 - 1) // Zero-indexed
	expect(chrono.get('day')).toBe(11)
})
