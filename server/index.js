const express = require('express')
const cors = require('cors')
const app = express()

// 跨域
app.use(require('cors')())
// 接受json的数据 （body中的数据）
app.use(express.json())

require('./routes/admin')(app)
require('./plugins/db')(app)

app.listen(5000, () => {
  console.log('running... 5000')
})