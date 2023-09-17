import type { WatchOptions } from 'vue-demi'
export type Falsy = false | void | null | undefined | 0 | 0n | ''

export interface UntilToMatchOptions {
	/**
	 * Milliseconds timeout for promise to resolve/reject if the when condition does not meet.
	 * 0 for never timed out
	 */
	timeout?: number

	/**
	 * Reject the promise when timeout
	 *
	 * @default false
	 */
	throwOnTimeout?: boolean

	/**
	 * `flush` option for internal watch
	 *
	 * @default 'sync'
	 */
	flush?: WatchOptions['flush']

	/**
	 * `deep` option for internal watch
	 *
	 * @default 'false'
	 */
	deep?: WatchOptions['deep']
}
