let express = require('express')
let router = express.Router()
let bodyParser = require('body-parser')
let Jimp = require('jimp')
let Fch = require('../../fch/fch.js')
let fs = require('fs')

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
    Jimp.read(fileName).then(jimpImage => {
      let fch = new Fch(jimpImage)
      let normalizedHistogram = fch.getNormalizedHistogram()
      let histogram = fch.getHistogram()

      fs.unlinkSync(fileName)
      res.status(200).send({
        normalizedHistogram, histogram
      })
    }).catch(err => {
      res.status(500).send(err)
    })
  })
})

module.exports = router