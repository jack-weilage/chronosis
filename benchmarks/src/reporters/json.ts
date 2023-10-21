import { mkdir } from 'fs/promises'
import { dirname } from 'path'
import type { Suite } from '../suite'
import type { TaskResults } from '../task'
import { BaseReporter } from './base'

export class JSONReporter extends BaseReporter {
	data: { path: string; results: TaskResults[] }[] = []
	outFile?: string

	constructor({ outFile }: { outFile?: string }) {
		super()

		this.outFile = outFile
	}
	onSuiteComplete({
		path,
		results,
	}: {
		path: string
		suite: Suite
		results: TaskResults[]
	}): void {
		this.data.push({ path, results })
	}
	async onComplete(): Promise<void> {
		if (!this.outFile) {
			console.log(this.data)
			return
		}

		await mkdir(dirname(this.outFile), { recursive: true })
		await Bun.write(this.outFile, JSON.stringify(this.data))
	}
}
