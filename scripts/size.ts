import Bun from 'bun'
// Import from main to trigger reloads on changes.
import '../src/index.ts'

async function build(entry: string) {
	const start = performance.now()

	const result = await Bun.build({
		entrypoints: [entry],
		minify: true,
	})
	const buffer = Buffer.from(await result.outputs[0].arrayBuffer())

	console.log(`built! (${~~(performance.now() - start)}ms)`)

	return {
		size: buffer.byteLength,
		raw: buffer,
	}
}
function zip(raw: Buffer) {
	const start = performance.now()

	const buffer = Bun.gzipSync(raw, { level: 9 })

	console.log(`zipped! (${~~(performance.now() - start)}ms)`)

	return {
		size: buffer.byteLength,
		raw: buffer,
	}
}

const built = await build('./src/index.ts')
const gzipped = zip(built.raw)

console.log('\n\x1b[1mbuild size:\x1b[0m', built.size, 'bytes')
console.log(
	'\x1b[1mgzip size:\x1b[0m ',
	gzipped.size,
	'bytes',
	`(${(100 - (gzipped.size / built.size) * 100).toFixed(2)}% compression)`,
)

if (process.argv[2] !== '--watching') {
	// Process will fail if gzipped size > 1kb
	process.exit(gzipped.size <= 1000 ? 0 : 1)
}
