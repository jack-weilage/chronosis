import { beforeAll, expect, setSystemTime, test } from 'bun:test'
import { Chronosis } from '../src/index.js'

beforeAll(() => {
	setSystemTime(new Date(2020, 6, 15, 11, 29, 29, 499))
})

test('valueOf', () => {
	const chrono = new Chronosis()

	expect(chrono.valueOf()).toBe(new Date().valueOf())
})
test('toString', () => {
	const chrono = new Chronosis()

	expect(chrono.toString()).toBe(new Date().toString())
})
test('toDate', () => {
	const chrono = new Chronosis()

	expect(chrono.toDate()).toEqual(new Date())
})
