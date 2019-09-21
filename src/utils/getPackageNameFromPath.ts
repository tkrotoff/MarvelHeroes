/**
 * For webpack.config.js splitChunks
 * See [The 100% correct way to split your chunks with Webpack](https://hackernoon.com/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758)
 * See [Webpack v4 chunk splitting deep dive](https://www.chrisclaxton.me.uk/chris-claxtons-blog/webpack-chunksplitting-deepdive)
 */
export function getPackageNameFromPath(path: string) {
  const packageName = path.match(/\/node_modules\/((?:@[^/]*\/[^/]*)|(?:.*?))(?:\/|$)/);
  console.assert(packageName, `Could not recognize '${path}'`);
  return packageName![1];
}
