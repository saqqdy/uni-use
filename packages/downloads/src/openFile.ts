/**
 * New tab to download files
 *
 * @private
 * @param url - link
 * @param filename - the name of the file
 */
function openFile(url: string, filename: string, fileType: string) {
	const dom = document.createElement('a')
	// if (['pdf', 'txt'].includes(fileType)) console.log('is pdf')
	dom.style.display = 'none'
	dom.download = filename
	dom.href = url
	document.body.appendChild(dom)
	dom.click()
	document.body.removeChild(dom)
}

export default openFile
