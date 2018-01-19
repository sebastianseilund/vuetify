const path = require('path')
const webpack = require('webpack')
const vuetifyPackage = require('../package.json')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

module.exports = {
  resolve: {
    extensions: ['*', '.js', '.json', '.vue'],
    alias: {
      '@components': path.resolve(__dirname, '../src/components'),
      '@directives': path.resolve(__dirname, '../src/directives'),
      '@mixins': path.resolve(__dirname, '../src/mixins'),
      '@util': path.resolve(__dirname, '../src/util'),
      'stylus': path.resolve(__dirname, '../src/stylus')
    }
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      clearConsole: true
    }),
    new webpack.DefinePlugin({
      'process.env.VUETIFY_VERSION': JSON.stringify(vuetifyPackage.version),
      'process.env.REQUIRED_VUE': JSON.stringify(vuetifyPackage.peerDependencies.vue)
    })
  ]
}
