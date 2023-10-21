/// <reference lib="webworker" />
import { Suite } from './suite'

export interface WorkerMessage {
	path: string
	index: number
}
async function on_message({
	data: { path, index },
}: MessageEvent<WorkerMessage>) {
	const suite: Suite = (await import(path)).default

	const results = suite.tasks[index].run()

	self.postMessage(results)
	// Run the garbage collector on every completion (prevents massive memory leaks)
	Bun.gc(true)
	self.removeEventListener('message', on_message)
}

self.addEventListener('message', on_message)
