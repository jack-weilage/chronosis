import type { EventEmitter } from 'events'
import type { TaskResults } from './task'
import { get_suite_files, run_task_in_worker } from './utils'

export async function run(emitter: EventEmitter) {
	emitter.emit('start')

	const files = await get_suite_files()

	let queue = Promise.resolve()
	for (let i = 0; i < files.length; i++) {
		const { path, suite } = files[i]

		emitter.emit('suite-processed', { path, suite })

		const suite_results: TaskResults[] = []
		for (let j = 0; j < suite.tasks.length; j++) {
			const task = suite.tasks[j]

			emitter.emit('task-processed', { path, task })

			queue = queue
				.then(() => {
					if (j === 0) {
						emitter.emit('suite-start', { path, suite })
					}

					emitter.emit('task-start', { path, task })

					return run_task_in_worker({ path, index: j })
				})
				.then((task_results) => {
					suite_results.push(task_results)
					// The task has completed.
					emitter.emit('task-complete', { path, task, results: task_results })
					// If completed task is the last one in the suite, the suite is complete.
					if (j === suite.tasks.length - 1) {
						emitter.emit('suite-complete', {
							path,
							suite,
							results: suite_results,
						})
					}
				})
		}

		await queue
	}

	// Wait until the queue is empty
	await queue

	emitter.emit('complete')
}
