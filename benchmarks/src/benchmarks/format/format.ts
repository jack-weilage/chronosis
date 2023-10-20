import { baseline, bench, group } from 'mitata'
import { ITERATIONS, init_dates } from '../../utils.js'

import { format } from 'date-fns'
import { es } from 'date-fns/locale'

group(`complex format (spanish)`, () => {
	const { chronosis, chronosis_dev, date, dayjs, luxon, moment } = init_dates()

	bench('chronosis', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			chronosis.format(
				'[Currently:] HH:mm:ss.SSS (a) [on] MMMM D (dddd), YYYY',
				'es',
			)
		}
	})
	baseline('chronosis (dev)', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			chronosis_dev.format(
				'[Currently:] HH:mm:ss.SSS (a) [on] MMMM D (dddd), YYYY',
				'es',
			)
		}
	})
	bench('date-fns', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			format(date, "'Currently:' HH:mm:ss.SSS (aaa) 'on' MMMM d (EEEE), yyyy", {
				locale: es,
			})
		}
	})
	bench('dayjs', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			dayjs
				.locale('es')
				.format('[Currently:] HH:mm:ss.SSS (a) [on] MMMM D (dddd), YYYY')
		}
	})
	bench('luxon', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			luxon
				.setLocale('es')
				.toFormat("'Currently:' HH:mm:ss.SSS (a) 'on' MMMM d (EEEE), yyyy")
		}
	})
	bench('moment', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			moment
				.clone()
				.locale('es')
				.format('[Currently:] HH:mm:ss.SSS (a) [on] MMMM D (dddd), YYYY')
		}
	})
})
group(`simple format`, () => {
	const { chronosis, chronosis_dev, date, dayjs, luxon, moment } = init_dates()

	bench('chronosis', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			chronosis.format('HH:mm:ss.SSS YYYY-MM-DD')
		}
	})
	baseline('chronosis (dev)', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			chronosis_dev.format('HH:mm:ss.SSS YYYY-MM-DD')
		}
	})
	bench('date-fns', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			format(date, 'HH:mm:ss.SSS yyyy-MM-dd')
		}
	})
	bench('dayjs', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			dayjs.format('HH:mm:ss.SSS YYYY-MM-DD')
		}
	})
	bench('luxon', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			luxon.toFormat('HH:mm:ss.SSS yyyy-MM-DD')
		}
	})
	bench('moment', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			moment.format('HH:mm:ss.SSS YYYY-MM-DD')
		}
	})
})
