let express = require('express')
let app = express()
let cors = require('cors')
let fileUpload = require('express-fileupload')
let ColorExtraction = require('./router/ColorExtraction.js')

app.use(cors())
app.use(fileUpload())
app.use('/feature-extraction', ColorExtraction)

module.exports = app