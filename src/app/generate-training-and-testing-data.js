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


// k-fold cross validation
let kMax = 10

fs.removeSync('./dist/k-fold')
fs.mkdirSync('./dist/k-fold')

if (process.argv[2]) {
  kMax = parseInt(process.argv[2])
}

for (let k = 2; k <= kMax; k++) {
  let data = []
  let imagesLength = 0
  let labels = fs.readdirSync(rootPath)

  labels.forEach(label => {
    let _images = fs.readdirSync(`${rootPath}/${label}`)
    let images = []

    _images.forEach((path, no) => {
      images.push({ no, path: `${label}/${path}`, label })
      imagesLength++
    })

    data.push({ label, images })
  })

  fs.writeFileSync('./dist/labeled-data.json', beautify({ imagesLength, data }, null, 2, 100))
  
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

  fs.mkdirSync(`./dist/k-fold/k-${k}`)

  // generate training and testing data based on the k
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

    fs.writeFileSync(`./dist/k-fold/k-${k}/data-${i + 1}.json`, beautify({ training, testing }, null, 2, 100))
    console.log(`data output -> /dist/k-fold/k-${k}/data-${i + 1}.json`)
  }
}