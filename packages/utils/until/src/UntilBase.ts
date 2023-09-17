import { watch } from 'vue-demi'
import { waiting } from 'js-cool'
import type { WatchSource } from 'vue-demi'
import { toValue } from '@uni-use/shared'
import type { UntilToMatchOptions } from './types'

export class UntilBase<T, Not extends boolean = false> {
	r: WatchSource<T>
	isNot: boolean = false
	constructor(r: WatchSource<T>, isNot: boolean = false) {
		this.r = r
		this.isNot = isNot ?? false
	}

	// toMatch<U extends T = T>(
	// 	condition: (v: T) => v is U,
	// 	options?: UntilToMatchOptions
	// ): Not extends true ? Promise<Exclude<T, U>> : Promise<U>

	// toMatch<U extends T = T>(
	// 	condition: (v: T) => boolean,
	// 	options?: UntilToMatchOptions
	// ): Promise<T>

	toMatch<U extends T = T>(
		// condition: ((v: T) => v is U) | ((v: T) => boolean),
		condition: (v: T) => boolean,
		{ flush = 'sync', deep = false, timeout, throwOnTimeout }: UntilToMatchOptions = {}
	): Not extends true ? Promise<Exclude<T, U>> : Promise<U> {
		let stop: (() => void) | null = null
		const watcher = new Promise<T>(resolve => {
			stop = watch(
				this.r,
				v => {
					if (condition(v) !== this.isNot) {
						stop?.()
						resolve(v)
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
					.finally(() => stop?.())
			)
		}

		return Promise.race(promises) as Not extends true ? Promise<Exclude<T, U>> : Promise<U>
	}

	changed(options?: UntilToMatchOptions) {
		return this.changedTimes(1, options)
	}

	changedTimes(n: number = 1, options?: UntilToMatchOptions) {
		let count = -1 // skip the immediate check
		return this.toMatch(() => {
			count += 1
			return count >= n
		}, options)
	}

	get not() {
		this.isNot = !this.isNot
		return this
	}
}
