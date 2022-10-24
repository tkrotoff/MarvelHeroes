import { getPackageNameFromPath } from './getPackageNameFromPath';

test('getPackageNameFromPath()', () => {
  expect(getPackageNameFromPath('/whatever/node_modules/packageName')).toEqual('packageName');
  expect(getPackageNameFromPath('/whatever/node_modules/packageName/not/this/part.js')).toEqual(
    'packageName'
  );
  expect(getPackageNameFromPath('/whatever/node_modules/@scope/packageName')).toEqual(
    '@scope/packageName'
  );
  expect(
    getPackageNameFromPath('/whatever/node_modules/@scope/packageName/not/this/part.js')
  ).toEqual('@scope/packageName');

  expect(
    getPackageNameFromPath('/whatever/node_modules/packageName/node_modules/not/this/part.js')
  ).toEqual('packageName');
  expect(
    getPackageNameFromPath(
      '/whatever/node_modules/@scope/packageName/node_modules/not/this/part.js'
    )
  ).toEqual('@scope/packageName');

  expect(() => getPackageNameFromPath('/invalid/path/packageName')).toThrow(
    "Could not recognize '/invalid/path/packageName'"
  );
});
