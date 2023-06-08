import { isRef, ref } from 'vue-demi'
import { inBrowser } from 'js-cool'
import type { Ref } from 'vue-demi'

export type TextareaElement =
	| HTMLTextAreaElement
	| HTMLInputElement
	| Ref<HTMLTextAreaElement | HTMLInputElement>

function useTextarea(element: TextareaElement | null) {
	if (!inBrowser) return
	if (!element) {
		console.error('element is required')
		return
	}

	const el = isRef(element) ? element : ref(element)

	const insert = (data: string) => {
		if (!el.value) {
			console.error('the element is null')
			return
		}

		if ((document as any).selection) {
			// IE
			const sel = (document as any).selection.createRange()
			sel.text = data
		} else if (
			typeof el.value.selectionStart === 'number' &&
			typeof el.value.selectionEnd === 'number'
		) {
			const startPos = el.value.selectionStart
			const endPos = el.value.selectionEnd
			const tmpStr = el.value.value
			let curPos = startPos
			el.value.value =
				tmpStr.substring(0, startPos) + data + tmpStr.substring(endPos, tmpStr.length)
			curPos += data.length
			setTimeout(() => {
				el.value.selectionStart = el.value.selectionEnd = curPos
			}, 0)
		} else {
			el.value.value += data
		}
	}

	const moveToEnd = () => {
		if (!el.value) {
			console.error('the element is null')
			return
		}

		el.value.focus()
		const len = el.value.value.length
		if ((document as any).selection) {
			const sel = (el as any).createTextRange()
			sel.moveStart('character', len)
			sel.collapse()
			sel.select()
		} else if (
			typeof el.value.selectionStart == 'number' &&
			typeof el.value.selectionEnd == 'number'
		) {
			el.value.selectionStart = el.value.selectionEnd = len
		}
	}

	return {
		el,
		insert,
		moveToEnd
	}
}

export default useTextarea
