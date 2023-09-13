import type { PropsWithChildren } from 'react'

import { Chronosis } from 'chronosis'
const React = require('react')

interface TableRowProps extends PropsWithChildren {
	input: string
	date: Chronosis
	locale: string
	description: string
}
export const TableRow = ({
	input,
	date,
	locale,
	description,
}: TableRowProps) => {
	return (
		<tr>
			<td>
				<code>{input}</code>
			</td>
			<td>
				<code>{date.format(input, locale)}</code>
			</td>
			<td>{description}</td>
		</tr>
	)
}
