let express = require('express')
let router = express.Router()
let bodyParser = require('body-parser')
let fs = require('fs')

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.get('/all', (req, res) => {
  let data = JSON.parse(fs.readFileSync('./dist/extracted-data.json'))

  res.status(200).send(data)
})

router.get('/k-fold/:k', (req, res) => {
  let files = fs.readdirSync(`./dist/k-fold/k-${req.params.k}`)
  let data = []

  files.forEach((file, k) => {
    let { training, testing } = JSON.parse(
      fs.readFileSync(
        `./dist/k-fold/k-${req.params.k}/${file}`
      )
    )

    data.push({ k, training, testing })
  })

  res.send(data)
})

module.exports = router