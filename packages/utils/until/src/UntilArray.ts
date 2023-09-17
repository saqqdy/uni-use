import type { ShallowUnwrapRef, WatchSource } from 'vue-demi'
import { type ElementOf, type MaybeRefOrGetter, toValue } from '@uni-use/shared'
import { UntilBase } from './UntilBase'
import type { UntilToMatchOptions } from './types'

export class UntilArray<T> extends UntilBase<T> {
	constructor(r: WatchSource<T>) {
		super(r)
	}

	toContains(
		value: MaybeRefOrGetter<ElementOf<ShallowUnwrapRef<T>>>,
		options?: UntilToMatchOptions
	) {
		return super.toMatch(v => {
			const array = Array.from(v as unknown[])
			return array.includes(value) || array.includes(toValue(value))
		}, options)
	}
}
