import { Suite } from '../../suite'
import { init_dates } from '../utils'
const { chronosis, chronosis_dev, date, dayjs, luxon, moment } = init_dates()

const suite = new Suite('toDate')

if (!process.env.CI) {
	suite
		.add('chronosis', () => {
			chronosis.toDate()
		})
		.baseline('chronosis (dev)', () => {
			chronosis_dev.toDate()
		})
} else {
	suite.baseline('chronosis', () => {
		chronosis.toDate()
	})
}

suite
	.add('date-fns (N/A)', () => {
		new Date(date)
	})
	.add('dayjs', () => {
		dayjs.toDate()
	})
	.add('luxon', () => {
		luxon.toJSDate()
	})
	.add('moment', () => {
		moment.toDate()
	})

export default suite
