let express = require('express')
let app = express()
let cors = require('cors')
let fileUpload = require('express-fileupload')
let ColorExtraction = require('./router/ColorExtraction.js')
let TextureExtraction = require('./router/TextureExtraction.js')
let RgbToLinguisticColor = require('./router/RgbToLinguisticColor.js')
let DataController = require('./router/DataController')

app.use(cors())
app.use(fileUpload())
app.use('/images/', express.static('./images'))
app.use('/feature-extraction', ColorExtraction)
app.use('/feature-extraction', TextureExtraction)
app.use('/data', DataController)
app.use('/', RgbToLinguisticColor)

module.exports = app