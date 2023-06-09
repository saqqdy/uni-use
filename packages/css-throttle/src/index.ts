// import { readFileSync } from 'node:fs'
// import css from './node_modules/css-throttle/src/index.css'
import * as css from 'css-throttle/css' // assert { type: 'css' }
// console.log(css)

function useCssThrottle() {
	// const css = require('css-throttle/css')

	return {
		css
	}
}

export default useCssThrottle
