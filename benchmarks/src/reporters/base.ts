import type { Suite } from '../suite'
import type { Task, TaskResults } from '../task'

export class BaseReporter {
	onStart(): void {}

	onSuiteProcessed(ev: { path: string; suite: Suite }): void {}
	onSuiteStart(ev: { path: string; suite: Suite }): void {}
	onSuiteComplete(ev: {
		path: string
		suite: Suite
		results: TaskResults[]
	}): void {}

	onTaskProcessed(ev: { path: string; task: Task }): void {}
	onTaskStart(ev: { path: string; task: Task }): void {}
	onTaskComplete(ev: {
		path: string
		task: Task
		results: TaskResults
	}): void {}

	async onComplete(): Promise<void> {}
}
