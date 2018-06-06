# moroz

Really COOL deepFreeze

[![Build Status][travis-image]][travis-url]
[![NPM version][npm-image]][npm-url]

> _'__moroz__' is a russian word that means such weather when everything deep freeze_

## Why?

Because [deep-freeze](https://github.com/substack/deep-freeze) are not maintained from 2012 and it have some important but unhandled issues and PRs. Numerous clones and forks exists but there is no one to solve all problems with object deep-freezing.

## Features

* makes objects deep frozen
* works well with non enumerable properties
* works well with symbol-named fields
* works well with prototype chains
* works well with circular reference
* works well with pure objects (with null-prototype)
* does not stop on nested frozen objects
* does not crash on nuuls, buffers and old functions

## Install

```bash
npm i moroz
```

## Usage

```js
const deepFreeze = require('moroz');

deepFreeze(objectToBeDeepFrozen);
```

## License

MIT

[npm-url]: https://npmjs.org/package/moroz
[npm-image]: https://badge.fury.io/js/moroz.svg
[travis-url]: https://travis-ci.org/astur/moroz
[travis-image]: https://travis-ci.org/astur/moroz.svg?branch=master