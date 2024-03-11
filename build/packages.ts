import type { PackageManifest } from './types'

export const packages: PackageManifest[] = [
	{
		name: 'utils.shared',
		pkgName: '@uni-use/shared',
		iifeName: 'useShared',
		display: 'Collection of shared Utilities'
	},
	{
		name: 'utils.mounted',
		pkgName: '@uni-use/mounted',
		iifeName: 'useMounted',
		display: 'Mounted state in ref'
	},
	{
		name: 'utils.supported',
		pkgName: '@uni-use/supported',
		iifeName: 'useSupported',
		display: 'SSR compatibility isSupported'
	},
	{
		name: 'utils.until',
		pkgName: 'use-until',
		iifeName: 'useUntil',
		display: 'Promised one-time watch for changes'
	},
	{
		name: 'downloads',
		pkgName: 'use-downloads',
		iifeName: 'useDownloads',
		display: 'A js utilities that contains all the methods for downloading files'
	},
	{
		name: 'textarea',
		pkgName: 'use-textarea',
		iifeName: 'useTextarea',
		display: 'A combined api for editable html and textarea'
	},
	{
		name: 'speak',
		pkgName: 'use-speak',
		iifeName: 'useSpeak',
		display: 'A composition api for SpeechSynthesis, supports vue2.0 and vue3.0'
	},
	{
		name: 'recognition',
		pkgName: 'use-recognition',
		iifeName: 'useRecognition',
		display: 'A composition api for SpeechRecognition, supports vue2.0 and vue3.0'
	},
	{
		name: 'request',
		pkgName: '@uni-use/request',
		iifeName: 'useRequest',
		display:
			'An easy to use axios based http client combinatorial api with support for return sequentially'
	},
	{
		name: 'monorepo',
		pkgName: '@uni-use/monorepo',
		build: false,
		display: 'Collection of common composition apis for vue2 & vue3'
	}
]

export const packageNames = packages.map(({ pkgName }) => pkgName)

export function getPackages(name?: string | string[]) {
	if (!name) return packages

	const list = packages.filter(item => ([] as string[]).concat(name).includes(item.name))
	if (list.length === 0) {
		console.info(`no package founded`)
		return packages
	}

	return list
}
