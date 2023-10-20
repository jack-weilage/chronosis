import { cac } from 'cac'
import { EventEmitter } from 'events'
import type { BaseReporter } from './reporters/base'
import { BasicReporter } from './reporters/basic'
import { JSONReporter } from './reporters/json'
import { run } from './runner'
import type { Suite } from './suite'
import type { Task, TaskResults } from './task'

const cli = cac('bench')

cli.option('--reporter <basic|json>', 'Choose a reporter', { default: 'basic' })
cli.option('--reporter-file <file>', 'Choose a file to output reporter data to')
cli.help()
cli.version('0.0.0')

const { options } = cli.parse()

interface CLIOptions {
	reporter?: 'basic' | 'json'
	reporterFile?: string
}
function get_reporter(options: CLIOptions) {
	switch (options.reporter) {
		case 'basic':
			return new BasicReporter()
		case 'json':
			return new JSONReporter({ outFile: options.reporterFile })
		default:
			throw new Error('unknown reporter type')
	}
}

const emitter = new EventEmitter<{
	start: []
	complete: []

	'suite-processed': [{ path: string; suite: Suite }]
	'suite-start': [{ path: string; suite: Suite }]
	'suite-complete': [{ path: string; suite: Suite; results: TaskResults[] }]

	'task-processed': [{ path: string; task: Task }]
	'task-start': [{ path: string; task: Task }]
	'task-complete': [{ path: string; task: Task; results: TaskResults }]
}>()

const reporter: BaseReporter = get_reporter(options)

emitter.addListener('start', () => reporter.onStart())

emitter.addListener('suite-processed', (ev) => reporter.onSuiteProcessed(ev))
emitter.addListener('suite-start', (ev) => reporter.onSuiteStart(ev))
emitter.addListener('suite-complete', (ev) => reporter.onSuiteComplete(ev))

emitter.addListener('task-processed', (ev) => reporter.onTaskProcessed(ev))
emitter.addListener('task-start', (ev) => reporter.onTaskStart(ev))
emitter.addListener('task-complete', (ev) => reporter.onTaskComplete(ev))

const { resolve, promise } = Promise.withResolvers()
emitter.addListener('complete', async () => {
	await reporter.onComplete()
	resolve()
})

await run(emitter)
await promise
