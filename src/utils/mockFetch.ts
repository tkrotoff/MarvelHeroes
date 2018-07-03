// See How to test api calls using fetch? https://github.com/facebook/create-react-app/issues/967
const mockFetch = (data: object) => {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => data
    })
  );
};

export default mockFetch;
