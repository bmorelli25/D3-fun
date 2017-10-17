const express = require('express')
const app = express()

app.use(express.static('4-enhance'))

app.get('/', function (req, res) {
  res.sendfile('./4-enhance/index.html');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})