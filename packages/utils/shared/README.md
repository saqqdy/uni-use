<div style="text-align: center;" align="center">

# @uni-use/shared

Collection of shared Utilities

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
$ pnpm install @uni-use/shared

# use npm
$ npm install @uni-use/shared --save

# use yarn
$ yarn add @uni-use/shared
```

## Usage

### 1. Using in vue3.x:

```vue
<script setup>
import useShared from '@uni-use/shared'

const isShared = useShared(() => navigator && 'getBattery' in navigator)

if (isShared.value) {
  // do something
  navigator.getBattery
}

defineExpose({
  isShared
})
</script>
```

### 2. Using in vue2.7.x:

```vue
<script>
import useShared from '@uni-use/shared'

export default {
  setup() {
    const isShared = useShared(() => navigator && 'getBattery' in navigator)

    if (isShared.value) {
      // do something
      navigator.getBattery
    }

    return {
      isShared
    }
  }
}
</script>
```

### 3. Use CDN resource

```html
<script src="https://unpkg.com/vue-demi@latest/lib/index.iife.js"></script>
<script src="https://unpkg.com/@uni-use/shared@1.0.0/dist/index.global.prod.js"></script>
<script>
  const shared = useShared(() => navigator && 'getBattery' in navigator)
  // ...
</script>
```

## Support & Issues

Please open an issue [here](https://github.com/saqqdy/uni-use/issues).

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/@uni-use/shared.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@uni-use/shared
[codacy-image]: https://app.codacy.com/project/badge/Grade/f70d4880e4ad4f40aa970eb9ee9d0696
[codacy-url]: https://www.codacy.com/gh/saqqdy/@uni-use/shared/dashboard?utm_source=github.com&utm_medium=referral&utm_content=saqqdy/@uni-use/shared&utm_campaign=Badge_Grade
[codecov-image]: https://img.shields.io/codecov/c/github/saqqdy/@uni-use/shared.svg?style=flat-square
[codecov-url]: https://codecov.io/github/saqqdy/@uni-use/shared?branch=master
[download-image]: https://img.shields.io/npm/dm/@uni-use/shared.svg?style=flat-square
[download-url]: https://npmjs.org/package/@uni-use/shared
[gzip-image]: http://img.badgesize.io/https://unpkg.com/@uni-use/shared/dist/index.global.prod.js?compression=gzip&label=gzip%20size:%20JS
[gzip-url]: http://img.badgesize.io/https://unpkg.com/@uni-use/shared/dist/index.global.prod.js?compression=gzip&label=gzip%20size:%20JS
[license-image]: https://img.shields.io/badge/License-MIT-blue.svg
[license-url]: LICENSE
[sonar-image]: https://sonarcloud.io/api/project_badges/quality_gate?project=saqqdy_uni-use
[sonar-url]: https://sonarcloud.io/dashboard?id=saqqdy_uni-use
