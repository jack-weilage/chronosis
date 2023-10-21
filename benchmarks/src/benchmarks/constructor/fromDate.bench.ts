import { Suite } from '../../suite'

import { Chronosis } from 'chronosis'
import dayjs from 'dayjs'
import { DateTime } from 'luxon'
import moment from 'moment'
import { Chronosis as ChronosisDev } from '../../../../lib'

const suite = new Suite('constructor from date')

const date = new Date()

if (!process.env.CI) {
	suite
		.add('chronosis', () => {
			new Chronosis(date)
		})
		.baseline('chronosis (dev)', () => {
			new ChronosisDev(date)
		})
} else {
	suite.baseline('chronosis', () => {
		new Chronosis(date)
	})
}

suite
	.add('date-fns (N/A)', () => {
		new Date(date)
	})
	.add('dayjs', () => {
		dayjs(date)
	})
	.add('luxon', () => {
		DateTime.fromJSDate(date)
	})
	.add('moment', () => {
		moment(date)
	})

export default suite
