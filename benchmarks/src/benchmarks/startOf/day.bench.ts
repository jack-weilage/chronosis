import { startOfDay } from 'date-fns'
import { Suite } from '../../suite'
import { init_dates } from '../utils'
const { chronosis, chronosis_dev, date, dayjs, luxon, moment } = init_dates()

const suite = new Suite('startOf day')

if (!process.env.CI) {
	suite
		.add('chronosis', () => {
			chronosis.startOf('day')
		})
		.baseline('chronosis (dev)', () => {
			chronosis_dev.startOf('day')
		})
} else {
	suite.baseline('chronosis', () => {
		chronosis.startOf('day')
	})
}

suite
	.add('date-fns', () => {
		startOfDay(date)
	})
	.add('dayjs', () => {
		dayjs.startOf('day')
	})
	.add('luxon', () => {
		luxon.startOf('day')
	})
	.add('moment', () => {
		moment.clone().startOf('day')
	})

export default suite
