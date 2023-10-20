import { DateTime } from 'luxon'
import { Suite } from '../../suite'
import { init_dates } from '../utils'
const { chronosis, chronosis_dev, date, dayjs, luxon, moment } = init_dates()

const suite = new Suite('endOf day')

if (!process.env.CI) {
	suite
		.add('chronosis', () => {
			chronosis.clone()
		})
		.baseline('chronosis (dev)', () => {
			chronosis_dev.clone()
		})
} else {
	suite.baseline('chronosis', () => {
		chronosis.clone()
	})
}

suite
	.add('date-fns (N/A)', () => {
		new Date(date)
	})
	.add('dayjs', () => {
		dayjs.clone()
	})
	.add('luxon', () => {
		DateTime.fromJSDate(luxon.toJSDate())
	})
	.add('moment', () => {
		moment.clone()
	})

export default suite
