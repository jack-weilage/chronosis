import { add, addMilliseconds } from 'date-fns'
import { Suite } from '../../suite'
import { init_dates } from '../utils'
const { chronosis, chronosis_dev, date, dayjs, luxon, moment } = init_dates()

const suite = new Suite('get day')

if (!process.env.CI) {
	suite
		.add('chronosis', () => {
			chronosis
				.add(1, 'year')
				.add(2, 'month')
				.add(5, 'day')
				.add(12, 'hour')
				.add(56, 'minute')
				.add(25, 'second')
				.add(592, 'millisecond')
		})
		.baseline('chronosis (dev)', () => {
			chronosis_dev
				.add(1, 'year')
				.add(2, 'month')
				.add(5, 'day')
				.add(12, 'hour')
				.add(56, 'minute')
				.add(25, 'second')
				.add(592, 'millisecond')
		})
} else {
	suite.baseline('chronosis', () => {
		chronosis
			.add(1, 'year')
			.add(2, 'month')
			.add(5, 'day')
			.add(12, 'hour')
			.add(56, 'minute')
			.add(25, 'second')
			.add(592, 'millisecond')
	})
}

suite
	.add('date-fns', () => {
		addMilliseconds(
			add(date, {
				years: 1,
				months: 2,
				days: 5,
				hours: 12,
				minutes: 56,
				seconds: 25,
			}),
			592,
		)
	})
	.add('dayjs', () => {
		dayjs
			.add(1, 'year')
			.add(2, 'month')
			.add(5, 'day')
			.add(12, 'hour')
			.add(56, 'minute')
			.add(25, 'second')
			.add(592, 'millisecond')
	})
	.add('luxon', () => {
		luxon.plus({
			year: 1,
			month: 2,
			day: 5,
			hour: 12,
			minute: 56,
			second: 25,
			millisecond: 592,
		})
	})
	.add('moment', () => {
		moment
			.clone()
			.add(1, 'year')
			.add(2, 'month')
			.add(5, 'day')
			.add(12, 'hour')
			.add(56, 'minute')
			.add(25, 'second')
			.add(592, 'millisecond')
	})

export default suite
