/*
 * @Author: 佐轩 zhangzuoxuan@apexsoft.com.cn
 * @Date: 2022-05-12 23:41:26
 * @LastEditors: 佐轩 zhangzuoxuan@apexsoft.com.cn
 * @LastEditTime: 2022-05-13 14:58:29
 * @FilePath: /XavierCoinAxios/examples/server.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(WebpackConfig)

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: '/__build__/',
    stats: {
      colors: true,
      chunks: false
    }
  })
)

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const router = express.Router()

router.get('/simple/get', function(req, res) {
  res.json({
    msg: `hello world`
  })
})

router.get('/base/get', function(req, res) {
  res.json(req.query)
})

router.post('/base/post', function(req, res) {
  res.json(req.body)
})

router.post('/base/buffer', function(req, res) {
  let msg = []
  req.on('data', chunk => {
    if (chunk) {
      msg.push(chunk)
    }
  })
  req.on('end', () => {
    let buf = Buffer.concat(msg)
    res.json(buf.toJSON())
  })
})

app.use(router)

const port = process.env.PORT || 8085
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})
