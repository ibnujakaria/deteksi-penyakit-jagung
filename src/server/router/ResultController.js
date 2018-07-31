let express = require('express')
let router = express.Router()
let bodyParser = require('body-parser')
let fs = require('fs')

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.get('/', (req, res) => {
  let data = JSON.parse(fs.readFileSync('./dist/results.json'))

  res.status(200).send(data)
})

module.exports = router