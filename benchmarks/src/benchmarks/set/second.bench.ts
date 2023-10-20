import { setSeconds } from 'date-fns'
import { Suite } from '../../suite'
import { init_dates } from '../utils'
const { chronosis, chronosis_dev, date, dayjs, luxon, moment } = init_dates()

const suite = new Suite('set second')

if (!process.env.CI) {
	suite
		.add('chronosis', () => {
			chronosis.set('second', 7)
		})
		.baseline('chronosis (dev)', () => {
			chronosis_dev.set('second', 7)
		})
} else {
	suite.baseline('chronosis', () => {
		chronosis.set('second', 7)
	})
}

suite
	.add('date-fns', () => {
		setSeconds(date, 7)
	})
	.add('dayjs', () => {
		dayjs.set('second', 7)
	})
	.add('luxon', () => {
		luxon.set({ second: 7 })
	})
	.add('moment', () => {
		moment.clone().set('second', 7)
	})

export default suite
