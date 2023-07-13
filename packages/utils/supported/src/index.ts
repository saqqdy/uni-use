import { computed } from 'vue-demi'
import useMounted from '@uni-use/mounted'

/**
 * SSR compatibility isSupported
 *
 * @see https://github.com/saqqdy/uni-use/tree/master/packages/supported#readme
 */
export default function useSupported(callback: () => unknown) {
	const isMounted = useMounted()

	return computed(() => {
		// to trigger the ref
		// eslint-disable-next-line no-unused-expressions
		isMounted.value
		return Boolean(callback())
	})
}
