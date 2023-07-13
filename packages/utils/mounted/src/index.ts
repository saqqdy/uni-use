import { getCurrentInstance, onMounted, ref } from 'vue-demi'

/**
 * Mounted state in ref.
 *
 * @see https://github.com/saqqdy/uni-use/tree/master/packages/mounted#readme
 */
export default function useMounted() {
	const isMounted = ref(false)

	if (getCurrentInstance()) {
		onMounted(() => {
			isMounted.value = true
		})
	}

	return isMounted
}
