import { getDay } from 'date-fns'
import { Suite } from '../../suite'
import { init_dates } from '../utils'
const { chronosis, chronosis_dev, date, dayjs, luxon, moment } = init_dates()

const suite = new Suite('get day')

if (!process.env.CI) {
	suite
		.add('chronosis', () => {
			chronosis.get('day')
		})
		.baseline('chronosis (dev)', () => {
			chronosis_dev.get('day')
		})
} else {
	suite.baseline('chronosis', () => {
		chronosis.get('day')
	})
}

suite
	.add('date-fns', () => {
		getDay(date)
	})
	.add('dayjs', () => {
		dayjs.get('day')
	})
	.add('luxon', () => {
		luxon.get('day')
	})
	.add('moment', () => {
		moment.get('day')
	})

export default suite
