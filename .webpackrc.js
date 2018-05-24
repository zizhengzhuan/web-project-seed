export default {
  entry: 'src/index.js',
  extraBabelPlugins: [
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
    ['import', { libraryName: 'yd', libraryDirectory: 'es', style: true }, 'yd-import'],
    ['import', { libraryName: 'yd-gis', libraryDirectory: 'es', style: true, camel2DashComponentName: false }, 'yd-gis-import'],
  ],
  proxy: {
    '/proxy': {
      target: 'http://192.168.8.113:8091/',
      changeOrigin: true,
      pathRewrite: { '^/proxy7080' : '' }
    },
  },
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
    },
    production: {
      devtool: 'source-map',
    }
  },
  alias: {
    // 'components': path.resolve(__dirname, 'src/components/'),
  },
  ignoreMomentLocale: true,
  theme: './src/theme.js',
  html: {
    template: './src/index.ejs',
  },
  publicPath: '/',
  disableDynamicImport: false,
  hash: true,
};
