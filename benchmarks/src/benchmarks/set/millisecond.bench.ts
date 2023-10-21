import { setHours } from 'date-fns'
import { Suite } from '../../suite'
import { init_dates } from '../utils'
const { chronosis, chronosis_dev, date, dayjs, luxon, moment } = init_dates()

const suite = new Suite('set millisecond')

if (!process.env.CI) {
	suite
		.add('chronosis', () => {
			chronosis.set('millisecond', 592)
		})
		.baseline('chronosis (dev)', () => {
			chronosis_dev.set('millisecond', 592)
		})
} else {
	suite.baseline('chronosis', () => {
		chronosis.set('millisecond', 592)
	})
}

suite
	.add('date-fns', () => {
		setHours(date, 592)
	})
	.add('dayjs', () => {
		dayjs.set('millisecond', 592)
	})
	.add('luxon', () => {
		luxon.set({ millisecond: 592 })
	})
	.add('moment', () => {
		moment.clone().set('millisecond', 592)
	})

export default suite
