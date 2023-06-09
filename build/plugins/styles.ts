import _styles from 'rollup-plugin-styles'
import type { Plugin } from 'rollup'

const styles = (options: Parameters<typeof _styles>[0] = {}): Plugin =>
	_styles(Object.assign({}, options))

export default styles
