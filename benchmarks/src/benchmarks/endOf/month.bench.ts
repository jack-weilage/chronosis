import { endOfMonth } from 'date-fns'
import { Suite } from '../../suite'
import { init_dates } from '../utils'
const { chronosis, chronosis_dev, date, dayjs, luxon, moment } = init_dates()

const suite = new Suite('endOf month')

if (!process.env.CI) {
	suite
		.add('chronosis', () => {
			chronosis.endOf('month')
		})
		.baseline('chronosis (dev)', () => {
			chronosis_dev.endOf('month')
		})
} else {
	suite.baseline('chronosis', () => {
		chronosis.endOf('month')
	})
}

suite
	.add('date-fns', () => {
		endOfMonth(date)
	})
	.add('dayjs', () => {
		dayjs.endOf('month')
	})
	.add('luxon', () => {
		luxon.endOf('month')
	})
	.add('moment', () => {
		moment.clone().endOf('month')
	})

export default suite
