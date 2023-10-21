import { addMonths } from 'date-fns'
import { Suite } from '../../suite'
import { init_dates } from '../utils'
const { chronosis, chronosis_dev, date, dayjs, luxon, moment } = init_dates()

const suite = new Suite('add month')

if (!process.env.CI) {
	suite
		.add('chronosis', () => {
			chronosis.add(2, 'month')
		})
		.baseline('chronosis (dev)', () => {
			chronosis_dev.add(2, 'month')
		})
} else {
	suite.baseline('chronosis', () => {
		chronosis.add(2, 'month')
	})
}

suite
	.add('date-fns', () => {
		addMonths(date, 2)
	})
	.add('dayjs', () => {
		dayjs.add(2, 'month')
	})
	.add('luxon', () => {
		luxon.plus({ month: 4 })
	})
	.add('moment', () => {
		moment.clone().add(2, 'month')
	})

export default suite
