let fs = require('fs')

let extractedData = JSON.parse(fs.readFileSync('./dist/extracted-data.json'))

// console.log(extractedData.data[0])

exports.findFeature = (path) => {
  let result = null

  extractedData.data.forEach(label => {
    label.images.forEach(image => {
      if (image.path === path) {
        result = image
      }
    })
  })

  return result
}