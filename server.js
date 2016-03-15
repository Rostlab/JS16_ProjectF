var express = require('express')
var path = require('path')
var compression = require('compression')

var app = express()

app.use(compression())

app.use(express.static(path.join(__dirname, 'build')))

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

var PORT = process.env.PORT || 8080
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})
