/**
 * This file will read inside directory /images/penyakit-jagung
 * then will generate randomly sets of labeled data
 * for training and testing
 *
 * The result will be saved on /dist directory
 */

let beautify = require("json-beautify")
let fs = require('fs-extra')
let rootPath = './images/penyakit-jagung'

let data = []

let labels = fs.readdirSync(rootPath)

labels.forEach(label => {
  let _images = fs.readdirSync(`${rootPath}/${label}`)
  let images = []

  _images.forEach((path, no) => {
    images.push({ no, path: `${label}/${path}`, label })
  })

  data.push({ label, images })
})

fs.writeFileSync('./dist/labeled-data.json', beautify(data, null, 2, 100))

// k-fold cross validation
let k = 4

let slicedData = []

data.forEach(row => {
  let lengthPerPartial = Math.floor(row.images.length / k)
  let partials = []

  for (let i = 0; i < k; i++) {
    partials.push(row.images.splice(0, lengthPerPartial))
  }

  // if there is  anything left
  if (row.images.length) {
    partials[partials.length - 1] = partials[partials.length - 1].concat(row.images)
  }

  slicedData.push(partials)
})

fs.writeFileSync('./dist/labeled-data-sliced.json', beautify(slicedData, null, 2, 100))
console.log('data output -> /dist/labeled-data-sliced.json')

// generate training and testing data based on the k
fs.removeSync('./dist/k-fold')
fs.mkdirSync('./dist/k-fold')
for (let i = 0; i < k; i++) {
  let training = []
  let testing = []

  slicedData.forEach(data => {
    data.forEach((images, j) => {
      images.forEach(image => {
        if (i === j) {
          testing.push(image)
        } else {
          training.push(image)
        }
      })

    })
  })

  fs.writeFileSync(`./dist/k-fold/data-${i + 1}.json`, beautify({ training, testing }, null, 2, 100))
  console.log(`data output -> /dist/k-fold/data-${i + 1}.json`)
}