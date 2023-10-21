import { getMinutes } from 'date-fns'
import { Suite } from '../../suite'
import { init_dates } from '../utils'
const { chronosis, chronosis_dev, date, dayjs, luxon, moment } = init_dates()

const suite = new Suite('get minute')

if (!process.env.CI) {
	suite
		.add('chronosis', () => {
			chronosis.get('minute')
		})
		.baseline('chronosis (dev)', () => {
			chronosis_dev.get('minute')
		})
} else {
	suite.baseline('chronosis', () => {
		chronosis.get('minute')
	})
}

suite
	.add('date-fns', () => {
		getMinutes(date)
	})
	.add('dayjs', () => {
		dayjs.get('minute')
	})
	.add('luxon', () => {
		luxon.get('minute')
	})
	.add('moment', () => {
		moment.get('minute')
	})

export default suite
