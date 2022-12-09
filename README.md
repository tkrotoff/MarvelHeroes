# Marvel Heroes

[![Node.js CI](https://github.com/tkrotoff/MarvelHeroes/workflows/Node.js%20CI/badge.svg?branch=master)](https://github.com/tkrotoff/MarvelHeroes/actions)
[![Codecov](https://codecov.io/gh/tkrotoff/MarvelHeroes/branch/master/graph/badge.svg)](https://codecov.io/gh/tkrotoff/MarvelHeroes)
[![Code Climate Maintainability](https://api.codeclimate.com/v1/badges/6440dc7f156cc4726c69/maintainability)](https://codeclimate.com/github/tkrotoff/MarvelHeroes/maintainability)
[![Code Climate Test Coverage](https://api.codeclimate.com/v1/badges/6440dc7f156cc4726c69/test_coverage)](https://codeclimate.com/github/tkrotoff/MarvelHeroes/test_coverage)
[![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Airbnb Code Style](https://badgen.net/badge/code%20style/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)

http://marvelheroes.s3-website.eu-west-3.amazonaws.com/ <sup>[1]</sup>

Very simple React app that displays the Marvel characters thanks to https://developer.marvel.com/

- 2 pages: list of heroes + details of a hero
- Implementation is 400 LOC (+ 700 LOC of tests)
- Unit/integration tests written in react-testing-library & Jest
- E2E tests written in Playwright
- [W3C validator](https://validator.w3.org/) completed

I use this app as a boilerplate and to demo some JS web app best practices.

<small>1. No HTTPS, no gzip, no cache...</small>

### List of heroes: HeroesPagination/Heroes component screenshot

![HeroesPagination/Heroes component screenshot](doc/HeroesPagination.png)

### Details of a hero: Hero component screenshot

![Hero component screenshot](doc/Hero.png)

## How to run

```
npm run start:stubs
open http://localhost:8080
```

```
npm run start:marvel.com
open http://localhost:8080
```

## Libraries used

- React with hooks
- No Redux, just `useState()`
- TypeScript with `strict: true`
- Babel with `@babel/preset-typescript`
- Jest + react-testing-library + Playwright => 100% code coverage
- Fetch API
- React Router
- Prettier + ESLint + stylelint
- Bootstrap 5 + Purgecss
