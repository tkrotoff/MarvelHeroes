// See Testing React Components with async componentDidMount using Jest and Enzyme https://github.com/nilshartmann/jest-playground
//
// Syntactic sugar, see: https://github.com/facebook/jest/issues/2157#issuecomment-279171856
// Something like this will maybe added to the Jest API
const flushPromises = () => {
  return new Promise(resolve => setImmediate(resolve));
};

export default flushPromises;
