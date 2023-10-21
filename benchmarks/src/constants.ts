import type { TaskOptions } from './task'

export const DEFAULT_TASK_OPTIONS: TaskOptions = {
	warmups: 5,
	iterations: 10,
	time: 500,
	now: () => performance.now(),
}
export const STATUS_WIDTH = 1
export const NAME_WIDTH = 25
export const OPS_WIDTH = 12
export const TIME_WIDTH = 9
export const ERROR_WIDTH = 7
