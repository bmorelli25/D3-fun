const express = require('express')
const app = express()

app.use(express.static('2-data'))

app.get('/', function (req, res) {
  res.sendfile('./2-data/index.html');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})