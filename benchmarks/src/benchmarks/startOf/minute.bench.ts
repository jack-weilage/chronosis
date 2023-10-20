import { startOfMinute } from 'date-fns'
import { Suite } from '../../suite'
import { init_dates } from '../utils'
const { chronosis, chronosis_dev, date, dayjs, luxon, moment } = init_dates()

const suite = new Suite('startOf minute')

if (!process.env.CI) {
	suite
		.add('chronosis', () => {
			chronosis.startOf('minute')
		})
		.baseline('chronosis (dev)', () => {
			chronosis_dev.startOf('minute')
		})
} else {
	suite.baseline('chronosis', () => {
		chronosis.startOf('minute')
	})
}

suite
	.add('date-fns', () => {
		startOfMinute(date)
	})
	.add('dayjs', () => {
		dayjs.startOf('minute')
	})
	.add('luxon', () => {
		luxon.startOf('minute')
	})
	.add('moment', () => {
		moment.clone().startOf('minute')
	})

export default suite
