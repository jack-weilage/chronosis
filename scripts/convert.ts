import Bun from 'bun'
import { main, module } from '../package.json'

const esm = await Bun.file(module).text()
const cjs = esm.replace(
	/export{([a-zA-Z]+) as Chronosis}/,
	(_, id) => `module.exports={Chronosis:${id}}`,
)

await Bun.write(Bun.file(main), cjs)

console.log()
console.log('\x1b[1mESM converted to CJS\x1b[0m')
console.log(`${module} --> ${main}`)
console.log()
