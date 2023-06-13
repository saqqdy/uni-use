import _requireCss, { type Options } from 'rollup-plugin-require-css'
import type { Plugin } from 'rollup'

const requireCss = (options: Options = {}): Plugin => _requireCss(Object.assign({}, options))

export default requireCss
