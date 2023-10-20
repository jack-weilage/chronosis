import { addHours } from 'date-fns'
import { Suite } from '../../suite'
import { init_dates } from '../utils'
const { chronosis, chronosis_dev, date, dayjs, luxon, moment } = init_dates()

const suite = new Suite('add hour')

if (!process.env.CI) {
	suite
		.add('chronosis', () => {
			chronosis.add(12, 'hour')
		})
		.baseline('chronosis (dev)', () => {
			chronosis_dev.add(12, 'hour')
		})
} else {
	suite.baseline('chronosis', () => {
		chronosis.add(12, 'hour')
	})
}

suite
	.add('date-fns', () => {
		addHours(date, 12)
	})
	.add('dayjs', () => {
		dayjs.add(12, 'hour')
	})
	.add('luxon', () => {
		luxon.plus({ hour: 12 })
	})
	.add('moment', () => {
		moment.clone().add(12, 'hour')
	})

export default suite
