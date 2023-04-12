beforeEach(() => {
  // window.history cannot be cleared: https://stackoverflow.com/q/20044554
  //
  // So BrowserRouter cannot be cleared between tests:
  // - https://github.com/testing-library/react-testing-library/issues/518
  // - https://v5.reactrouter.com/web/guides/testing
  //   "You can also use BrowserRouter if your test environment has the browser globals window.location and window.history
  //   (which is the default in Jest through JSDOM, but **you cannot reset the history between tests**)"
  //
  // The only solution is to push a new state to the history with "/" URL between tests
  // so window.location.href is not polluted by previous tests in the same file
  //
  // Other solutions:
  // - Use MemoryRouter instead of BrowserRouter when possible
  // - Move each test that uses BrowserRouter in its own file
  window.history.pushState({}, 'unused', '/');
});

export {};
