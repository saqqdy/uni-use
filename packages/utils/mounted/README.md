<div style="text-align: center;" align="center">

# @uni-use/mounted

A combined api for use mounted state in ref

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
$ pnpm install @uni-use/mounted

# use npm
$ npm install @uni-use/mounted --save

# use yarn
$ yarn add @uni-use/mounted
```

## Usage

### 1. Using in vue3.x:

```vue
<script setup>
import useMounted from '@uni-use/mounted'

const isMounted = useMounted()

defineExpose({
  isMounted
})
</script>
```

### 2. Using in vue2.7.x:

```vue
<script>
import useMounted from '@uni-use/mounted'

export default {
  setup() {
    const isMounted = useMounted()

    return {
      isMounted
    }
  }
}
</script>
```

### 3. Use CDN resource

```html
<script src="https://unpkg.com/vue-demi@latest/lib/index.iife.js"></script>
<script src="https://unpkg.com/@uni-use/mounted@1.0.0/dist/index.global.prod.js"></script>
<script>
  const mounted = useMounted()
  // ...
</script>
```

## Support & Issues

Please open an issue [here](https://github.com/saqqdy/uni-use/issues).

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/@uni-use/mounted.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@uni-use/mounted
[codacy-image]: https://app.codacy.com/project/badge/Grade/f70d4880e4ad4f40aa970eb9ee9d0696
[codacy-url]: https://www.codacy.com/gh/saqqdy/@uni-use/mounted/dashboard?utm_source=github.com&utm_medium=referral&utm_content=saqqdy/@uni-use/mounted&utm_campaign=Badge_Grade
[codecov-image]: https://img.shields.io/codecov/c/github/saqqdy/@uni-use/mounted.svg?style=flat-square
[codecov-url]: https://codecov.io/github/saqqdy/@uni-use/mounted?branch=master
[download-image]: https://img.shields.io/npm/dm/@uni-use/mounted.svg?style=flat-square
[download-url]: https://npmjs.org/package/@uni-use/mounted
[gzip-image]: http://img.badgesize.io/https://unpkg.com/@uni-use/mounted/dist/index.global.prod.js?compression=gzip&label=gzip%20size:%20JS
[gzip-url]: http://img.badgesize.io/https://unpkg.com/@uni-use/mounted/dist/index.global.prod.js?compression=gzip&label=gzip%20size:%20JS
[license-image]: https://img.shields.io/badge/License-MIT-blue.svg
[license-url]: LICENSE
[sonar-image]: https://sonarcloud.io/api/project_badges/quality_gate?project=saqqdy_uni-use
[sonar-url]: https://sonarcloud.io/dashboard?id=saqqdy_uni-use
