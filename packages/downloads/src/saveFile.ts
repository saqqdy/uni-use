/**
 * Save the file
 *
 * @private
 * @param data - file data
 * @param filename - the name of the file
 */
function saveFile(data: any, filename: string) {
	const urlObject = window.URL || window.webkitURL || window
	const blob = new Blob([data])
	const link: any = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
	link.href = urlObject.createObjectURL(blob)
	link.download = filename
	link.click()
}

export default saveFile
