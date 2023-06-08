<div style="text-align: center;" align="center">

# use-textarea

A combined api for editable html and textarea

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
$ pnpm install use-textarea

# use npm
$ npm install use-textarea --save

# use yarn
$ yarn add use-textarea
```

## Usage

### 1. Simple use:

```ts
import useTextarea from 'use-textarea'

const element = document.getElementById('text-area')
const textarea = useTextarea(element)

textarea.insert('I am insert text')
textarea.moveToEnd() // move cursors to end
```

### 2. Using in vue3.x:

```vue
<template>
  <textarea name="textarea" ref="textareaRef"></textarea>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import useTextarea from 'use-textarea'

const textareaRef = ref(null)
const textarea = useTextarea(textareaRef)

onMounted(() => {
  textarea.insert('I am insert text')
  textarea.moveToEnd() // move cursors to end
})

defineExpose({
  textareaRef
})
</script>
```

### 3. Using in vue2.7.x:

```vue
<template>
  <textarea name="textarea" ref="textareaRef"></textarea>
</template>

<script>
import useTextarea from 'use-textarea'

export default {
  setup() {
    const textareaRef = ref(null)
    const textarea = useTextarea(textareaRef)

    onMounted(() => {
      textarea.insert('I am insert text')
      textarea.moveToEnd() // move cursors to end
    })

    return {
      textareaRef,
      textarea
    }
  }
}
</script>
```

### 4. Use CDN resource

```html
<script src="https://unpkg.com/vue-demi@latest/lib/index.iife.js"></script>
<script src="https://unpkg.com/use-textarea@1.0.0/dist/index.global.prod.js"></script>
<script>
  const textarea = useTextarea(document.getElementById('id'))
  // ...
</script>
```

## Support & Issues

Please open an issue [here](https://github.com/saqqdy/uni-use/issues).

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/use-textarea.svg?style=flat-square
[npm-url]: https://npmjs.org/package/use-textarea
[codacy-image]: https://app.codacy.com/project/badge/Grade/f70d4880e4ad4f40aa970eb9ee9d0696
[codacy-url]: https://www.codacy.com/gh/saqqdy/use-textarea/dashboard?utm_source=github.com&utm_medium=referral&utm_content=saqqdy/use-textarea&utm_campaign=Badge_Grade
[codecov-image]: https://img.shields.io/codecov/c/github/saqqdy/use-textarea.svg?style=flat-square
[codecov-url]: https://codecov.io/github/saqqdy/use-textarea?branch=master
[download-image]: https://img.shields.io/npm/dm/use-textarea.svg?style=flat-square
[download-url]: https://npmjs.org/package/use-textarea
[gzip-image]: http://img.badgesize.io/https://unpkg.com/use-textarea/dist/index.global.prod.js?compression=gzip&label=gzip%20size:%20JS
[gzip-url]: http://img.badgesize.io/https://unpkg.com/use-textarea/dist/index.global.prod.js?compression=gzip&label=gzip%20size:%20JS
[license-image]: https://img.shields.io/badge/License-MIT-blue.svg
[license-url]: LICENSE
[sonar-image]: https://sonarcloud.io/api/project_badges/quality_gate?project=saqqdy_uni-use
[sonar-url]: https://sonarcloud.io/dashboard?id=saqqdy_uni-use
