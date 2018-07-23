let express = require('express')
let router = express.Router()
let bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.get('/color', (req, res) => {
  res.status(200).send('Hello!')
})

module.exports = router