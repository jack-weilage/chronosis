import { Chronosis } from 'chronosis'
import dayjs from 'dayjs'
import { DateTime } from 'luxon'
import moment from 'moment'
import { Chronosis as ChronosisDev } from '../../..'

export const init_dates = () => ({
	chronosis: new Chronosis(),
	chronosis_dev: new ChronosisDev(),
	date: new Date(),
	dayjs: dayjs(),
	luxon: DateTime.local(),
	moment: moment(),
})
