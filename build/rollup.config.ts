import { dirname, join, resolve, sep } from 'node:path'
import { existsSync } from 'node:fs'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import type { InternalModuleFormat, OutputOptions, Plugin, RollupOptions } from 'rollup'
import { getPackages, packageNames } from './packages'
import {
	babel,
	commonjs,
	// esbuild,
	filesize,
	nodeResolve,
	replace,
	requireCss,
	terser,
	typescript,
	visual
} from './plugins'

export interface Config {
	input: string
	file: string
	format: InternalModuleFormat
	browser?: boolean
	minify?: boolean
	transpile?: boolean
	iifeName?: string
	external?: string[]
	externalUmd?: string[]
	globals?: Record<string, string>
	banner?: string
	env: 'development' | 'production'
	plugins?: Plugin[]
}

export interface Output extends OutputOptions {
	plugins: Plugin[]
}

export interface Options extends RollupOptions {
	external: string[]
	plugins: Plugin[]
	output: Output
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const require = createRequire(import.meta.url)

const packages = getPackages(process.env.BUILD_PACKAGE)
const configs: Config[] = []

for (const {
	globals = {},
	name,
	iifeName,
	external = [],
	externalUmd = [],
	iife,
	build,
	cjs,
	mjs,
	browser
	// target
} of packages) {
	if (build === false) continue
	const dirName = name.replace(/\./g, sep)
	const PROJECT_ROOT = resolve(__dirname, '..', 'packages', dirName)
	const pkg = require(join(PROJECT_ROOT, 'package.json'))
	const HAS_INDEX_MJS = existsSync(join(PROJECT_ROOT, 'src', 'index.mjs'))
	const HAS_INDEX_DEFAULT = existsSync(join(PROJECT_ROOT, 'src', 'index.default.ts'))
	const banner =
		'/*!\n' +
		' * ' +
		pkg.name +
		' v' +
		pkg.version +
		'\n' +
		' * ' +
		pkg.description +
		'\n' +
		' * (c) 2022-' +
		new Date().getFullYear() +
		' saqqdy<https://github.com/saqqdy> \n' +
		' * Released under the MIT License.\n' +
		' */'

	configs.push({
		input: join(PROJECT_ROOT, 'src', 'index.ts'),
		file: join(PROJECT_ROOT, 'dist', 'index.esm-bundler.js'),
		format: 'es',
		external,
		env: 'development'
	})

	// output browser
	if (browser !== false) {
		configs.push(
			{
				input: join(PROJECT_ROOT, 'src', 'index.ts'),
				file: join(PROJECT_ROOT, 'dist', 'index.esm-browser.js'),
				format: 'es',
				browser: true,
				banner,
				external,
				env: 'development'
			},
			{
				input: join(PROJECT_ROOT, 'src', 'index.ts'),
				file: join(PROJECT_ROOT, 'dist', 'index.esm-browser.prod.js'),
				format: 'es',
				browser: true,
				minify: true,
				banner,
				external,
				env: 'production'
			}
		)
	}

	// output mjs
	if (mjs !== false && !HAS_INDEX_MJS) {
		configs.push({
			input: join(PROJECT_ROOT, 'src', 'index.ts'),
			file: join(PROJECT_ROOT, 'dist', 'index.mjs'),
			format: 'es',
			external,
			env: 'development'
		})
	}

	// output cjs
	if (cjs !== false) {
		configs.push({
			input: join(PROJECT_ROOT, 'src', HAS_INDEX_DEFAULT ? 'index.default.ts' : 'index.ts'),
			file: join(PROJECT_ROOT, 'dist', 'index.cjs.js'),
			format: 'cjs',
			external,
			env: 'development'
		})
	}

	// output iife
	if (iife !== false) {
		configs.push(
			{
				input: join(
					PROJECT_ROOT,
					'src',
					HAS_INDEX_DEFAULT ? 'index.default.ts' : 'index.ts'
				),
				file: join(PROJECT_ROOT, 'dist', 'index.global.js'),
				format: 'iife',
				iifeName,
				globals,
				banner,
				externalUmd,
				env: 'development'
			},
			{
				input: join(
					PROJECT_ROOT,
					'src',
					HAS_INDEX_DEFAULT ? 'index.default.ts' : 'index.ts'
				),
				file: join(PROJECT_ROOT, 'dist', 'index.global.prod.js'),
				format: 'iife',
				minify: true,
				iifeName,
				globals,
				banner,
				externalUmd,
				env: 'production'
			}
		)
	}
}

function createEntries() {
	return configs.map(createEntry)
}

function createEntry(config: Config) {
	const isGlobalBuild = config.format === 'iife'
	const isTypeScript = config.input.endsWith('.ts')

	const _config: Options = {
		external: ['vue', 'vue2', 'vue-demi', 'axios'],
		input: config.input,
		plugins: [],
		output: {
			file: config.file,
			format: config.format,
			exports: 'auto',
			extend: true,
			plugins: [],
			globals: {
				vue: 'VueDemi',
				vue2: 'VueDemi',
				'vue-demi': 'VueDemi',
				axios: 'axios'
			}
		},
		onwarn: (msg: any, warn) => {
			if (!/Circular/.test(msg)) {
				warn(msg)
			}
		}
	}

	if (config.banner && (isGlobalBuild || config.browser)) _config.output.banner = config.banner

	if (isGlobalBuild && config.iifeName) {
		_config.output.name = config.iifeName
	}

	if (!isGlobalBuild) {
		_config.external.push(
			'core-js',
			'js-cool',
			'await-to-done',
			'axios-series',
			'tslib',
			...packageNames
		)
		if (config.external) _config.external = _config.external.concat(config.external)
	} else if (config.externalUmd) {
		_config.external = _config.external.concat(config.externalUmd)
	}

	_config.plugins.push(nodeResolve(), replace(), commonjs, requireCss({}))

	if (config.transpile !== false) {
		_config.plugins.push(babel())
		isTypeScript &&
			_config.plugins.push(
				// esbuild()
				typescript()
			)
	}

	if (config.minify) {
		_config.plugins.push(terser({ module: config.format === 'es' }))
	}

	_config.plugins.push(filesize, visual)

	return _config
}

export default createEntries()
