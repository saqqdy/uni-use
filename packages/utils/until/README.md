<div style="text-align: center;" align="center">

# @uni-use/until

Promised one-time watch for changes

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
$ pnpm install @uni-use/until

# use npm
$ npm install @uni-use/until --save

# use yarn
$ yarn add @uni-use/until
```

## Usage

### 1. Wait for some async data to be ready

```ts
import { ref } from 'vue'
import until from '@uni-use/until'

const val = ref(1)

setTimeout(() => {
  val.value = 2
}, 1000)
;(async () => {
  await until(val).toBe(2)
  // state is now ready
})()
```

### 2. Wait for custom conditions

```ts
import { ref } from 'vue'
import until from '@uni-use/until'

const val = ref(1)

setTimeout(() => {
  val.value = 2
}, 1000)
;(async () => {
  await until(val).toMatch(value => value > 1)
  // state is now ready
})()
```

### 3. Wait until timeout

```ts
import { ref } from 'vue'
import until from '@uni-use/until'

const val = ref(1)

setTimeout(() => {
  val.value = 2
}, 1000)
;(async () => {
  await until(val).not.toBe(ref(2), { timeout: 500, throwOnTimeout: true })
  // reject timeout
})()
```

### 4. More Examples

```ts
import { ref } from 'vue'
import until from '@uni-use/until'

const val = ref(1)

setTimeout(() => {
  val.value = 2
}, 1000)
;(async () => {
  await until(ref).toBe(true)
  await until(ref).toMatch(v => v > 5 && v < 10)
  await until(ref).changed()
  await until(ref).changedTimes(2)
  await until(ref).toBeTruthy()
  await until(ref).toBeNull()

  await until(ref).not.toBeNull()
  await until(ref).not.toBeTruthy()
})()
```

### 5. Use CDN resource

```html
<script src="https://unpkg.com/vue-demi@latest/lib/index.iife.js"></script>
<script src="https://unpkg.com/@uni-use/until@latest/dist/index.global.prod.js"></script>
<script>
  await useUntil(val).toBe(true)
  // ...
</script>
```

## Support & Issues

Please open an issue [here](https://github.com/saqqdy/uni-use/issues).

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/@uni-use/until.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@uni-use/until
[codacy-image]: https://app.codacy.com/project/badge/Grade/f70d4880e4ad4f40aa970eb9ee9d0696
[codacy-url]: https://www.codacy.com/gh/saqqdy/@uni-use/until/dashboard?utm_source=github.com&utm_medium=referral&utm_content=saqqdy/@uni-use/until&utm_campaign=Badge_Grade
[codecov-image]: https://img.shields.io/codecov/c/github/saqqdy/@uni-use/until.svg?style=flat-square
[codecov-url]: https://codecov.io/github/saqqdy/@uni-use/until?branch=master
[download-image]: https://img.shields.io/npm/dm/@uni-use/until.svg?style=flat-square
[download-url]: https://npmjs.org/package/@uni-use/until
[gzip-image]: http://img.badgesize.io/https://unpkg.com/@uni-use/until/dist/index.global.prod.js?compression=gzip&label=gzip%20size:%20JS
[gzip-url]: http://img.badgesize.io/https://unpkg.com/@uni-use/until/dist/index.global.prod.js?compression=gzip&label=gzip%20size:%20JS
[license-image]: https://img.shields.io/badge/License-MIT-blue.svg
[license-url]: LICENSE
[sonar-image]: https://sonarcloud.io/api/project_badges/quality_gate?project=saqqdy_uni-use
[sonar-url]: https://sonarcloud.io/dashboard?id=saqqdy_uni-use
