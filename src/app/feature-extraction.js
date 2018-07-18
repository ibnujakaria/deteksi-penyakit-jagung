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
  let data = JSON.parse(rawData)
  let keys = ['training', 'testing']
  let result = {
    training: [],
    testing: []
  }

  keys.forEach(key => {

    data[key].forEach(raw => {
      Jimp.read(`./images/penyakit-jagung/${raw.path}`).then(image => {
        console.log(`training ${raw.path}`)

        // console.log('   -> running fch..')
        let fch = new Fch(image)
        let color = fch.getNormalizedHistogram()

        // console.log('   -> running glrlm')
        let glrlm = new Glrlm(image)
        let texture = glrlm.getFeatures()

        result[key].push({ raw, color, texture })

        if (result[key].length === data[key].length) {
          console.log('data terakhir')
          console.log(`tulis hasil ke file /dist/extracted-feature-for-data-${key}.json`)

          fs.writeFileSync(
            `./dist/extracted-feature-for-data-${key}.json`, beautify(result[key], null, 2, 100)
          )
        }
      })
    })
  })
} catch (error) {
  console.error(error)
  console.log('data is not found')
}