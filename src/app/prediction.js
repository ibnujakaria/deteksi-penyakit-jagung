let fs = require('fs')
let ed = require('./euclidean-distance.js')

/**
 * @param {object} inputImage
 * The object inputImage is an object with all features extracted
 * @param {array} datasets
 * Array of images with all features extracted, or we can call it as training data
 */
exports.predict = (inputImage, datasets) => {
  let distances = []
  let inputFeatures = Object.values(inputImage.feature.color).concat(Object.values(inputImage.feature.texture))
  // let inputFeatures = Object.values(inputImage.feature.texture)
  // let inputFeatures = Object.values(inputImage.feature.color)

  let lastLabel = null
  let currentLabelLength = 1
  let distanceToCurrentLabel = 0

  datasets.forEach((image, i) => {
    if (lastLabel !== image.label) {
      lastLabel = image.label
      currentLabelLength = 1
      distanceToCurrentLabel = 0
    } else if (datasets[i + 1] && datasets[i + 1].label !== image.label || !datasets[i + 1]) {
      // console.log(`${image.label} -> ${currentLabelLength} gambar`)
      distances.push({ label: image.label, distance: distanceToCurrentLabel / currentLabelLength })
    } else {
      currentLabelLength++

      let currentFeatures = Object.values(image.feature.color).concat(Object.values(image.feature.texture))
      // let currentFeatures = Object.values(image.feature.texture)
      // let currentFeatures = Object.values(image.feature.color)
      distanceToCurrentLabel += ed.measure(inputFeatures, currentFeatures)
    }

  })



  let prediction = null
  let minimumDistance = Number.MAX_SAFE_INTEGER

  distances.forEach(distance => {
    if (distance.distance < minimumDistance) {
      minimumDistance = distance.distance
      prediction = distance
    }
  })

  // console.log(distances)
  // console.log(`${inputImage.label} === ${prediction.label} -> ${inputImage.label === prediction.label}`)
  // console.log('---------------')

  if (!prediction) {
    return false
  }

  return inputImage.label === prediction.label
}