<div style="text-align: center;" align="center">

# @uni-use/speak

A simple utility to get the package manager information which used in the project

[![NPM version][npm-image]][npm-url]
[![Codacy Badge][codacy-image]][codacy-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]
[![License][license-image]][license-url]

[![Sonar][sonar-image]][sonar-url]

</div>

## Install

```bash
# use pnpm
$ pnpm install -D @uni-use/speak

# use yarn
$ yarn add -D @uni-use/speak

# use npm
$ npm install -D @uni-use/speak
```

## Usage

1. use `@uni-use/speak` in async mode
   s

```js
import { pmInfo } from '@uni-use/speak'

pmInfo().then(info => {
  console.log('The package manager is: ', info) // { name: 'pnpm', version: '7.26.1' } | null
})
```

2. use `@uni-use/speak` in sync mode

```js
import { pmInfoSync } from '@uni-use/speak'

console.log('The package manager is: ', pmInfoSync()) // { name: 'pnpm', version: '7.26.1' } | null
```

## Issues & Support

Please open an issue [here](https://github.com/saqqdy/uni-use/issues).

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/@uni-use/speak.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@uni-use/speak
[codacy-image]: https://app.codacy.com/project/badge/Grade/f70d4880e4ad4f40aa970eb9ee9d0696
[codacy-url]: https://www.codacy.com/gh/saqqdy/@uni-use/speak/dashboard?utm_source=github.com&utm_medium=referral&utm_content=saqqdy/@uni-use/speak&utm_campaign=Badge_Grade
[codecov-image]: https://img.shields.io/codecov/c/github/saqqdy/@uni-use/speak.svg?style=flat-square
[codecov-url]: https://codecov.io/github/saqqdy/@uni-use/speak?branch=master
[download-image]: https://img.shields.io/npm/dm/@uni-use/speak.svg?style=flat-square
[download-url]: https://npmjs.org/package/@uni-use/speak
[license-image]: https://img.shields.io/badge/License-MIT-blue.svg
[license-url]: LICENSE
[sonar-image]: https://sonarcloud.io/api/project_badges/quality_gate?project=saqqdy_uni-use
[sonar-url]: https://sonarcloud.io/dashboard?id=saqqdy_uni-use
