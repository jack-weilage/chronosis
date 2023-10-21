import { setMinutes } from 'date-fns'
import { Suite } from '../../suite'
import { init_dates } from '../utils'
const { chronosis, chronosis_dev, date, dayjs, luxon, moment } = init_dates()

const suite = new Suite('set minute')

if (!process.env.CI) {
	suite
		.add('chronosis', () => {
			chronosis.set('minute', 36)
		})
		.baseline('chronosis (dev)', () => {
			chronosis_dev.set('minute', 36)
		})
} else {
	suite.baseline('chronosis', () => {
		chronosis.set('minute', 36)
	})
}

suite
	.add('date-fns', () => {
		setMinutes(date, 36)
	})
	.add('dayjs', () => {
		dayjs.set('minute', 36)
	})
	.add('luxon', () => {
		luxon.set({ minute: 36 })
	})
	.add('moment', () => {
		moment.clone().set('minute', 36)
	})

export default suite
