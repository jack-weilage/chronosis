import { startOfYear } from 'date-fns'
import { Suite } from '../../suite'
import { init_dates } from '../utils'
const { chronosis, chronosis_dev, date, dayjs, luxon, moment } = init_dates()

const suite = new Suite('startOf year')

if (!process.env.CI) {
	suite
		.add('chronosis', () => {
			chronosis.startOf('year')
		})
		.baseline('chronosis (dev)', () => {
			chronosis_dev.startOf('year')
		})
} else {
	suite.baseline('chronosis', () => {
		chronosis.startOf('year')
	})
}

suite
	.add('date-fns', () => {
		startOfYear(date)
	})
	.add('dayjs', () => {
		dayjs.startOf('year')
	})
	.add('luxon', () => {
		luxon.startOf('year')
	})
	.add('moment', () => {
		moment.clone().startOf('year')
	})

export default suite
