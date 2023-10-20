import { Suite } from '../../suite'
import { init_dates } from '../utils'
const { chronosis, chronosis_dev, date, dayjs, luxon, moment } = init_dates()

const suite = new Suite('valueOf')

if (!process.env.CI) {
	suite
		.add('chronosis', () => {
			chronosis.valueOf()
		})
		.baseline('chronosis (dev)', () => {
			chronosis_dev.valueOf()
		})
} else {
	suite.baseline('chronosis', () => {
		chronosis.valueOf()
	})
}

suite
	.add('date-fns (N/A)', () => {
		date.valueOf()
	})
	.add('dayjs', () => {
		dayjs.valueOf()
	})
	.add('luxon', () => {
		luxon.toJSDate()
	})
	.add('moment', () => {
		moment.valueOf()
	})

export default suite
