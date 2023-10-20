import { endOfHour } from 'date-fns'
import { Suite } from '../../suite'
import { init_dates } from '../utils'
const { chronosis, chronosis_dev, date, dayjs, luxon, moment } = init_dates()

const suite = new Suite('endOf hour')

if (!process.env.CI) {
	suite
		.add('chronosis', () => {
			chronosis.endOf('hour')
		})
		.baseline('chronosis (dev)', () => {
			chronosis_dev.endOf('hour')
		})
} else {
	suite.baseline('chronosis', () => {
		chronosis.endOf('hour')
	})
}

suite
	.add('date-fns', () => {
		endOfHour(date)
	})
	.add('dayjs', () => {
		dayjs.endOf('hour')
	})
	.add('luxon', () => {
		luxon.endOf('hour')
	})
	.add('moment', () => {
		moment.clone().endOf('hour')
	})

export default suite
