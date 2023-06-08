<div style="text-align: center;" align="center">

# use-downloads

A js utilities that contains all the methods for downloading files

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
$ pnpm install use-downloads

# use npm
$ npm install use-downloads --save

# use yarn
$ yarn add use-downloads
```

## Usage

### General use

```js
import useDownloads from 'use-downloads'

useDownloads('js/image/css/style', options)
```

2. by require

```js
const useDownloads = require('use-downloads')

useDownloads('js/image/css/style', options)
```

### Use CDN resource

```html
<!-- head -->
<script src="https://unpkg.com/use-downloads@1.2.0/dist/index.global.prod.js"></script>
```

## Support & Issues

Please open an issue [here](https://github.com/saqqdy/uni-use/issues).

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/use-downloads.svg?style=flat-square
[npm-url]: https://npmjs.org/package/use-downloads
[codacy-image]: https://app.codacy.com/project/badge/Grade/f70d4880e4ad4f40aa970eb9ee9d0696
[codacy-url]: https://www.codacy.com/gh/saqqdy/use-downloads/dashboard?utm_source=github.com&utm_medium=referral&utm_content=saqqdy/use-downloads&utm_campaign=Badge_Grade
[codecov-image]: https://img.shields.io/codecov/c/github/saqqdy/use-downloads.svg?style=flat-square
[codecov-url]: https://codecov.io/github/saqqdy/use-downloads?branch=master
[download-image]: https://img.shields.io/npm/dm/use-downloads.svg?style=flat-square
[download-url]: https://npmjs.org/package/use-downloads
[gzip-image]: http://img.badgesize.io/https://unpkg.com/use-downloads/dist/index.global.prod.js?compression=gzip&label=gzip%20size:%20JS
[gzip-url]: http://img.badgesize.io/https://unpkg.com/use-downloads/dist/index.global.prod.js?compression=gzip&label=gzip%20size:%20JS
[license-image]: https://img.shields.io/badge/License-MIT-blue.svg
[license-url]: LICENSE
[sonar-image]: https://sonarcloud.io/api/project_badges/quality_gate?project=saqqdy_uni-use
[sonar-url]: https://sonarcloud.io/dashboard?id=saqqdy_uni-use
