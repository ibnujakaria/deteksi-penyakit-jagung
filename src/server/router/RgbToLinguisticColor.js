let express = require('express')
let router = express.Router()
let bodyParser = require('body-parser')
let RgbToLinguisticColor = require('../../fch/rgb-to-linguistic-color.js')

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.post('/rgb-to-linguistic-color', (req, res) => {

  let linguisticColor = RgbToLinguisticColor.convert(req.body.rgb)

  res.status(200).send(linguisticColor)
})

module.exports = router