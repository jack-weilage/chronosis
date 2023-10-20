import { setYear } from 'date-fns'
import { Suite } from '../../suite'
import { init_dates } from '../utils'
const { chronosis, chronosis_dev, date, dayjs, luxon, moment } = init_dates()

const suite = new Suite('set year')

if (!process.env.CI) {
	suite
		.add('chronosis', () => {
			chronosis.set('year', 2012)
		})
		.baseline('chronosis (dev)', () => {
			chronosis_dev.set('year', 2012)
		})
} else {
	suite.baseline('chronosis', () => {
		chronosis.set('year', 2012)
	})
}

suite
	.add('date-fns', () => {
		setYear(date, 2012)
	})
	.add('dayjs', () => {
		dayjs.set('year', 2012)
	})
	.add('luxon', () => {
		luxon.set({ year: 2012 })
	})
	.add('moment', () => {
		moment.clone().set('year', 2012)
	})

export default suite
