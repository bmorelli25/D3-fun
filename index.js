const express = require('express')
const app = express()

app.use(express.static('6-filter'))

app.get('/', function (req, res) {
  res.sendfile('./6-filter/index.html');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})