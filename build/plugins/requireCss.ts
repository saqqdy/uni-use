// import injectCode, { type Options } from 'rollup-plugin-inject-code'
import type { Plugin } from 'rollup'
import { createFilter } from '@rollup/pluginutils'

type Options = Record<string, any>

const requireCss = (options: Options): Plugin => {
	if (!options.transform) options.transform = code => code

	const styles: Record<string, any> = {}
	const filter = createFilter(options.include ?? ['**/*.css'], options.exclude ?? [])

	/* function to sort the css imports in order - credit to rollup-plugin-postcss */
	// const getRecursiveImportOrder = (id, getModuleInfo, seen = new Set()) => {
	// 	if (seen.has(id)) return []

	// 	seen.add(id)

	// 	const result = [id]

	// 	getModuleInfo(id).importedIds.forEach(importFile => {
	// 		result.push(...getRecursiveImportOrder(importFile, getModuleInfo, seen))
	// 	})

	// 	return result
	// }

	return {
		name: 'require-css',
		transform(code, id) {
			console.log(100, id)
			if (!filter(id)) return

			const transformedCode = options.transform(code)

			/* cache the result */
			if (!styles[id] || styles[id] !== transformedCode) {
				styles[id] = transformedCode
			}

			const moduleInfo = this.getModuleInfo(id)
			console.log(101, moduleInfo)
			// if (options.modules || moduleInfo.assertions?.type === 'css') {
			// 	return {
			// 		code: `const sheet = new CSSStyleSheet();sheet.replaceSync(${JSON.stringify(
			// 			transformedCode
			// 		)});export default sheet;`,
			// 		map: { mappings: '' }
			// 	}
			// }

			return {
				code: `export default ${JSON.stringify(transformedCode)};`,
				map: { mappings: '' }
			}
		}
		/* output a css file with all css that was imported without being assigned a variable */
		// generateBundle(opts, bundle) {
		// 	/* collect all the imported modules for each entry file */
		// 	let modules = {},
		// 		entryChunk = null
		// 	for (const file in bundle) {
		// 		modules = Object.assign(modules, bundle[file].modules)
		// 		if (!entryChunk) entryChunk = bundle[file].facadeModuleId
		// 	}

		// 	/* get the list of modules in order */
		// 	const moduleIds = getRecursiveImportOrder(entryChunk, this.getModuleInfo)

		// 	/* remove css that was imported as a string */
		// 	const css = Object.entries(styles)
		// 		.sort((a, b) => moduleIds.indexOf(a[0]) - moduleIds.indexOf(b[0]))
		// 		.map(([id, code]) => {
		// 			if (!modules[id]) return code
		// 		})
		// 		.join('\n')

		// 	if (css.trim().length <= 0 && !alwaysOutput) return

		// 	const filename = options.output ?? opts.file ?? 'bundle.js'
		// 	const dest = path.basename(filename, path.extname(filename))
		// 	this.emitFile({ type: 'asset', fileName: `${dest}.css`, source: css })
		// }
	}
}
// injectCode(
// 	Object.assign(
// 		{
// 			code: '',
// 			position: 'before'
// 		},
// 		options
// 	)
// )

export default requireCss
