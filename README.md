<div style="text-align: center;" align="center">

# @uni-use/monorepo

Collection of common composition apis for vue2 & vue3

[![NPM version][npm-image]][npm-url]
[![Codacy Badge][codacy-image]][codacy-url]
[![License][license-image]][license-url]

[![Sonar][sonar-image]][sonar-url]

</div>

## Function list

- A js utilities that contains all the methods for downloading files: [use-downloads](https://github.com/saqqdy/uni-use/tree/master/packages/downloads)
- A combined api for editable html and textarea: [use-textarea](https://github.com/saqqdy/uni-use/tree/master/packages/textarea)
- A composition api for SpeechSynthesis, supports vue2.0 and vue3.0: [use-speak](https://github.com/saqqdy/uni-use/tree/master/packages/speak)
- A composition api for css throttle, supports vue2.0 and vue3.0: [use-css-throttle](https://github.com/saqqdy/uni-use/tree/master/packages/css-throttle)

## Install

e.g: use `use-downloads`

```shell
# by pnpm
pnpm install use-downloads

# by npm
npm install -D use-downloads

# by yarn
yarn add use-downloads
```

## Usage

### General use

```js
import useDownloads from 'use-downloads'
const { download } = useDownloads()

download('url', options)
```

2. by require

```js
const useDownloads = require('use-downloads')
const { download } = useDownloads()

download('url', options)
```

### Use CDN resource

```html
<!-- head -->
<script src="https://unpkg.com/use-downloads@1.2.0/dist/index.global.prod.js"></script>
```

## Issues & Support

Please open an issue [here](https://github.com/saqqdy/uni-use/issues).

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/@uni-use/monorepo.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@uni-use/monorepo
[codacy-image]: https://app.codacy.com/project/badge/Grade/f70d4880e4ad4f40aa970eb9ee9d0696
[codacy-url]: https://www.codacy.com/gh/saqqdy/@uni-use/monorepo/dashboard?utm_source=github.com&utm_medium=referral&utm_content=saqqdy/@uni-use/monorepo&utm_campaign=Badge_Grade
[license-image]: https://img.shields.io/badge/License-MIT-blue.svg
[license-url]: LICENSE
[sonar-image]: https://sonarcloud.io/api/project_badges/quality_gate?project=saqqdy_uni-use
[sonar-url]: https://sonarcloud.io/dashboard?id=saqqdy_uni-use
