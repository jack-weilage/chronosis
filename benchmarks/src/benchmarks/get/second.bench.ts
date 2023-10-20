import { getSeconds } from 'date-fns'
import { Suite } from '../../suite'
import { init_dates } from '../utils'
const { chronosis, chronosis_dev, date, dayjs, luxon, moment } = init_dates()

const suite = new Suite('get second')

if (!process.env.CI) {
	suite
		.add('chronosis', () => {
			chronosis.get('second')
		})
		.baseline('chronosis (dev)', () => {
			chronosis_dev.get('second')
		})
} else {
	suite.baseline('chronosis', () => {
		chronosis.get('second')
	})
}

suite
	.add('date-fns', () => {
		getSeconds(date)
	})
	.add('dayjs', () => {
		dayjs.get('second')
	})
	.add('luxon', () => {
		luxon.get('second')
	})
	.add('moment', () => {
		moment.get('second')
	})

export default suite
