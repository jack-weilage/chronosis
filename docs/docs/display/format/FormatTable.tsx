import { Chronosis } from 'chronosis'
import { useEffect, useState } from 'react'
import { TableRow } from './TableRow'

interface FormatTableProps {
	locale: string
}
export const FormatTable = ({ locale }: FormatTableProps) => {
	const [date, setDate] = useState(new Chronosis())

	useEffect(() => {
		const interval = setInterval(() => {
			setDate(new Chronosis())
		}, 47)

		return () => {
			clearInterval(interval)
		}
	})

	return (
		<table>
			<thead>
				<tr>
					<th>Input</th>
					<th>Output</th>
					<th>Description</th>
				</tr>
			</thead>
			<tbody>
				<TableRow
					input="[escapeYY]"
					date={date}
					locale={locale}
					description="Escaped characters"
				/>
				<TableRow
					input="YY"
					date={date}
					locale={locale}
					description="Two-digit year"
				/>
				<TableRow
					input="YYYY"
					date={date}
					locale={locale}
					description="Four-digit year"
				/>
				<TableRow
					input="M"
					date={date}
					locale={locale}
					description="Month, starting at 1"
				/>
				<TableRow
					input="MM"
					date={date}
					locale={locale}
					description="Two-digit month"
				/>
				<TableRow
					input="MMM"
					date={date}
					locale={locale}
					description="Three-character month name"
				/>
				<TableRow
					input="MMMM"
					date={date}
					locale={locale}
					description="Full month name"
				/>
				<TableRow
					input="D"
					date={date}
					locale={locale}
					description="Day of the month"
				/>
				<TableRow
					input="DD"
					date={date}
					locale={locale}
					description="Two-digit day of the month"
				/>
				<TableRow input="d" date={date} locale={locale} description="Weekday" />
				<TableRow
					input="dd"
					date={date}
					locale={locale}
					description="Two-character weekday name"
				/>
				<TableRow
					input="ddd"
					date={date}
					locale={locale}
					description="Three-character weekday name"
				/>
				<TableRow
					input="dddd"
					date={date}
					locale={locale}
					description="Full weekday name"
				/>
				<TableRow input="H" date={date} locale={locale} description="Hour" />
				<TableRow
					input="HH"
					date={date}
					locale={locale}
					description="Two-digit hour"
				/>
				<TableRow
					input="h"
					date={date}
					locale={locale}
					description="12-hour clock hour"
				/>
				<TableRow
					input="hh"
					date={date}
					locale={locale}
					description="Two-digit 12-hour clock hour"
				/>
				<TableRow input="m" date={date} locale={locale} description="Minute" />
				<TableRow
					input="mm"
					date={date}
					locale={locale}
					description="Two-digit minute"
				/>
				<TableRow input="s" date={date} locale={locale} description="Second" />
				<TableRow
					input="ss"
					date={date}
					locale={locale}
					description="Two-digit second"
				/>
				<TableRow
					input="SSS"
					date={date}
					locale={locale}
					description="Three-digit millisecond"
				/>
				<TableRow
					input="Z"
					date={date}
					locale={locale}
					description="UTC offset"
				/>
				<TableRow
					input="a"
					date={date}
					locale={locale}
					description="Lowercase meridiem"
				/>
				<TableRow
					input="A"
					date={date}
					locale={locale}
					description="Uppercase meridiem"
				/>
			</tbody>
		</table>
	)
}
