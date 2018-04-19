export default {
  entry: 'src/index.js',
  extraBabelPlugins: [
    'transform-decorators-legacy',
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
    ['import', { libraryName: 'yd', libraryDirectory: 'es', style: true }, 'yd-import'],
    ['import', { libraryName: 'yd-gis', libraryDirectory: 'es', style: true, camel2DashComponentName: false }, 'yd-gis-import'],
  ],
  proxy: {
    '/proxy7080': {
      target: 'http://192.168.8.229:7080/',
      changeOrigin: true,
      pathRewrite: { '^/proxy7080' : '' }
    },
    '/proxy8023': {
      target: 'http://192.168.8.229:8023/',
      changeOrigin: true,
      pathRewrite: { '^/proxy8023' : '' }
    }
  },
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
    },
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
