import type { PackageManifest } from './types'

export const packages: PackageManifest[] = [
	// {
	// 	name: 'downloads',
	// 	pkgName: 'use-downloads',
	// 	iifeName: 'useDownloads',
	// 	display: 'A js utilities that contains all the methods for downloading files'
	// },
	// {
	// 	name: 'textarea',
	// 	pkgName: 'use-textarea',
	// 	iifeName: 'useTextarea',
	// 	display: 'A combined api for editable html and textarea'
	// },
	// {
	// 	name: 'speak',
	// 	pkgName: 'use-speak',
	// 	iifeName: 'useSpeak',
	// 	display: 'A composition api for SpeechSynthesis, supports vue2.0 and vue3.0'
	// },
	{
		name: 'css-throttle',
		pkgName: 'use-css-throttle',
		iifeName: 'useCssThrottle',
		browser: false,
		iife: false,
		cjs: false,
		mjs: false,
		display: 'A composition api for css throttle, supports vue2.0 and vue3.0'
	},
	{
		name: 'monorepo',
		pkgName: '@uni-use/monorepo',
		build: false,
		display: 'Collection of common composition apis for vue2 & vue3'
	}
]
