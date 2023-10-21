import { setDay } from 'date-fns'
import { Suite } from '../../suite'
import { init_dates } from '../utils'
const { chronosis, chronosis_dev, date, dayjs, luxon, moment } = init_dates()

const suite = new Suite('set day')

if (!process.env.CI) {
	suite
		.add('chronosis', () => {
			chronosis.set('day', 16)
		})
		.baseline('chronosis (dev)', () => {
			chronosis_dev.set('day', 16)
		})
} else {
	suite.baseline('chronosis', () => {
		chronosis.set('day', 16)
	})
}

suite
	.add('date-fns', () => {
		setDay(date, 16)
	})
	.add('dayjs', () => {
		dayjs.set('day', 16)
	})
	.add('luxon', () => {
		luxon.set({ day: 16 })
	})
	.add('moment', () => {
		moment.clone().set('day', 16)
	})

export default suite
