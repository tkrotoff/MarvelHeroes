# Marvel Heroes

[![Build Status](https://travis-ci.org/tkrotoff/MarvelHeroes.svg?branch=master)](https://travis-ci.org/tkrotoff/MarvelHeroes)
[![codecov](https://codecov.io/gh/tkrotoff/MarvelHeroes/branch/master/graph/badge.svg)](https://codecov.io/gh/tkrotoff/MarvelHeroes)

React app that displays the Marvel characters thanks to https://developer.marvel.com/

- Supports IE >= 10
- [W3C validator](https://validator.w3.org/) completed

### HeroesPagination/Heroes component screenshot

![HeroesPagination/Heroes component screenshot](doc/HeroesPagination.png)

### Hero component screenshot

![Hero component screenshot](doc/Hero.png)

## How to run

```
npm run build
open build/index.html
```

## Libraries used

- React 16 with hooks
- No Redux, just `useState()`
- TypeScript with `strict: true`
- Babel 7 with `@babel/preset-typescript`
- React Router 4
- Jest + react-testing-library + Puppeteer => 100% code coverage
- Fetch API + whatwg-fetch polyfill
- Bootstrap 4
