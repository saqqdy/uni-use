import { readFileSync } from 'fs'
import type { Plugin } from 'rollup'

const injectUniUseUtils: Plugin = {
	name: 'inject-uni-use-utils',
	renderChunk(code) {
		const INJECT_IIFE = readFileSync(
			require.resolve('@uni-use/utils/lib/index.iife.js'),
			'utf-8'
		)
		return `${INJECT_IIFE};\n;${code}`
	}
}

export default injectUniUseUtils
