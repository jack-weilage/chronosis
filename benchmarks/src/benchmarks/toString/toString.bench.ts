import { Suite } from '../../suite'
import { init_dates } from '../utils'
const { chronosis, chronosis_dev, date, dayjs, luxon, moment } = init_dates()

const suite = new Suite('toString')

if (!process.env.CI) {
	suite
		.add('chronosis', () => {
			chronosis.toString()
		})
		.baseline('chronosis (dev)', () => {
			chronosis_dev.toString()
		})
} else {
	suite.baseline('chronosis', () => {
		chronosis.toString()
	})
}

suite
	.add('date-fns (N/A)', () => {
		date.toString()
	})
	.add('dayjs', () => {
		dayjs.toString()
	})
	.add('luxon', () => {
		luxon.toString()
	})
	.add('moment', () => {
		moment.toString()
	})

export default suite
