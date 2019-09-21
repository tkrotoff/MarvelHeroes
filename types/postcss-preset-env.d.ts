// FIXME See https://github.com/csstools/postcss-preset-env/issues/150
declare module 'postcss-preset-env' {
  import { plugin, Plugin, ParserInput, Result, LazyResult, Root, ProcessOptions } from 'postcss';

  interface PluginOptions {
    stage?: number;
    features?: any;
    browsers?: string;
    insertBefore?: any;
    insertAfter?: any;
    autoprefixer?: any;
    preserve?: boolean;
    importFrom?: string;
    exportTo?: string;
  }

  const PostcssPresetEnv: Plugin<PluginOptions>;
  export default PostcssPresetEnv;
}
