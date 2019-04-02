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
npm run start
open http://localhost:8080
```

## Libraries used

- React with hooks
- No Redux, just `useState()`
- TypeScript with `strict: true`
- Babel with `@babel/preset-typescript`
- React Router
- Jest + react-testing-library + Puppeteer => 100% code coverage
- Fetch API + whatwg-fetch polyfill
- Bootstrap 4
