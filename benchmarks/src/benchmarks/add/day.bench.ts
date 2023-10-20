import { addDays } from 'date-fns'
import { Suite } from '../../suite'
import { init_dates } from '../utils'
const { chronosis, chronosis_dev, date, dayjs, luxon, moment } = init_dates()

const suite = new Suite('add day')

if (!process.env.CI) {
	suite
		.add('chronosis', () => {
			chronosis.add(5, 'day')
		})
		.baseline('chronosis (dev)', () => {
			chronosis_dev.add(5, 'day')
		})
} else {
	suite.baseline('chronosis', () => {
		chronosis.add(5, 'day')
	})
}

suite
	.add('date-fns', () => {
		addDays(date, 5)
	})
	.add('dayjs', () => {
		dayjs.add(5, 'day')
	})
	.add('luxon', () => {
		luxon.plus({ day: 5 })
	})
	.add('moment', () => {
		moment.clone().add(5, 'day')
	})

export default suite
