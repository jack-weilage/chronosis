import { getMonth } from 'date-fns'
import { Suite } from '../../suite'
import { init_dates } from '../utils'
const { chronosis, chronosis_dev, date, dayjs, luxon, moment } = init_dates()

const suite = new Suite('get month')

if (!process.env.CI) {
	suite
		.add('chronosis', () => {
			chronosis.get('month')
		})
		.baseline('chronosis (dev)', () => {
			chronosis_dev.get('month')
		})
} else {
	suite.baseline('chronosis', () => {
		chronosis.get('month')
	})
}

suite
	.add('date-fns', () => {
		getMonth(date)
	})
	.add('dayjs', () => {
		dayjs.get('month')
	})
	.add('luxon', () => {
		luxon.get('month')
	})
	.add('moment', () => {
		moment.get('month')
	})

export default suite
