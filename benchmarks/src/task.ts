import type { Suite } from './suite'

interface TaskData {
	samples: number[]
	duration: number
}
export type TaskType = 'default' | 'baseline'
export interface TaskResults {
	name: string

	hz: number
	mean: number

	min: number
	max: number
}
export interface TaskOptions {
	warmups: number
	iterations: number
	time: number
	now: () => number
}

export class Task {
	name: string
	type: TaskType

	#suite: Suite
	#fn: () => void
	#warmups: number
	#iterations: number
	#time: number
	#now: () => number

	constructor(
		suite: Suite,
		name: string,
		type: TaskType,
		fn: () => void,
		{ warmups, iterations, time, now }: TaskOptions,
	) {
		this.name = name
		this.type = type

		this.#suite = suite
		this.#fn = fn
		this.#warmups = warmups
		this.#iterations = iterations
		this.#time = time
		this.#now = now
	}

	#data_to_results({ duration, samples }: TaskData): TaskResults {
		samples.sort((a, b) => a - b)

		const period = duration / samples.length

		const hz = 1_000 / period
		const mean = samples.reduce((acc, cur) => acc + cur) / samples.length
		const min = samples[0]
		const max = samples[samples.length - 1]

		return {
			name: this.name,

			hz,
			mean,

			min,
			max,
		}
	}

	get suite() {
		return this.#suite
	}
	run(): TaskResults {
		for (let i = 0; i < this.#warmups; i++) {
			this.#fn()
		}

		const samples: number[] = []
		let duration = 0

		while (samples.length < this.#iterations || duration < this.#time) {
			const t1 = this.#now()

			this.#fn()

			const t2 = this.#now() - t1

			samples.push(t2)
			duration += t2
		}

		return this.#data_to_results({
			samples,
			duration,
		})
	}
}
