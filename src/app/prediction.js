let fs = require('fs')
let ed = require('./euclidean-distance.js')

// image
let path = 'hawar-daun/17894438702_d8f5b644cd_o_2.jpg'
let inputImage = null
let inputFeature = null

// all data
let extractedData = JSON.parse(fs.readFileSync('dist/extracted-data.json'))

// ambil path yang sekarang ini featurenya (ndak usah extract manual deh, tinggal cari)
extractedData.data.forEach(label => {
  label.images.forEach(image => {
    if (image.path === path) {
      let color = Object.values(image.feature.color)
      let texture = Object.values(image.feature.texture)

      // inputFeature = color.concat(texture)
      inputFeature = texture
      inputImage = image
    }
  })
})

let distances = []

extractedData.data.forEach(label => {
  let distanceToCurrentLabel = 0

  label.images.forEach(image => {
    if (image.path !== path) {
      let color = Object.values(image.feature.color)
      let texture = Object.values(image.feature.texture)
      // let currentFeature = color.concat(texture)
      let currentFeature = texture

      distanceToCurrentLabel += ed.measure(currentFeature, inputFeature)
    }
  })

  distances.push({ label: label.label, distance: distanceToCurrentLabel / label.images.length })
})

let prediction = null
let minimumDistance = Number.MAX_SAFE_INTEGER

distances.forEach(distance => {
  if (distance.distance < minimumDistance) {
    minimumDistance = distance.distance
    prediction = distance
  }
})

console.log(distances)
console.log(`input      -> ${inputImage.label}`)
console.log(`prediction -> ${prediction.label}`)