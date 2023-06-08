import type { PackageManifest } from './types'

export const packages: PackageManifest[] = [
	{
		name: 'use-downloads',
		pkgName: 'use-downloads',
		iifeName: 'useDownloads',
		display: 'A js utilities that contains all the methods for downloading files'
	},
	{
		name: 'monorepo',
		pkgName: '@uni-use/monorepo',
		build: false,
		display: 'Collection of common composition apis for vue2 & vue3'
	}
]
