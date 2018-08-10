let fs = require('fs')
let express = require('express')
let router = express.Router()
let bodyParser = require('body-parser')
let Jimp = require('jimp')
let Glrlm = require('../../glrlm/glrlm.js')
let Fch = require('../../fch/fch.js')
let knnClassifier = require('../../app/prediction-knn.js')

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.post('/', (req, res) => {
  if (!req.files) {
    res.status(422).send({ message: 'No files uploaded :(' })
  }

  let data = JSON.parse(fs.readFileSync(`./dist/extracted-data.json`))
  let datasets = getFeatures(data)

  let image = req.files.image
  let now = new Date().getTime()
  let fileName = `tmp/${now}-${image.name}`

  image.mv(fileName, err => {
    if (err) {
      return req.status(500).send({ err })
    }

    // baru di sini nanti diambil extraksi fiturnya
    Jimp.read(fileName).then(jimpImage => {
      jimpImage.resize(100, Jimp.AUTO)

      let glrlm = new Glrlm(jimpImage)
      let texture = glrlm.getFeatures()

      let fch = new Fch(jimpImage)
      // let color = fch.getNormalizedHistogram()
      let color = fch.getHistogram()

      let inputImage = {
        label: null,
        feature: { color, texture }
      }

      fs.unlinkSync(fileName)
      res.status(200).send({
        result: knnClassifier.predict(inputImage, datasets),
        feature: inputImage.feature
      })
    }).catch(err => {
      console.error(err)
      res.status(500).send(err)
    })
  })
})

function getFeatures (data) {
  let results = []

  data.data.forEach(label => {
    label.images.forEach(image => {
      results.push(image)
    })
  })

  return results
}

module.exports = router