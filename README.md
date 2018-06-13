# Marvel Heroes

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

- React 16
- No Redux, just `setState()`
- TypeScript with `strict: true`
- Babel 7 with `@babel/preset-typescript`
- React Router 4
- Jest + Enzyme => 100% code coverage
- Fetch API + polyfill whatwg-fetch
- Bootstrap 4
