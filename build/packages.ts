import type { PackageManifest } from './types'

export const packages: PackageManifest[] = [
	{
		name: 'monorepo',
		pkgName: '@uni-use/monorepo',
		build: false,
		display: 'Some simple utilities for nodejs'
	},
	{
		name: 'utils',
		pkgName: '@uni-use/utils',
		iife: false,
		submodules: true,
		display: 'Some shared utilities'
	},
	{
		name: 'speak',
		pkgName: '@uni-use/speak',
		iife: true,
		display: 'A simple utility to get the package manager information which used in the project'
	}
]
