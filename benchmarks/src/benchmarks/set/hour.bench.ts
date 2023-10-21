import { setHours } from 'date-fns'
import { Suite } from '../../suite'
import { init_dates } from '../utils'
const { chronosis, chronosis_dev, date, dayjs, luxon, moment } = init_dates()

const suite = new Suite('set hour')

if (!process.env.CI) {
	suite
		.add('chronosis', () => {
			chronosis.set('hour', 15)
		})
		.baseline('chronosis (dev)', () => {
			chronosis_dev.set('hour', 15)
		})
} else {
	suite.baseline('chronosis', () => {
		chronosis.set('hour', 15)
	})
}

suite
	.add('date-fns', () => {
		setHours(date, 15)
	})
	.add('dayjs', () => {
		dayjs.set('hour', 15)
	})
	.add('luxon', () => {
		luxon.set({ hour: 15 })
	})
	.add('moment', () => {
		moment.clone().set('hour', 15)
	})

export default suite
