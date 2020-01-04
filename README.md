# Marvel Heroes

[![Travis CI Build Status](https://travis-ci.org/tkrotoff/MarvelHeroes.svg?branch=master)](https://travis-ci.org/tkrotoff/MarvelHeroes)
[![codecov](https://codecov.io/gh/tkrotoff/MarvelHeroes/branch/master/graph/badge.svg)](https://codecov.io/gh/tkrotoff/MarvelHeroes)
[![Code Climate Maintainability](https://api.codeclimate.com/v1/badges/6440dc7f156cc4726c69/maintainability)](https://codeclimate.com/github/tkrotoff/MarvelHeroes/maintainability)
[![Code Climate Test Coverage](https://api.codeclimate.com/v1/badges/6440dc7f156cc4726c69/test_coverage)](https://codeclimate.com/github/tkrotoff/MarvelHeroes/test_coverage)
[![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Airbnb Code Style](https://badgen.net/badge/code%20style/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)

http://marvelheroes.s3-website.eu-west-3.amazonaws.com/

React app that displays the Marvel characters thanks to https://developer.marvel.com/

- Supports IE >= 10
- [W3C validator](https://validator.w3.org/) completed

I use this app as a boilerplate and to demo JS web app best practices.

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
- Jest + react-testing-library + Puppeteer => 100% code coverage
- Fetch API + whatwg-fetch polyfill
- React Router
- Prettier + ESLint + stylelint
- Bootstrap 4 + Purgecss
