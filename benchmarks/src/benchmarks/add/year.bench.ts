import { addYears } from 'date-fns'
import { Suite } from '../../suite'
import { init_dates } from '../utils'
const { chronosis, chronosis_dev, date, dayjs, luxon, moment } = init_dates()

const suite = new Suite('add year')

if (!process.env.CI) {
	suite
		.add('chronosis', () => {
			chronosis.add(1, 'year')
		})
		.baseline('chronosis (dev)', () => {
			chronosis_dev.add(1, 'year')
		})
} else {
	suite.baseline('chronosis', () => {
		chronosis.add(1, 'year')
	})
}

suite
	.add('date-fns', () => {
		addYears(date, 1)
	})
	.add('dayjs', () => {
		dayjs.add(1, 'year')
	})
	.add('luxon', () => {
		luxon.plus({ year: 1 })
	})
	.add('moment', () => {
		moment.clone().add(1, 'year')
	})

export default suite
