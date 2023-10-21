import { endOfDay } from 'date-fns'
import { Suite } from '../../suite'
import { init_dates } from '../utils'
const { chronosis, chronosis_dev, date, dayjs, luxon, moment } = init_dates()

const suite = new Suite('endOf day')

if (!process.env.CI) {
	suite
		.add('chronosis', () => {
			chronosis.endOf('day')
		})
		.baseline('chronosis (dev)', () => {
			chronosis_dev.endOf('day')
		})
} else {
	suite.baseline('chronosis', () => {
		chronosis.endOf('day')
	})
}

suite
	.add('date-fns', () => {
		endOfDay(date)
	})
	.add('dayjs', () => {
		dayjs.endOf('day')
	})
	.add('luxon', () => {
		luxon.endOf('day')
	})
	.add('moment', () => {
		moment.clone().endOf('day')
	})

export default suite
