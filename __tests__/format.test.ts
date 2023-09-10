import { beforeAll, expect, setSystemTime, test } from 'bun:test'
import { Chronosis } from '../src/index.ts'

beforeAll(() => {
	setSystemTime(new Date(2021, 5, 6, 14, 9, 5, 50))
})

test('escapes text', () => {
	const chrono = new Chronosis()

	expect(chrono.format('[escapeYYYY] YYYY')).toBe('escapeYYYY 2021')
})
test('timezone', () => {
	const chrono = new Chronosis()

	//TODO: Is this correct?
	expect(chrono.format('Z')).toBe('+00:00')
})
test('meridiem', () => {
	let chrono = new Chronosis()

	expect(chrono.format('a')).toBe('pm')
	expect(chrono.format('A')).toBe('PM')

	chrono = chrono.set('hour', 4)

	expect(chrono.format('a')).toBe('am')
	expect(chrono.format('A')).toBe('AM')
})
test('millisecond', () => {
	const chrono = new Chronosis()

	expect(chrono.format('SSS')).toBe('050')
})
test('second', () => {
	const chrono = new Chronosis()

	expect(chrono.format('s')).toBe('5')
	expect(chrono.format('ss')).toBe('05')
})
test('minute', () => {
	const chrono = new Chronosis()

	expect(chrono.format('m')).toBe('9')
	expect(chrono.format('mm')).toBe('09')
})
test('hour', () => {
	let chrono = new Chronosis()

	expect(chrono.format('h')).toBe('2')
	expect(chrono.format('hh')).toBe('02')

	expect(chrono.format('H')).toBe('14')
	chrono = chrono.set('hour', 2)
	expect(chrono.format('HH')).toBe('02')
})
test('weekday', () => {
	const chrono = new Chronosis()

	expect(chrono.format('d')).toBe('0')
	expect(chrono.format('dd')).toBe('S')
	expect(chrono.format('dd', 'es-MX')).toBe('D')
	expect(chrono.format('ddd')).toBe('Sun')
	expect(chrono.format('ddd', 'es-MX')).toBe('dom.')
	expect(chrono.format('dddd')).toBe('Sunday')
	expect(chrono.format('dddd', 'es-MX')).toBe('domingo')
})
test('day', () => {
	const chrono = new Chronosis()

	expect(chrono.format('D')).toBe('6')
	expect(chrono.format('DD')).toBe('06')
})
test('month', () => {
	const chrono = new Chronosis()

	expect(chrono.format('M')).toBe('6')
	expect(chrono.format('MM')).toBe('06')
	expect(chrono.format('MMM')).toBe('Jun')
	expect(chrono.format('MMM', 'es-MX')).toBe('jun.')
	expect(chrono.format('MMMM')).toBe('June')
	expect(chrono.format('MMMM', 'es-MX')).toBe('junio')
})
test('year', () => {
	const chrono = new Chronosis()

	expect(chrono.format('YY')).toBe('21')
	expect(chrono.format('YYYY')).toBe('2021')
})
