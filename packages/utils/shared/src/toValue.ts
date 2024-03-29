import { unref } from 'vue-demi'
import type { AnyFn, MaybeRefOrGetter } from './utils'

/**
 * Get the value of value/ref/getter.
 */
export function toValue<T>(r: MaybeRefOrGetter<T>): T {
	return typeof r === 'function' ? (r as AnyFn)() : unref(r)
}
