import { cpus } from 'os'
import { blue, bold, gray, green, red } from 'picocolors'
import { NAME_WIDTH, OPS_WIDTH, TIME_WIDTH } from '../constants'
import type { Suite } from '../suite'
import type { Task, TaskResults } from '../task'
import { ansi_align, format_number, pretty_time } from '../utils'
import { BaseReporter } from './base'

type Runtime = 'browser' | 'bun' | 'deno' | 'node' | 'unknown'
function get_runtime(): Runtime {
	if ('Bun' in globalThis) {
		return 'bun'
	} else if ('deno' in globalThis) {
		return 'deno'
	} else if ('process' in globalThis) {
		return 'node'
	}

	return 'unknown'
}
function get_version(runtime: Runtime) {
	switch (runtime) {
		case 'bun':
			return Bun.version
		case 'deno':
			//@ts-expect-error
			return Deno.version.deno
		case 'node':
			return process.version
		default:
			return 'unknown'
	}
}
function get_os(runtime: Runtime) {
	switch (runtime) {
		case 'bun':
		case 'node':
			return `${process.arch}-${process.platform}`
		case 'deno':
			//@ts-expect-error
			return Deno.build.targety
		default:
			return 'unknown'
	}
}
function get_cpu(runtime: Runtime) {
	switch (runtime) {
		case 'bun':
		case 'deno':
		case 'node':
			return cpus()[0].model
		default:
			return 'unknown'
	}
}
function print_row(
	name: string,
	hz: string,
	mean: string,
	min: string,
	max: string,
) {
	console.log(
		ansi_align(name, NAME_WIDTH, 'left'),
		ansi_align(hz, OPS_WIDTH, 'right'),
		ansi_align(mean, TIME_WIDTH, 'right'),
		ansi_align(min, TIME_WIDTH, 'right'),
		ansi_align(max, TIME_WIDTH, 'right'),
	)
}

export class BasicReporter extends BaseReporter {
	onStart(): void {
		const runtime = get_runtime()

		console.log(`${gray('version:')} ${bold('0.0.0')}`)
		console.log(`${gray('cpu:')} ${bold(get_cpu(runtime))}`)
		console.log(
			`${gray('runtime:')} ${bold(
				`${runtime} ${get_version(runtime)} ${get_os(runtime)}`,
			)}`,
		)
	}
	onSuiteStart({ suite }: { suite: Suite }): void {
		console.log()
		console.log()
		console.log(
			ansi_align(
				bold(suite.name),
				NAME_WIDTH +
					1 +
					OPS_WIDTH +
					1 +
					TIME_WIDTH +
					1 +
					TIME_WIDTH +
					1 +
					TIME_WIDTH,
				'center',
			),
		)
		console.log(
			ansi_align(
				gray(
					`(${suite.tasks.length} task${suite.tasks.length === 1 ? '' : 's'})`,
				),
				NAME_WIDTH +
					1 +
					OPS_WIDTH +
					1 +
					TIME_WIDTH +
					1 +
					TIME_WIDTH +
					1 +
					TIME_WIDTH,
				'center',
			),
		)
		console.log()
		print_row(
			gray('name'),
			gray('ops/sec'),
			gray('avg'),
			gray('min'),
			gray('max'),
		)
	}
	onSuiteComplete({
		suite,
		results,
	}: {
		suite: Suite
		results: TaskResults[]
	}): void {
		const sorted = results
			.map(({ hz }, i) => ({
				hz,
				name: suite.tasks[i].name,
				type: suite.tasks[i].type,
			}))
			.sort((a, b) => b.hz - a.hz)

		const idx_or_first = (i: number) => (i === -1 ? 0 : i)
		const baseline = idx_or_first(
			sorted.findIndex(({ type }) => type === 'baseline'),
		)

		console.log()
		console.log(gray('summary of suite'), bold(suite.name))
		console.log(`  ${bold(sorted[baseline].name)}`, gray('was'))

		for (let i = 0; i < sorted.length; i++) {
			if (i === baseline) {
				continue
			}

			const multi = sorted[baseline].hz / sorted[i].hz

			console.log(
				`    ${(multi >= 1 ? green : red)(`${format_number(multi)}x faster`)}`,
				gray('than'),
				bold(sorted[i].name),
			)
		}
	}
	onTaskComplete({
		task,
		results,
	}: {
		task: Task
		results: TaskResults
	}): void {
		print_row(
			bold(task.type === 'baseline' ? blue(task.name) : task.name),
			`${bold(format_number(results.hz))}${gray('x')}`,
			pretty_time(results.mean),
			pretty_time(results.min),
			pretty_time(results.max),
		)
	}
}
