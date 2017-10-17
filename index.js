const express = require('express')
const app = express()

app.use(express.static('3-api'))

app.get('/', function (req, res) {
  res.sendfile('./3-api/index.html');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})