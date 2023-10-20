import { endOfMinute } from 'date-fns'
import { Suite } from '../../suite'
import { init_dates } from '../utils'
const { chronosis, chronosis_dev, date, dayjs, luxon, moment } = init_dates()

const suite = new Suite('endOf minute')

if (!process.env.CI) {
	suite
		.add('chronosis', () => {
			chronosis.endOf('minute')
		})
		.baseline('chronosis (dev)', () => {
			chronosis_dev.endOf('minute')
		})
} else {
	suite.baseline('chronosis', () => {
		chronosis.endOf('minute')
	})
}

suite
	.add('date-fns', () => {
		endOfMinute(date)
	})
	.add('dayjs', () => {
		dayjs.endOf('minute')
	})
	.add('luxon', () => {
		luxon.endOf('minute')
	})
	.add('moment', () => {
		moment.clone().endOf('minute')
	})

export default suite
