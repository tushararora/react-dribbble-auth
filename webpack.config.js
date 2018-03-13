const path = require('path')
const projectRoot = path.join(__dirname, './')

let config = {}

config.context = projectRoot

config.module = {}

config.module.rules = [{
  test: /(\.jsx|\.js)$/,
  exclude: [/(node_modules|bower_components)/],
  use: [{
    loader: 'babel-loader'
  }]
},
{
  test: /(\.jsx|\.js)$/,
  exclude: [/node_modules/],
  use: 'eslint-loader'
}
]

module.exports = config
