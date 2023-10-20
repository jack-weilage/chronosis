import { baseline, bench, group } from 'mitata'
import { ITERATIONS, init_dates } from '../../utils.js'

import { isValid } from 'date-fns'

group(`isValid`, () => {
	const { chronosis, chronosis_dev, date, dayjs, luxon, moment } = init_dates()

	bench('chronosis', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			chronosis.isValid()
		}
	})
	baseline('chronosis (dev)', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			chronosis_dev.isValid()
		}
	})
	bench('date-fns', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			isValid(date)
		}
	})
	bench('dayjs', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			dayjs.isValid()
		}
	})
	bench('luxon', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			luxon.isValid
		}
	})
	bench('moment', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			moment.isValid()
		}
	})
})
