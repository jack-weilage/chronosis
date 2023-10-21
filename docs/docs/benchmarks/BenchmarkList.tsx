import Heading from '@theme/Heading'
import React from 'react'
interface BenchmarkListProps {
	data: {
		path: string
		results: {
			name: string
			hz: number
			mean: number
			min: number
			max: number
		}[]
	}[]
}
const format_number = (n: number, digits = n > 10_000 ? 0 : 2) =>
	n.toLocaleString('en-US', {
		maximumFractionDigits: digits,
		minimumFractionDigits: digits,
	})
const get_file_name = (str: string) => str.split('/').at(-1).split('.')[0]
function pretty_time(time: number) {
	const format = (n: number, unit: string) => `${format_number(n)} ${unit}`
	time *= 1_000_000

	if (time < 1) {
		return format(time * 1000, 'ps')
	}
	if (time < 1_000) {
		return format(time, 'ns')
	}
	if (time < 1_000_000) {
		return format(time / 1_000, 'µs')
	}
	if (time < 1_000_000_000) {
		return format(time / 1_000_000, 'ms')
	}

	return format(time / 1_000_000_000, 's')
}

const group_names = [
	'get',
	'set',
	'add',
	'subtract',
	'startOf',
	'endOf',
	'format',
	'toDate',
	'toString',
	'valueOf',
	'constructor',
	'clone',
	'isValid',
]
const time_units = [
	'millisecond',
	'second',
	'minute',
	'hour',
	'day',
	'month',
	'year',
]
const group_data = (data: BenchmarkListProps['data']) =>
	data.reduce(
		(acc, cur) => {
			// add _ to prevent overlap with constructor
			const group = '_' + cur.path.split('/')[3]

			acc[group] ??= []
			acc[group].push(cur)

			return acc
		},
		{} as Record<string, BenchmarkListProps['data'][number][]>,
	)
export default function BenchmarkList({ data }: BenchmarkListProps) {
	const groups = group_data(data)

	return (
		<>
			{Object.entries(groups)
				.sort(
					(a, b) =>
						group_names.indexOf(a[0].substring(1)) -
						group_names.indexOf(b[0].substring(1)),
				)
				.map(([group, data]) => (
					<React.Fragment key={group}>
						<Heading as="h2" id={group.substring(1)}>
							{group.substring(1)}
						</Heading>
						{data
							.sort(
								(a, b) =>
									time_units.indexOf(get_file_name(a.path)) -
									time_units.indexOf(get_file_name(b.path)),
							)
							.map(({ path, results }) => (
								<React.Fragment key={path}>
									<Heading
										as="h3"
										id={`${group.substring(1)}-${get_file_name(path)}`}
									>
										{get_file_name(path)}
									</Heading>
									<table>
										<thead>
											<tr>
												<th>library</th>
												<th>ops/sec</th>
												<th>avg</th>
												<th>min</th>
												<th>max</th>
												<th>relative speed</th>
											</tr>
										</thead>
										<tbody>
											{results
												.sort((a, b) => b.hz - a.hz)
												.map(({ name, hz, mean, min, max }) => (
													<tr key={name}>
														<td>{name}</td>
														<td>{format_number(hz)}x</td>
														<td>{pretty_time(mean)}</td>
														<td>{pretty_time(min)}</td>
														<td>{pretty_time(max)}</td>
														<td>
															{format_number((hz / results[0].hz) * 100)}%
														</td>
													</tr>
												))}
										</tbody>
									</table>
								</React.Fragment>
							))}
					</React.Fragment>
				))}
		</>
	)
}

export const generate_toc = (data: BenchmarkListProps['data']) =>
	Object.entries(group_data(data))
		.sort(
			(a, b) =>
				group_names.indexOf(a[0].substring(1)) -
				group_names.indexOf(b[0].substring(1)),
		)
		.flatMap(([group, data]) => [
			{
				value: group.substring(1),
				id: group.substring(1),
				level: 2,
			},
			...data
				.sort(
					(a, b) =>
						time_units.indexOf(get_file_name(a.path)) -
						time_units.indexOf(get_file_name(b.path)),
				)
				.map(({ path }) => ({
					value: get_file_name(path),
					id: `${group.substring(1)}-${get_file_name(path)}`,
					level: 3,
					children: [],
				})),
		])
