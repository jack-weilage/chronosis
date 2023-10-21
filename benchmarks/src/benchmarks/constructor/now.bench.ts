import { Suite } from '../../suite'

import { Chronosis } from 'chronosis'
import dayjs from 'dayjs'
import { DateTime } from 'luxon'
import moment from 'moment'
import { Chronosis as ChronosisDev } from '../../../../lib'

const suite = new Suite('constructor now')

if (!process.env.CI) {
	suite
		.add('chronosis', () => {
			new Chronosis()
		})
		.baseline('chronosis (dev)', () => {
			new ChronosisDev()
		})
} else {
	suite.baseline('chronosis', () => {
		new Chronosis()
	})
}

suite
	.add('date-fns (N/A)', () => {
		new Date()
	})
	.add('dayjs', () => {
		dayjs()
	})
	.add('luxon', () => {
		DateTime.local()
	})
	.add('moment', () => {
		moment()
	})

export default suite
