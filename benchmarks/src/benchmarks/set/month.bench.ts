import { setMonth } from 'date-fns'
import { Suite } from '../../suite'
import { init_dates } from '../utils'
const { chronosis, chronosis_dev, date, dayjs, luxon, moment } = init_dates()

const suite = new Suite('set month')

if (!process.env.CI) {
	suite
		.add('chronosis', () => {
			chronosis.set('month', 4)
		})
		.baseline('chronosis (dev)', () => {
			chronosis_dev.set('month', 4)
		})
} else {
	suite.baseline('chronosis', () => {
		chronosis.set('month', 4)
	})
}

suite
	.add('date-fns', () => {
		setMonth(date, 4)
	})
	.add('dayjs', () => {
		dayjs.set('month', 4)
	})
	.add('luxon', () => {
		luxon.set({ month: 4 })
	})
	.add('moment', () => {
		moment.clone().set('month', 4)
	})

export default suite
