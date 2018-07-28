/**
 * this file will train the data from /dist/labeled-data.json
 */

let beautify = require("json-beautify")
let fs = require('fs')
let Jimp = require('jimp')
let Fch = require('../fch/fch.js')
let Glrlm = require('../glrlm/glrlm.js')

try {
  let rawData = fs.readFileSync('./dist/labeled-data.json')
  let labeledData = JSON.parse(rawData)

  let imagesHadBeenRead = 0 // the length of read images

  labeledData.data.forEach(group => {
    group.images.forEach(image => {
      Jimp.read(`./images/penyakit-jagung/${image.path}`).then(jimpImage => {
        imagesHadBeenRead++
        console.log(`training ${image.path} (${imagesHadBeenRead}/${labeledData.imagesLength})`)

        jimpImage.resize(100, Jimp.AUTO)
        // console.log('   -> running fch..')
        let fch = new Fch(jimpImage)
        // let color = fch.getNormalizedHistogram()
        let color = fch.getHistogram()

        // console.log('   -> running glrlm')
        let glrlm = new Glrlm(jimpImage)
        let texture = glrlm.getFeatures()

        image.feature = { color, texture }


        if (imagesHadBeenRead === labeledData.imagesLength) {
          console.log('data terakhir')
          console.log(`tulis hasil ke file /dist/extracted-data.json`)

          fs.writeFileSync(
            `./dist/extracted-data.json`, beautify(labeledData, null, 2, 100)
          )
        }
      })
    })
  })

} catch (error) {
  console.error(error)
  console.log('data is not found')
}