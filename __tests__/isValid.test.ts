import { beforeAll, expect, setSystemTime, test } from 'bun:test'
import { Chronosis } from '../src/index.ts'

beforeAll(() => {
	setSystemTime(new Date(2020, 5, 15, 11, 29, 29, 499))
})

test('valid inputs', () => {
	expect(new Chronosis().isValid()).toBeTrue()
	expect(new Chronosis('06/03/2011').isValid()).toBeTrue()
	expect(new Chronosis(250000).isValid()).toBeTrue()
})
test('invalid inputs', () => {
	expect(new Chronosis('invalid string').isValid()).toBeFalse()
	//@ts-expect-error
	expect(new Chronosis([]).isValid()).toBeFalse()
	//@ts-expect-error
	expect(new Chronosis({}).isValid()).toBeFalse()
})
test('invalid set', () => {
	//@ts-expect-error
	expect(new Chronosis().set('day', 'string').isValid()).toBeFalse()
	//@ts-expect-error
	expect(new Chronosis().set('year', [2020]).isValid()).toBeFalse()
	//@ts-expect-error
	expect(new Chronosis().set('invalid', 10).isValid()).toBeFalse()
})
