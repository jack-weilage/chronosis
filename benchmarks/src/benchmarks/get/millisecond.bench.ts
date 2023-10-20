import { getMilliseconds } from 'date-fns'
import { Suite } from '../../suite'
import { init_dates } from '../utils'
const { chronosis, chronosis_dev, date, dayjs, luxon, moment } = init_dates()

const suite = new Suite('get millisecond')

if (!process.env.CI) {
	suite
		.add('chronosis', () => {
			chronosis.get('millisecond')
		})
		.baseline('chronosis (dev)', () => {
			chronosis_dev.get('millisecond')
		})
} else {
	suite.baseline('chronosis', () => {
		chronosis.get('millisecond')
	})
}

suite
	.add('date-fns', () => {
		getMilliseconds(date)
	})
	.add('dayjs', () => {
		dayjs.get('millisecond')
	})
	.add('luxon', () => {
		luxon.get('millisecond')
	})
	.add('moment', () => {
		moment.get('millisecond')
	})

export default suite
