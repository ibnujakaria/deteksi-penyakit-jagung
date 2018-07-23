let express = require('express')
let app = express()
let ColorExtraction = require('./router/ColorExtraction.js')

app.use('/feature-extraction', ColorExtraction)

module.exports = app