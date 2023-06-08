import downloadUrlFile from './downloadUrlFile'
import openFile from './openFile'

/**
 * Several ways of file downloading:
 * 1. For file formats that some browsers do not recognize. Enter the file URL in the address bar, window.location.href = URL, window.open(URL);
 * 2. using a tag download attribute (or js create a tag);
 * 3. browser-recognizable pdf, txt files, back-end compatible with handling attachment;
 * 4. add token in the header for authenticated download, use XmlHttpRequest to want to backend to launch the request
 *
 * @param url - link
 * @param filename - filename
 * @param type - download type 'href','open','download','request'
 */
function download(url: string, filename: string, type = 'download') {
	const name = /[^\/]+$/.exec(url)?.[0] || ''
	const fileType = /[^\.]+$/.exec(name)?.[0].toLowerCase()
	if (type === 'open') {
		window.open(url)
	} else if (type === 'href') {
		window.location.href = url
	} else if (type === 'request') {
		downloadUrlFile(url, filename || name)
	} else {
		openFile(url, filename || name, fileType!)
	}
}

export default download
