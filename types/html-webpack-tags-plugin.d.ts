// FIXME See https://github.com/jharris4/html-webpack-tags-plugin/issues/52
declare module 'html-webpack-tags-plugin' {
  import { Plugin } from 'webpack';

  interface Options {
    append?: boolean;
    prependExternals?: boolean;
    jsExtensions?: string | string[];
    cssExtensions?: string | string[];
    useHash?: boolean;
    addHash?: (assetPath: string, hash: string) => string;
    hash?: boolean | Function;
    usePublicPath?: boolean;
    addPublicPath?: (assetPath: string, publicPath: string) => string;
    publicPath?: boolean | string | Function;

    tags?: string | object | Array<string | object>;
    links?: string | object | Array<string | object>;
    scripts?: string | object | Array<string | object>;
    metas?: string | object | Array<string | object>;
  }

  export default class HtmlWebpackTagsPlugin extends Plugin {
    constructor(options: Options);
  }
}
