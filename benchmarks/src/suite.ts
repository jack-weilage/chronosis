import { DEFAULT_TASK_OPTIONS } from './constants'
import type { TaskOptions } from './task'
import { Task } from './task'

export class Suite {
	name: string

	tasks: Task[] = []
	#options: TaskOptions

	constructor(name: string, options?: Partial<TaskOptions>) {
		this.name = name
		this.#options = {
			...DEFAULT_TASK_OPTIONS,
			...options,
		}
	}

	add(name: string, fn: () => void, options?: Partial<TaskOptions>) {
		this.tasks.push(
			new Task(this, name, 'default', fn, { ...this.#options, ...options }),
		)

		return this
	}
	baseline(name: string, fn: () => void, options?: Partial<TaskOptions>) {
		this.tasks.push(
			new Task(this, name, 'baseline', fn, { ...this.#options, ...options }),
		)

		return this
	}
}
