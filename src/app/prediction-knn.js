let fs = require('fs')
let knn = require('alike')

let defaultOptions = {
  k: 2,
  feature: 'all' // all|texture|color
}

/**
 * @param {object} inputImage
 * The object inputImage is an object with all features extracted
 * @param {array} datasets
 * Array of images with all features extracted, or we can call it as training data
 */
exports.predict = (inputImage, datasets, customOptions) => {
  let options = { ...defaultOptions, ...customOptions }
  let datasetFeatures = []
  let inputFeatures

  if (options.feature === 'all') {
    inputFeatures = { ...inputImage.feature.color, ...inputImage.feature.texture }
  } else if (options.feature === 'texture') {
    inputFeatures = { ...inputImage.feature.texture }
  } else if (options.feature === 'color') {
    inputFeatures = { ...inputImage.feature.color }
  } else {
    throw 'Unknown parameter of options.feature'
  }

  datasets.forEach(image => {
    let features

    if (options.feature === 'all') {
      features = { ...image.feature.color, ...image.feature.texture }
    } else if (options.feature === 'texture') {
      features = { ...image.feature.texture }
    } else if (options.feature === 'color') {
      features = { ...image.feature.color }
    } else {
      throw 'Unknown parameter of options.feature'
    }

    datasetFeatures.push({ label: image.label, features })
  })

  let closestsNeighbours = knn(inputFeatures, datasetFeatures, {
    k: options.k,
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
  
  /**
   * @type array
   * @description
   * it is an array for the most appeared label
   * normally, this variable will only have one label
   * 
   * but it will have more if there are more than one 
   * label which have the same value of appearence in 
   * variable closestsNeighbours
   */
  let mostAppearedLabels = []
  
  for (let label in neighbourLabels) {
    if (neighbourLabels[label] === max) {
      mostAppearedLabels.push(label)
    }
  }

  // console.log({ neighbourLabels, mostAppearedLabels })

  /* If there is only one label */
  if (mostAppearedLabels.length === 1) {
    return mostAppearedLabels[0]
  }

  /** 
   * It it has more than one label, then return the very first label
   * appeared in closestsNeighbours
   */

   closestsNeighbours.forEach(neighbour => {
    return mostAppearedLabels.find(label => label === neighbour.label)
   })
}