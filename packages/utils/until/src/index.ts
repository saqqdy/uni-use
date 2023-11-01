import type { WatchSource } from 'vue-demi'
import { toValue } from '@uni-use/shared'
import { UntilArray } from './UntilArray'
import { UntilValue } from './UntilValue'

function util<T extends unknown[]>(r: WatchSource<T>): UntilArray<T>
function util<T, Not extends boolean = false>(r: WatchSource<T>, isNot?: Not): UntilValue<T>
function util<T = any, Not extends boolean = false>(
	r: WatchSource<T>,
	isNot?: Not
): UntilArray<T> | UntilValue<T> {
	if (Array.isArray(toValue(r))) return new UntilArray<T>(r)
	return new UntilValue<T>(r, isNot)
}

export default util

export type * from './types'
export type * from './UntilBase'
export type * from './UntilArray'
export type * from './UntilValue'
