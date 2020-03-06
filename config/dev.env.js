'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API:'"http://172.0.2.12:6060"',
  API_ROOT:'"http://172.0.2.12:6060"'
})
