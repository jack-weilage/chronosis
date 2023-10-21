import { Suite } from '../../suite'

import { Chronosis } from 'chronosis'
import dayjs from 'dayjs'
import { DateTime } from 'luxon'
import moment from 'moment'
import { Chronosis as ChronosisDev } from '../../../../lib'

const suite = new Suite('constructor from number')

const number = 934398534

if (!process.env.CI) {
	suite
		.add('chronosis', () => {
			new Chronosis(number)
		})
		.baseline('chronosis (dev)', () => {
			new ChronosisDev(number)
		})
} else {
	suite.baseline('chronosis', () => {
		new Chronosis(number)
	})
}

suite
	.add('date-fns (N/A)', () => {
		new Date(number)
	})
	.add('dayjs', () => {
		dayjs(number)
	})
	.add('luxon', () => {
		DateTime.fromMillis(number)
	})
	.add('moment', () => {
		moment(number)
	})

export default suite
