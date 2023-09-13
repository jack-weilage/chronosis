//TODO: Fully benchmark (maybe copy tests?)
import { bench, group, run } from 'mitata'

import { Chronosis } from 'chronosis'
import dayjs from 'dayjs'
import { DateTime } from 'luxon'
import moment from 'moment'
import { Chronosis as ChronosisLatest } from '../../src/index.ts'

const ITERATIONS = parseInt(process.argv[2]) || 10000

const init_dates = () => ({
	chronosis: new Chronosis(),
	chronosis_latest: new ChronosisLatest(),
	dayjs: dayjs(),
	luxon: DateTime.local(),
	moment: moment(),
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
	bench('chronosis (latest)', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			new ChronosisLatest()
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

group(`add ${ITERATIONS}x`, () => {
	const { chronosis, chronosis_latest, dayjs, luxon, moment } = init_dates()

	bench('chronosis', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			chronosis.clone().add(1, 'year').add(2, 'month').add(5, 'day')
		}
	})
	bench('chronosis (latest)', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			chronosis_latest.add(1, 'year').add(2, 'month').add(5, 'day')
		}
	})
	bench('dayjs', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			dayjs.add(1, 'year').add(2, 'months').add(5, 'days')
		}
	})
	bench('luxon', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			luxon.plus({ year: 1, months: 2, days: 5 })
		}
	})
	bench('moment', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			moment.add(1, 'year').add(2, 'months').add(5, 'days')
		}
	})
})
group(`subtract ${ITERATIONS}x`, () => {
	const { chronosis, chronosis_latest, dayjs, luxon, moment } = init_dates()

	bench('chronosis', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			chronosis.clone().subtract(1, 'year').add(2, 'month').subtract(5, 'day')
		}
	})
	bench('chronosis (latest)', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			chronosis_latest.subtract(1, 'year').add(2, 'month').subtract(5, 'day')
		}
	})
	bench('dayjs', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			dayjs.subtract(1, 'year').add(2, 'months').subtract(5, 'days')
		}
	})
	bench('luxon', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			luxon.minus({ year: 1, months: 2, days: 5 })
		}
	})
	bench('moment', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			moment.subtract(1, 'year').add(2, 'months').subtract(5, 'days')
		}
	})
})

group(`get ${ITERATIONS}x`, () => {
	const { chronosis, chronosis_latest, dayjs, luxon, moment } = init_dates()

	bench('chronosis', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			chronosis.get('month')
		}
	})
	bench('chronosis (latest)', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			chronosis_latest.get('month')
		}
	})
	bench('dayjs', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			dayjs.month()
		}
	})
	bench('luxon', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			luxon.month
		}
	})
	bench('moment', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			moment.month()
		}
	})
})
group(`set ${ITERATIONS}x`, () => {
	const { chronosis, chronosis_latest, dayjs, luxon, moment } = init_dates()

	bench('chronosis', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			chronosis.clone().set('month', 4)
		}
	})
	bench('chronosis (latest)', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			chronosis_latest.set('month', 4)
		}
	})
	bench('dayjs', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			dayjs.month(4)
		}
	})
	bench('luxon', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			luxon.set({ month: 4 })
		}
	})
	bench('moment', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			moment.set('month', 4)
		}
	})
})

group(`compare ${ITERATIONS}x`, () => {
	const { chronosis, chronosis_latest, dayjs, luxon, moment } = init_dates()

	const date = new Date()
	const diff_datetime = DateTime.fromJSDate(date)
	bench('chronosis', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			;+chronosis < +date
		}
	})
	bench('chronosis (latest)', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			;+chronosis_latest < +date
		}
	})
	bench('dayjs', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			dayjs.isBefore(date)
		}
	})
	bench('luxon', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			luxon.diff(diff_datetime)
		}
	})
	bench('moment', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			moment.diff(date)
		}
	})
})

group(`simple format date ${ITERATIONS}x`, () => {
	const { chronosis, chronosis_latest, dayjs, luxon, moment } = init_dates()

	bench('chronosis', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			chronosis.format('MM/DD/YYYY HH:mm:ss')
		}
	})
	bench('chronosis (latest)', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			chronosis_latest.format('MM/DD/YYYY HH:mm:ss')
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
//TODO: chronosis currently crashes my laptop while running this benchmark.
/*
group(`complex format date ${ITERATIONS}x`, () => {
	const { chronosis, chronosis_latest, dayjs, luxon, moment } = init_dates()

	bench('chronosis', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			chronosis.format('dddd MMMM')
		}
	})
	bench('chronosis (latest)', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			chronosis_latest.format('dddd MMMM')
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
*/

group(`toString ${ITERATIONS}x`, () => {
	const { chronosis, chronosis_latest, dayjs, luxon, moment } = init_dates()

	bench('chronosis', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			chronosis.toString()
		}
	})
	bench('chronosis (latest)', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			chronosis_latest.toString()
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
group(`valueOf ${ITERATIONS}x`, () => {
	const { chronosis, chronosis_latest, dayjs, luxon, moment } = init_dates()

	bench('chronosis', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			chronosis.valueOf()
		}
	})
	bench('chronosis (latest)', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			chronosis_latest.valueOf()
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
group(`toDate ${ITERATIONS}x`, () => {
	const { chronosis, chronosis_latest, dayjs, luxon, moment } = init_dates()

	bench('chronosis', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			chronosis.toDate()
		}
	})
	bench('chronosis (latest)', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			chronosis_latest.toDate()
		}
	})
	bench('dayjs', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			dayjs.toDate()
		}
	})
	bench('luxon', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			luxon.toJSDate()
		}
	})
	bench('moment', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			moment.toDate()
		}
	})
})

group(`clone ${ITERATIONS}x`, () => {
	const { chronosis, chronosis_latest, dayjs, luxon, moment } = init_dates()

	bench('chronosis', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			chronosis.clone()
		}
	})
	bench('chronosis (latest)', () => {
		for (let i = 0; i < ITERATIONS; i++) {
			chronosis_latest.clone()
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
