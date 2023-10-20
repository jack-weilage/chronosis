import { getYear } from 'date-fns'
import { Suite } from '../../suite'
import { init_dates } from '../utils'
const { chronosis, chronosis_dev, date, dayjs, luxon, moment } = init_dates()

const suite = new Suite('get year')

if (!process.env.CI) {
	suite
		.add('chronosis', () => {
			chronosis.get('year')
		})
		.baseline('chronosis (dev)', () => {
			chronosis_dev.get('year')
		})
} else {
	suite.baseline('chronosis', () => {
		chronosis.get('year')
	})
}

suite
	.add('date-fns', () => {
		getYear(date)
	})
	.add('dayjs', () => {
		dayjs.get('year')
	})
	.add('luxon', () => {
		luxon.get('year')
	})
	.add('moment', () => {
		moment.get('year')
	})

export default suite
