import saveFile from './saveFile'

/**
 * Download secondary system documents
 *
 * @private
 * @param url - link
 * @param filename - the name of the file
 */
function downloadUrlFile(url: string, filename: string) {
	const xhr = window.XMLHttpRequest
		? new XMLHttpRequest()
		: new ActiveXObject('Microsoft.XMLHTTP')
	xhr.open('GET', url, true)
	xhr.responseType = 'blob'
	xhr.onload = () => {
		if (xhr.status === 200) {
			saveFile(xhr.response, filename)
		}
	}
	xhr.send()
}

export default downloadUrlFile
