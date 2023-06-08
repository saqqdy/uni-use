import mountCss, { type CssOptions, type LinkAttributes } from 'mount-css'
import mountImg, { type ImageAttributes, type ImgOptions } from 'mount-image'
import mountJs, { type JsOptions, type ScriptAttributes } from 'mount-script'
import mountStyle, { type StyleAttributes, type StyleOptions } from 'mount-style'

export type SourceFileType = 'js' | 'img' | 'css' | 'style' | string
export interface SourceOptions {
	type: SourceFileType
	attrs?: LinkAttributes | StyleAttributes | ScriptAttributes | ImageAttributes
	props?: LinkAttributes | StyleAttributes | ScriptAttributes | ImageAttributes
	force?: boolean
}

/**
 * Dynamic loading of resources, support js, images, css links, css style strings
 *
 * @param url - link to the resource, type must be passed when passing in styleString
 * @param option - parameters: attrs, props, force
 * @returns - true|false|imgUrl
 */
async function useDownloads(
	url: string,
	option: SourceFileType | SourceOptions
): Promise<boolean | string> {
	if (!url) throw new Error('url is required')
	if (!option) option = {} as SourceOptions
	if (typeof option === 'string') {
		option = { type: option }
	} else if (!option.type) {
		const match = /\.(\w+)$/.exec(url)
		if (!match || !match[1]) throw new Error('The url is not support')
		option.type = match[1]
	}
	option.force ??= false
	option.type && (option.type = option.type.toLowerCase())
	if (!['js', 'img', 'css', 'style'].includes(option.type))
		throw new Error(`Not support type: ${option.type}`)
	const func: Record<'js' | 'img' | 'css' | 'style' | string, Function> = {
		js: (src: string) => mountJs(src, option as JsOptions),
		img: (src: string) => mountImg(src, option as ImgOptions),
		css: (src: string) => mountCss(src, option as CssOptions),
		style: (css: string) => mountStyle(css, option as StyleOptions)
	}
	return await func[option.type]?.(url)
}

export default useDownloads
