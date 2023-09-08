//TODO: Fully benchmark (maybe copy tests?)
import { bench, group, run } from 'mitata'

import dayjs from 'dayjs'
import { DateTime } from 'luxon'
import moment from 'moment'
import { Chronosis } from '../../src/index.js'

const ITERATIONS = 10000

const init_dates = () => ({
	dayjs: dayjs(),
	luxon: DateTime.local(),
	moment: moment(),
	chronosis: new Chronosis(),
})

bench('JIT warmup', () => {})
bench('JIT warmup', () => {})
bench('JIT warmup', () => {})
bench('JIT warmup', () => {})
bench('JIT warmup', () => {})
bench('JIT warmup', () => {})
bench('JIT warmup', () => {})
bench('JIT warmup', () => {})
bench('JIT warmup', () => {})
bench('JIT warmup', () => {})

group(`create ${ITERATIONS}x instances`, () => {
	bench('chronosis', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			new Chronosis()
		}
	})
	bench('dayjs', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			dayjs()
		}
	})
	bench('luxon', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			DateTime.local()
		}
	})
	bench('moment', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			moment()
		}
	})
})

group(`add then subtract ${ITERATIONS}x times`, () => {
	const { chronosis, dayjs, luxon, moment } = init_dates()

	bench('chronosis', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			chronosis.add(1, 'year').add(2, 'month').add(5, 'day')
			chronosis.subtract(1, 'year').add(2, 'month').subtract(5, 'day')
		}
	})
	bench('dayjs', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			dayjs.add(1, 'year').add(2, 'months').add(5, 'days')
			dayjs.subtract(1, 'year').add(2, 'months').subtract(5, 'days')
		}
	})
	bench('luxon', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			luxon.plus({ year: 1, months: 2, days: 5 })
			luxon.minus({ year: 1, months: 2, days: 5 })
		}
	})
	bench('moment', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			moment.add(1, 'year').add(2, 'months').add(5, 'days')
			moment.subtract(1, 'year').add(2, 'months').subtract(5, 'days')
		}
	})
})

group(`format date ${ITERATIONS}x times`, () => {
	const { chronosis, dayjs, luxon, moment } = init_dates()

	bench('chronosis', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			chronosis.format('MM/DD/YYYY HH:mm:ss')
		}
	})
	bench('dayjs', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			dayjs.format('MM/DD/YYYY hh:mm:ss')
		}
	})
	bench('luxon', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			luxon.toFormat('MM/dd/yyyy HH:mm:ss')
		}
	})
	bench('moment', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			moment.format('MM/DD/yyyy HH:mm:ss')
		}
	})
})

group(`format date with words ${ITERATIONS}x times`, () => {
	const { chronosis, dayjs, luxon, moment } = init_dates()

	bench('chronosis', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			chronosis.format('dddd MMMM')
		}
	})
	bench('dayjs', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			dayjs.format('dddd MMMM')
		}
	})
	bench('luxon', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			luxon.toFormat('cccc MMMM')
		}
	})
	bench('moment', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			moment.format('dddd MMMM')
		}
	})
})

group(`toString ${ITERATIONS}x times`, () => {
	const { chronosis, dayjs, luxon, moment } = init_dates()

	bench('chronosis', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			chronosis.toString()
		}
	})
	bench('dayjs', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			dayjs.toString()
		}
	})
	bench('luxon', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			luxon.toString()
		}
	})
	bench('moment', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			moment.toString()
		}
	})
})

group(`valueOf ${ITERATIONS}x times`, () => {
	const { chronosis, dayjs, luxon, moment } = init_dates()

	bench('chronosis', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			chronosis.valueOf()
		}
	})
	bench('dayjs', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			dayjs.valueOf()
		}
	})
	bench('luxon', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			luxon.valueOf()
		}
	})
	bench('moment', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			moment.valueOf()
		}
	})
})

group(`create ${ITERATIONS}x clones`, () => {
	const { chronosis, dayjs, luxon, moment } = init_dates()

	bench('chronosis', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			chronosis.clone()
		}
	})
	bench('dayjs', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			dayjs.clone()
		}
	})
	bench('luxon', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			DateTime.fromJSDate(luxon.toJSDate())
		}
	})
	bench('moment', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			moment.clone()
		}
	})
})

await run({
	percentiles: false,
})
