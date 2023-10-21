import { getHours } from 'date-fns'
import { Suite } from '../../suite'
import { init_dates } from '../utils'
const { chronosis, chronosis_dev, date, dayjs, luxon, moment } = init_dates()

const suite = new Suite('get hour')

if (!process.env.CI) {
	suite
		.add('chronosis', () => {
			chronosis.get('hour')
		})
		.baseline('chronosis (dev)', () => {
			chronosis_dev.get('hour')
		})
} else {
	suite.baseline('chronosis', () => {
		chronosis.get('hour')
	})
}

suite
	.add('date-fns', () => {
		getHours(date)
	})
	.add('dayjs', () => {
		dayjs.get('hour')
	})
	.add('luxon', () => {
		luxon.get('hour')
	})
	.add('moment', () => {
		moment.get('hour')
	})

export default suite
