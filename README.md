# Test Poker Dkatalis - Achmad Jamaludin

[![TypeScript version][ts-badge]][typescript-4-9]
[![Node.js version][nodejs-badge]][nodejs]

🏃🏽 Instant Value: All basic tools included and configured:

- [TypeScript][typescript] [4.9][typescript-4-9]
- [ESM][esm]
- [ESLint][eslint] with some initial rules recommendation
- [Jest][jest] for fast unit testing and code coverage
- Type definitions for Node.js and Jest
- [Prettier][prettier] to enforce consistent code style
- NPM [scripts](#available-scripts) for common operations
- TypeScript code and unit test


## Getting Started

This project is intended to be used with the latest Active LTS release of [Node.js][nodejs].

## Available Scripts

- `clean` - remove coverage data, Jest cache and transpiled files,
- `build` - transpile TypeScript to ES6,
- `start` - start application,
- `build:watch` - interactive watch mode to automatically transpile source files,
- `lint` - lint source files and tests,
- `prettier-format` - reformat files,
- `test` - run tests,

## Install
```sh
npm i
```

## How to test
```sh
npm run test
```

## How to run
```sh
npm run start {number of player}
```
example
```sh
npm run start 5
```

[ts-badge]: https://img.shields.io/badge/TypeScript-4.9.3-blue.svg
[nodejs-badge]: https://img.shields.io/badge/Node.js->=%2018.11-blue.svg
[nodejs]: https://nodejs.org/dist/latest-v18.x/docs/api/
[typescript]: https://www.typescriptlang.org/
[typescript-4-9]: https://devblogs.microsoft.com/typescript/announcing-typescript-4-9/
[jest]: https://facebook.github.io/jest/
[eslint]: https://github.com/eslint/eslint
[wiki-js-tests]: https://github.com/jsynowiec/node-typescript-boilerplate/wiki/Unit-tests-in-plain-JavaScript
[prettier]: https://prettier.io
[esm]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
