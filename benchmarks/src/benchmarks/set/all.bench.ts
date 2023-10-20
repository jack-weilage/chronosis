import { set } from 'date-fns'
import { Suite } from '../../suite'
import { init_dates } from '../utils'
const { chronosis, chronosis_dev, date, dayjs, luxon, moment } = init_dates()

const suite = new Suite('set all')

if (!process.env.CI) {
	suite
		.add('chronosis', () => {
			chronosis
				.set('year', 2012)
				.set('month', 4)
				.set('day', 16)
				.set('hour', 15)
				.set('minute', 36)
				.set('second', 7)
				.set('millisecond', 592)
		})
		.baseline('chronosis (dev)', () => {
			chronosis_dev
				.set('year', 2012)
				.set('month', 4)
				.set('day', 16)
				.set('hour', 15)
				.set('minute', 36)
				.set('second', 7)
				.set('millisecond', 592)
		})
} else {
	suite.baseline('chronosis', () => {
		chronosis
			.set('year', 2012)
			.set('month', 4)
			.set('day', 16)
			.set('hour', 15)
			.set('minute', 36)
			.set('second', 7)
			.set('millisecond', 592)
	})
}

suite
	.add('date-fns', () => {
		set(date, {
			year: 2012,
			month: 4,
			date: 16,
			hours: 15,
			minutes: 36,
			seconds: 7,
			milliseconds: 592,
		})
	})
	.add('dayjs', () => {
		dayjs
			.year(2012)
			.month(4)
			.date(16)
			.hour(15)
			.minute(36)
			.second(7)
			.millisecond(592)
	})
	.add('luxon', () => {
		luxon.set({
			year: 2012,
			month: 4,
			day: 16,
			hour: 15,
			minute: 36,
			second: 7,
			millisecond: 592,
		})
	})
	.add('moment', () => {
		moment
			.clone()
			.set('year', 2012)
			.set('month', 4)
			.set('day', 16)
			.set('hour', 15)
			.set('minute', 36)
			.set('second', 7)
			.set('millisecond', 592)
	})

export default suite
