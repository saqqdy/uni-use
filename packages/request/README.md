<div style="text-align: center;" align="center">

# @uni-use/request

An easy to use axios based http client combinatorial api with support for return sequentially

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
$ pnpm install @uni-use/request

# use npm
$ npm install @uni-use/request --save

# use yarn
$ yarn add @uni-use/request
```

## Usage

### 1. Simple use:

```ts
import useRequest from '@uni-use/request'

const {
  isFetching,
  error,
  data,
  execute,
  abort,
  canAbort,
  createFetch,
  isFinished,
  statusCode,
  response,
  aborted,
  onFetchResponse,
  onFetchError,
  onFetchFinally
} = useRequest({
  immediate,
  refetch,
  timeout,
  beforeFetch,
  afterFetch,
  onFetchResponse,
  onFetchError
})
  .get()
  .put()
  .post()
  .delete()
  .patch()
  .head()
  .options()
  //
  .json()
  .text()
  .blob()
  .arrayBuffer()
  .formData()

createFetch({
  baseUrl: 'https://my-api.com',
  options: {
    async beforeFetch({ options }) {
      const myToken = await getMyToken()
      options.headers.Authorization = `Bearer ${myToken}`

      return { options }
    }
  },
  fetchOptions: {
    mode: 'cors'
  }
})

request({
  url: '/path/of/api'
})
```

### 2. Using in vue3.x:

```vue
<script setup>
import useRequest from '@uni-use/request'

const { request } = useRequest({})

defineExpose({
  request
})
</script>
```

### 3. Using in vue2.7.x:

```vue
<script>
import useRequest from '@uni-use/request'

export default {
  setup() {
    const { request } = useRequest({})

    return {
      request
    }
  }
}
</script>
```

### 4. Use CDN resource

```html
<script src="https://unpkg.com/vue-demi@latest/lib/index.iife.js"></script>
<script src="https://unpkg.com/@uni-use/request@1.0.0/dist/index.global.prod.js"></script>
<script>
  const { request } = useRequest({})
  // ...
</script>
```

## Support & Issues

Please open an issue [here](https://github.com/saqqdy/uni-use/issues).

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/@uni-use/request.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@uni-use/request
[codacy-image]: https://app.codacy.com/project/badge/Grade/f70d4880e4ad4f40aa970eb9ee9d0696
[codacy-url]: https://www.codacy.com/gh/saqqdy/@uni-use/request/dashboard?utm_source=github.com&utm_medium=referral&utm_content=saqqdy/@uni-use/request&utm_campaign=Badge_Grade
[codecov-image]: https://img.shields.io/codecov/c/github/saqqdy/@uni-use/request.svg?style=flat-square
[codecov-url]: https://codecov.io/github/saqqdy/@uni-use/request?branch=master
[download-image]: https://img.shields.io/npm/dm/@uni-use/request.svg?style=flat-square
[download-url]: https://npmjs.org/package/@uni-use/request
[gzip-image]: http://img.badgesize.io/https://unpkg.com/@uni-use/request/dist/index.global.prod.js?compression=gzip&label=gzip%20size:%20JS
[gzip-url]: http://img.badgesize.io/https://unpkg.com/@uni-use/request/dist/index.global.prod.js?compression=gzip&label=gzip%20size:%20JS
[license-image]: https://img.shields.io/badge/License-MIT-blue.svg
[license-url]: LICENSE
[sonar-image]: https://sonarcloud.io/api/project_badges/quality_gate?project=saqqdy_uni-use
[sonar-url]: https://sonarcloud.io/dashboard?id=saqqdy_uni-use
