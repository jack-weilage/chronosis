import { glob } from 'fast-glob'
import { relative } from 'path'
import { bold, gray } from 'picocolors'
import string_width from 'string-width'
import type { Suite } from './suite'
import type { TaskResults } from './task'
import type { WorkerMessage } from './worker'

export function run_task_in_worker(
	message: WorkerMessage,
): Promise<TaskResults> {
	const { promise, resolve } = Promise.withResolvers<TaskResults>()

	const worker = new Worker(new URL('./worker.ts', import.meta.url).href)

	function on_message({ data }: MessageEvent<TaskResults>) {
		worker.removeEventListener('message', on_message)
		resolve(data)
	}

	worker.addEventListener('message', on_message)
	worker.postMessage(message)

	return promise
}
export async function get_suite_files(): Promise<
	{
		path: string
		suite: Suite
	}[]
> {
	const files = await glob(['**/*.bench.ts'], {
		ignore: ['**/node_modules/**', '**/.git/**'],
	})
	const suites = await Promise.all(
		files.map(async (file) => {
			const path = relative(
				import.meta.url,
				new URL(file, import.meta.url).href,
			)

			const suite: Suite = (await import(path)).default

			return {
				path,
				suite,
			}
		}),
	)
	return suites
}
export const format_number = (n: number, digits = n > 10_000 ? 0 : 2) =>
	n.toLocaleString('en-US', {
		maximumFractionDigits: digits,
		minimumFractionDigits: digits,
	})
export function pretty_time(time: number) {
	const format = (n: number, unit: string) =>
		`${bold(format_number(n))} ${gray(unit)}`
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
export const ansi_align = (
	text: string,
	desired_width: number,
	align: 'left' | 'center' | 'right',
) =>
	text
		.split('\n')
		.map((line) => {
			const text_width = string_width(line)
			const padding = desired_width - text_width

			if (padding < 0) {
				// TODO: idk how this works correctly, but it does.
				return line.substring(0, desired_width + 3) + '…'
			}

			switch (align) {
				case 'left':
					return line + ' '.repeat(padding)
				case 'center':
					return (
						' '.repeat(Math.ceil(padding / 2)) +
						line +
						' '.repeat(Math.floor(padding / 2))
					)
				case 'right':
					return ' '.repeat(padding) + line
			}
		})
		.join('\n')
