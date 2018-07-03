# @leactive/core

[![npm](https://img.shields.io/npm/v/@leactive/core.svg)](https://www.npmjs.com/package/@leactive/core)
[![License](https://img.shields.io/npm/l/@leactive/core.svg)](https://www.npmjs.com/package/@leactive/core)
[![Build Status](https://travis-ci.org/leactive/core.svg?branch=master)](https://travis-ci.org/leactive/core)
[![Coverage Status](https://coveralls.io/repos/github/leactive/core/badge.svg?branch=master)](https://coveralls.io/github/leactive/core?branch=master)
![types: typescript/flow](https://img.shields.io/badge/types-typescript%2Fflow-blue.svg)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/leactive/core/pulls)

> Dead simple and extremely fast state manager | [github.com/leactive/core](https://github.com/leactive/core#readme)

- [Installation](#installation)
- [How It Works](#how-it-works)
- [Questions](#questions)
- [License](#license)

## Installation

### Direct `<script />` include

The library will be exposed as a global `Leactive` variable

```html
<script src="https://cdn.jsdelivr.net/npm/@leactive/core@latest"></script>
```

**or** via unpkg

```html
<script src="https://unpkg.com/@leactive/core@latest"></script>
```

### NPM

```bash
npm install @leactive/core --save
```

### Yarn

```bash
yarn add @leactive/core
```

## How It Works

Leactive is reactive, so the store reacts when you change the state. When you create store instance via `createStore(options)` the library walks through each `options.state` property and observes it with getters/setters. If the value of the property is an object, Leactive observes this object too. Also if at runtime you assign an object to some of state properties Leactive will also observe it. You can be familliar with this behavior if you have experience in Vue.js

## Questions

If you have any troubles, questions or proposals you can create the [issue](https://github.com/leactive/core/issues)  
Good pull requests are also appreciated :)

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018 - present, Eduard Troshin
