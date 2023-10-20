import { startOfMonth } from 'date-fns'
import { Suite } from '../../suite'
import { init_dates } from '../utils'
const { chronosis, chronosis_dev, date, dayjs, luxon, moment } = init_dates()

const suite = new Suite('startOf month')

if (!process.env.CI) {
	suite
		.add('chronosis', () => {
			chronosis.startOf('month')
		})
		.baseline('chronosis (dev)', () => {
			chronosis_dev.startOf('month')
		})
} else {
	suite.baseline('chronosis', () => {
		chronosis.startOf('month')
	})
}

suite
	.add('date-fns', () => {
		startOfMonth(date)
	})
	.add('dayjs', () => {
		dayjs.startOf('month')
	})
	.add('luxon', () => {
		luxon.startOf('month')
	})
	.add('moment', () => {
		moment.clone().startOf('month')
	})

export default suite
