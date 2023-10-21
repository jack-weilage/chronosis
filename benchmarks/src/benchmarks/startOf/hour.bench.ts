import { startOfHour } from 'date-fns'
import { Suite } from '../../suite'
import { init_dates } from '../utils'
const { chronosis, chronosis_dev, date, dayjs, luxon, moment } = init_dates()

const suite = new Suite('startOf hour')

if (!process.env.CI) {
	suite
		.add('chronosis', () => {
			chronosis.startOf('hour')
		})
		.baseline('chronosis (dev)', () => {
			chronosis_dev.startOf('hour')
		})
} else {
	suite.baseline('chronosis', () => {
		chronosis.startOf('hour')
	})
}

suite
	.add('date-fns', () => {
		startOfHour(date)
	})
	.add('dayjs', () => {
		dayjs.startOf('hour')
	})
	.add('luxon', () => {
		luxon.startOf('hour')
	})
	.add('moment', () => {
		moment.clone().startOf('hour')
	})

export default suite
