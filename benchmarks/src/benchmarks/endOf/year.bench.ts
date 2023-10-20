import { endOfYear } from 'date-fns'
import { Suite } from '../../suite'
import { init_dates } from '../utils'
const { chronosis, chronosis_dev, date, dayjs, luxon, moment } = init_dates()

const suite = new Suite('endOf year')

if (!process.env.CI) {
	suite
		.add('chronosis', () => {
			chronosis.endOf('year')
		})
		.baseline('chronosis (dev)', () => {
			chronosis_dev.endOf('year')
		})
} else {
	suite.baseline('chronosis', () => {
		chronosis.endOf('year')
	})
}

suite
	.add('date-fns', () => {
		endOfYear(date)
	})
	.add('dayjs', () => {
		dayjs.endOf('year')
	})
	.add('luxon', () => {
		luxon.endOf('year')
	})
	.add('moment', () => {
		moment.clone().endOf('year')
	})

export default suite
