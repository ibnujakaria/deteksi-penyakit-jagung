/**
 * This file will read inside directory /images/penyakit-jagung
 * then will generate randomly sets of labeled data
 * for training and testing
 *
 * The result will be saved on /dist directory
 */

let beautify = require("json-beautify")
let fs = require('fs')
let rootPath = './images/penyakit-jagung'

let images = []

let labels = fs.readdirSync(rootPath)

labels.forEach(label => {
  let _images = fs.readdirSync(`${rootPath}/${label}`)

  _images.forEach(path => {
    images.push({ path: `${label}/${path}`, label })
  })
})

let data = {
  training: [],
  testing: []
}

let trainingInPercent = 70
let nTraining = Math.floor(trainingInPercent / 100 * images.length)

for (let i = 0; i < nTraining; i++) {
  let index = Math.floor(Math.random() * Math.floor(images.length))

  data.training.push(images.splice(index, 1)[0])
}

// the rest of images variable is for testing data
let nTesting = images.length
// replicate it so it doesn't affect the for
let imagesForTesting = [ ...images ]

for (let i = 0; i < images.length; i++) {
  let index = Math.floor(Math.random() * Math.floor(imagesForTesting.length))

  data.testing.push(imagesForTesting.splice(index, 1)[0])
}

fs.writeFileSync('./dist/labeled-data.json', beautify(data, null, 2, 100))

console.log('panjang training -> ' + data.training.length)
console.log('panjang testing -> ' + data.testing.length)
console.log('data output -> /dist/labeled-data.json')