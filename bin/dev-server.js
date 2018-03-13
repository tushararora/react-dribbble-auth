const webpack = require('webpack')
const path = require('path')
const opn = require('opn')
const express = require('express')
const _ = require('lodash')
const config = require('./dev.json')
const webpackConfig = _.cloneDeep(require('../webpack.config.js'))
const HTMLWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const app = express()
const projectRoot = webpackConfig.context

config.env = {}

webpackConfig.devtool = '#source-map'

webpackConfig.plugins = [
  new webpack.DefinePlugin({
    'process.env': config.env
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new HTMLWebpackPlugin({
    filename: 'index.html',
    template: 'index.html',
    inject: true
  }),
  new FriendlyErrorsPlugin()
]

webpackConfig.entry = {
  app: ['react-hot-loader/patch', 'webpack-hot-middleware/client', 'babel-polyfill', path.join(projectRoot, config.entry)]
}
webpack.resolve = {
  extensions: ['.js', '.jsx']
}

webpackConfig.output = {
  path: path.join(projectRoot, config.publicPath),
  pathinfo: true,
  publicPath: config.publicPath,
  filename: config.output
}

const compiler = webpack(webpackConfig)

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use(require('webpack-hot-middleware')(compiler))

app.get('/api/v1/auth/dribbble', function (req, res) {
  return res.json({
    success: true,
    data: {
      client_id: '0045e41e8e419f5937685d2857e108b488bac6033f5b1abbde2b5280aa686aa4',
      state: 'String'
    }
  })
})

app.post('/api/v1/auth/code', function (req, res) {
  return res.json({
    success: true,
    data: {}
  })
})

app.get('*', (req, res) => res.sendFile(path.join(projectRoot, config.htmlFile)))

module.exports = app.listen(config.port, function (error) {
  if (error) {
    console.log(error)
    return
  }

  if (process.env.NODE_ENV !== 'testing') {
    opn(`http://localhost:${config.port}`)
  }
})
