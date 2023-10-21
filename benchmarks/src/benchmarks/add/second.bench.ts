import { addSeconds } from 'date-fns'
import { Suite } from '../../suite'
import { init_dates } from '../utils'
const { chronosis, chronosis_dev, date, dayjs, luxon, moment } = init_dates()

const suite = new Suite('add second')

if (!process.env.CI) {
	suite
		.add('chronosis', () => {
			chronosis.add(25, 'second')
		})
		.baseline('chronosis (dev)', () => {
			chronosis_dev.add(25, 'second')
		})
} else {
	suite.baseline('chronosis', () => {
		chronosis.add(25, 'second')
	})
}

suite
	.add('date-fns', () => {
		addSeconds(date, 25)
	})
	.add('dayjs', () => {
		dayjs.add(25, 'second')
	})
	.add('luxon', () => {
		luxon.plus({ second: 25 })
	})
	.add('moment', () => {
		moment.clone().add(25, 'second')
	})

export default suite
