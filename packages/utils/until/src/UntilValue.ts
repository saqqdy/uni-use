import { isRef, watch } from 'vue-demi'
import { waiting } from 'js-cool'
import type { WatchSource } from 'vue-demi'
import { type MaybeRefOrGetter, toValue } from '@uni-use/shared'
import { UntilBase } from './UntilBase'
import type { Falsy, UntilToMatchOptions } from './types'

export class UntilValue<T, Not extends boolean = false> extends UntilBase<T> {
	constructor(r: WatchSource<T>, isNot?: boolean) {
		super(r, isNot as Not)
	}

	toBe<P extends T = T>(
		value: MaybeRefOrGetter<P>,
		options?: UntilToMatchOptions
	): Not extends true ? Promise<T> : Promise<P> {
		if (!isRef(value))
			return super.toMatch(v => v === value, options) as Not extends true
				? Promise<T>
				: Promise<P>

		const { flush = 'sync', deep = false, timeout, throwOnTimeout } = options ?? {}
		let stop: (() => void) | null = null
		const watcher = new Promise<T>(resolve => {
			stop = watch(
				[this.r, value],
				([v1, v2]) => {
					if (this.isNot !== (v1 === v2)) {
						stop?.()
						resolve(v1)
					}
				},
				{
					flush,
					deep,
					immediate: true
				}
			)
		})

		const promises = [watcher]
		if (timeout != null) {
			promises.push(
				waiting(timeout, throwOnTimeout)
					.then(() => toValue(this.r))
					.finally(() => {
						stop?.()
						return toValue(this.r)
					})
			)
		}

		return Promise.race(promises) as Not extends true ? Promise<T> : Promise<P>
	}

	toBeTruthy(options?: UntilToMatchOptions) {
		return super.toMatch(v => Boolean(v), options) as Not extends true
			? Promise<T & Falsy>
			: Promise<Exclude<T, Falsy>>
	}

	toBeNull(options?: UntilToMatchOptions) {
		return this.toBe(null as T, options) as Not extends true
			? Promise<Exclude<T, null>>
			: Promise<null>
	}

	toBeUndefined(options?: UntilToMatchOptions) {
		return this.toBe(undefined as T, options) as Not extends true
			? Promise<Exclude<T, null>>
			: Promise<null>
	}

	toBeNaN(options?: UntilToMatchOptions): Promise<T> {
		return super.toMatch(Number.isNaN, options)
	}
}
