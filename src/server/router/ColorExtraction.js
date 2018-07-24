let express = require('express')
let router = express.Router()
let bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.post('/color', (req, res) => {
  if (!req.files) {
    res.status(422).send('No files uploaded :(')
  }

  let image = req.files.image
  let now = new Date().getTime()
  let fileName = `tmp/${now}-${image.name}`

  image.mv(fileName, err => {
    if (err) {
      return req.status(500).send(err)
    }

    // baru di sini nanti diambil extraksi fiturnya
    res.status(200).send(req.files)
  })
})

module.exports = router