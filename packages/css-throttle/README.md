<div style="text-align: center;" align="center">

# use-css-throttle

A composition api for css throttle, supports vue2.0 and vue3.0

[![NPM version][npm-image]][npm-url]
[![Codacy Badge][codacy-image]][codacy-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]
[![gzip][gzip-image]][gzip-url]
[![License][license-image]][license-url]

[![Sonar][sonar-image]][sonar-url]

</div>

<div style="text-align: center; margin-bottom: 20px;" align="center">

</div>

## Installing

```bash
# use pnpm
$ pnpm install use-css-throttle

# use npm
$ npm install use-css-throttle --save

# use yarn
$ yarn add use-css-throttle
```

## Usage

### Use in Vue `>=3.0`

```vue
<script setup>
import { getCurrentInstance, onMounted } from 'vue'
import useCssThrottle from 'use-css-throttle'

const speaker = useCssThrottle({ lang: 'zh_CN' })

onMounted(() => {
  speaker.speak('new bee')
})

useExpose({ speaker })
</script>
```

### Use in Vue `2.7`

```vue
<script>
import useCssThrottle from 'use-css-throttle'

export default {
  setup() {
    const speaker = useCssThrottle({ lang: 'zh_CN' })
    speaker.speak('new bee')

    return { speaker }
  }
}
</script>
```

### Use in Vue `<=2.6`

> Add `@vue/composition-api` to the `project.json` dependencies and run install.

```json
{
  "dependencies": {
    "@vue/composition-api": "latest"
  }
}
```

```js
// main.js
import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'

Vue.use(VueCompositionApi)

new Vue({}).$mount('#app')
```

```vue
<script>
import useCssThrottle from 'use-css-throttle'

export default {
  setup() {
    const speaker = useCssThrottle({ lang: 'zh_CN' })
    speaker.speak('new bee')

    return { speaker }
  }
}
</script>
```

### Using unpkg CDN

```html
<!-- Add script tags to your html code, using CDN links to bring in -->
<script src="https://unpkg.com/use-css-throttle@1.1.0/dist/index.global.prod.js"></script>
```

## Support & Issues

Please open an issue [here](https://github.com/saqqdy/uni-use/issues).

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/use-css-throttle.svg?style=flat-square
[npm-url]: https://npmjs.org/package/use-css-throttle
[codacy-image]: https://app.codacy.com/project/badge/Grade/f70d4880e4ad4f40aa970eb9ee9d0696
[codacy-url]: https://www.codacy.com/gh/saqqdy/use-css-throttle/dashboard?utm_source=github.com&utm_medium=referral&utm_content=saqqdy/use-css-throttle&utm_campaign=Badge_Grade
[codecov-image]: https://img.shields.io/codecov/c/github/saqqdy/use-css-throttle.svg?style=flat-square
[codecov-url]: https://codecov.io/github/saqqdy/use-css-throttle?branch=master
[download-image]: https://img.shields.io/npm/dm/use-css-throttle.svg?style=flat-square
[download-url]: https://npmjs.org/package/use-css-throttle
[gzip-image]: http://img.badgesize.io/https://unpkg.com/use-css-throttle/dist/index.global.prod.js?compression=gzip&label=gzip%20size:%20JS
[gzip-url]: http://img.badgesize.io/https://unpkg.com/use-css-throttle/dist/index.global.prod.js?compression=gzip&label=gzip%20size:%20JS
[license-image]: https://img.shields.io/badge/License-MIT-blue.svg
[license-url]: LICENSE
[sonar-image]: https://sonarcloud.io/api/project_badges/quality_gate?project=saqqdy_uni-use
[sonar-url]: https://sonarcloud.io/dashboard?id=saqqdy_uni-use
