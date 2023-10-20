import { baseline, bench, group } from 'mitata'
import { ITERATIONS, init_dates } from '../../utils.js'

import { sub } from 'date-fns'

group(`subtract`, () => {
	const { chronosis, chronosis_dev, date, dayjs, luxon, moment } = init_dates()

	bench('chronosis', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			chronosis.subtract(1, 'year').subtract(2, 'month').subtract(5, 'day')
		}
	})
	baseline('chronosis (dev)', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			chronosis_dev.subtract(1, 'year').subtract(2, 'month').subtract(5, 'day')
		}
	})
	bench('date-fns', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			sub(date, { years: 1, months: 2, days: 5 })
		}
	})
	bench('dayjs', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			dayjs.subtract(1, 'year').subtract(2, 'months').subtract(5, 'days')
		}
	})
	bench('luxon', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			luxon.minus({ year: 1, months: 2, days: 5 })
		}
	})
	bench('moment', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			moment
				.clone()
				.subtract(1, 'year')
				.subtract(2, 'months')
				.subtract(5, 'days')
		}
	})
})
