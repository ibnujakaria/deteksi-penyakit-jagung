let fs = require('fs')
let knn = require('alike')

/**
 * @param {object} inputImage
 * The object inputImage is an object with all features extracted
 * @param {array} datasets
 * Array of images with all features extracted, or we can call it as training data
 */
exports.predict = (inputImage, datasets) => {
  let inputFeatures = { ...inputImage.feature.color, ...inputImage.feature.texture }
  let datasetFeatures = []

  datasets.forEach(image => {
    datasetFeatures.push(
      {
        label: image.label,
        features: { ...image.feature.color, ...image.feature.texture  }
      }
    )
  })

  let closestsNeighbours = knn(inputFeatures, datasetFeatures, {
    k: 5,
    standardize: true,
    key: (object) => object.features
  })

  let neighbourLabels = {}

  closestsNeighbours.forEach(neighbour => {
    if (neighbourLabels[neighbour.label] === undefined) {
      neighbourLabels[neighbour.label] = 1
    } else {
      neighbourLabels[neighbour.label]++
    }
  })

  let max = 0

  for (let label in neighbourLabels) {
    if (neighbourLabels[label] > max) {
      max = neighbourLabels[label]
    }
  }
  
  // it is an array for dealing with the condition if
  // two or more labels has appeared the same time
  let mostAppearedLabels = []
  
  for (let label in neighbourLabels) {
    if (neighbourLabels[label] === max) {
      mostAppearedLabels.push(label)
    }
  }

  // console.log({ neighbourLabels, mostAppearedLabels })

  if (mostAppearedLabels.find(label => label === inputImage.label)) {
    return true
  }

  let i = Math.floor(Math.random() * Math.floor(mostAppearedLabels.length))

  return mostAppearedLabels[i] === inputImage.label
}