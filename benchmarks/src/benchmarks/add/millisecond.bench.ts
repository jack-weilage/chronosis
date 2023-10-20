import { addMilliseconds } from 'date-fns'
import { Suite } from '../../suite'
import { init_dates } from '../utils'
const { chronosis, chronosis_dev, date, dayjs, luxon, moment } = init_dates()

const suite = new Suite('add millisecond')

if (!process.env.CI) {
	suite
		.add('chronosis', () => {
			chronosis.add(592, 'millisecond')
		})
		.baseline('chronosis (dev)', () => {
			chronosis_dev.add(592, 'millisecond')
		})
} else {
	suite.baseline('chronosis', () => {
		chronosis.add(592, 'millisecond')
	})
}

suite
	.add('date-fns', () => {
		addMilliseconds(date, 592)
	})
	.add('dayjs', () => {
		dayjs.add(592, 'millisecond')
	})
	.add('luxon', () => {
		luxon.plus({ millisecond: 592 })
	})
	.add('moment', () => {
		moment.clone().add(592, 'millisecond')
	})

export default suite
