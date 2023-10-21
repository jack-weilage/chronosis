import { endOfSecond } from 'date-fns'
import { Suite } from '../../suite'
import { init_dates } from '../utils'
const { chronosis, chronosis_dev, date, dayjs, luxon, moment } = init_dates()

const suite = new Suite('endOf second')

if (!process.env.CI) {
	suite
		.add('chronosis', () => {
			chronosis.endOf('second')
		})
		.baseline('chronosis (dev)', () => {
			chronosis_dev.endOf('second')
		})
} else {
	suite.baseline('chronosis', () => {
		chronosis.endOf('second')
	})
}

suite
	.add('date-fns', () => {
		endOfSecond(date)
	})
	.add('dayjs', () => {
		dayjs.endOf('second')
	})
	.add('luxon', () => {
		luxon.endOf('second')
	})
	.add('moment', () => {
		moment.clone().endOf('second')
	})

export default suite
