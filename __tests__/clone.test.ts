import { beforeAll, expect, setSystemTime, test } from 'bun:test'
import { Chronosis } from '../src/index.ts'

beforeAll(() => {
	setSystemTime(new Date(2020, 5, 15, 11, 29, 29, 499))
})

test('clone has exact date', () => {
	const base = new Chronosis()
	const clone = base.clone()

	expect(base.valueOf()).toBe(clone.valueOf())
})
test("changing base doesn't affect clone", () => {
	const base = new Chronosis()
	const clone = base.clone()

	expect(base.add(1, 'hour').get('hour')).not.toBe(clone.get('hour'))
})
test("changing clone doesn't affect base", () => {
	const base = new Chronosis()
	const clone = base.clone()

	expect(base.get('hour')).not.toBe(clone.add(1, 'hour').get('hour'))
})
