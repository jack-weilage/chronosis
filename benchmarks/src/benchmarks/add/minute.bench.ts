import { addMinutes } from 'date-fns'
import { Suite } from '../../suite'
import { init_dates } from '../utils'
const { chronosis, chronosis_dev, date, dayjs, luxon, moment } = init_dates()

const suite = new Suite('add minute')

if (!process.env.CI) {
	suite
		.add('chronosis', () => {
			chronosis.add(56, 'minute')
		})
		.baseline('chronosis (dev)', () => {
			chronosis_dev.add(56, 'minute')
		})
} else {
	suite.baseline('chronosis', () => {
		chronosis.add(56, 'minute')
	})
}

suite
	.add('date-fns', () => {
		addMinutes(date, 36)
	})
	.add('dayjs', () => {
		dayjs.add(56, 'minute')
	})
	.add('luxon', () => {
		luxon.plus({ minute: 36 })
	})
	.add('moment', () => {
		moment.clone().add(56, 'minute')
	})

export default suite
