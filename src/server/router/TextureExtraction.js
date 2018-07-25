let fs = require('fs')
let express = require('express')
let router = express.Router()
let bodyParser = require('body-parser')
let Jimp = require('jimp')
let Glrlm = require('../../glrlm/glrlm.js')

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.post('/texture', (req, res) => {
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
      let glrlm = new Glrlm(jimpImage)
      let texture = glrlm.getFeatures()

      fs.unlinkSync(fileName)
      res.status(200).send({ texture })
    }).catch(err => {
      res.status(500).send(err)
    })
  })
})

module.exports = router