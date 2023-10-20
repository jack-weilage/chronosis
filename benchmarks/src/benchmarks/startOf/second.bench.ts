import { startOfSecond } from 'date-fns'
import { Suite } from '../../suite'
import { init_dates } from '../utils'
const { chronosis, chronosis_dev, date, dayjs, luxon, moment } = init_dates()

const suite = new Suite('startOf second')

if (!process.env.CI) {
	suite
		.add('chronosis', () => {
			chronosis.startOf('second')
		})
		.baseline('chronosis (dev)', () => {
			chronosis_dev.startOf('second')
		})
} else {
	suite.baseline('chronosis', () => {
		chronosis.startOf('second')
	})
}

suite
	.add('date-fns', () => {
		startOfSecond(date)
	})
	.add('dayjs', () => {
		dayjs.startOf('second')
	})
	.add('luxon', () => {
		luxon.startOf('second')
	})
	.add('moment', () => {
		moment.clone().startOf('second')
	})

export default suite
