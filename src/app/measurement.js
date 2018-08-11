let fs = require('fs')
let featureFinder = require('./find-feature-by-path.js')
let edClassifier = require('./prediction-ed-classifier.js')
let knnClassifier = require('./prediction-knn.js')

/**
 * This module is used to measure accuracy from data which have
 * been separated before
 *
 * @param kFold | the folder name inside /dist/k-fold
 * @param usedFeature | {all|texture|color}
 * @param classifier | {ed-classifier|knn|naive-bayes}
 */
exports.measure = (kFold, usedFeature, classifier) => {
  let files = fs.readdirSync(`./dist/k-fold/${kFold}`) 

  console.log(`      + kFold k: ${kFold}`)
  if (classifier === 'knn') {
    let result = {}
    let sameResult = 1

    for (let k = 1; k <= 50; k++) {
      let measurement = getAccuracy(files, {
        kFold, usedFeature, classifier, k
      })

      result[`neighbour-${k}`] = measurement

      console.log(`         * k-neighbour: ${k}`)

      // if it produced the same result three times then break
      if (k > 1 && measurement.accuracy === result[`neighbour-${k - 1}`].accuracy) {
        sameResult++
      } else {
        sameResult = 1
      }

      if (sameResult > 2) {
        break
      }
    }

    let overview = getBestAccuracy(result)

    result = { overview, ...result }

    return result
  } else {
    return getAccuracy(files, { kFold, usedFeature, classifier })
  }
}

function getAccuracy(files, { kFold, usedFeature, classifier, k }) {
  let correct = 0
  let incorrect = 0
  let length = 0

  files.forEach((file, i) => {
    let data = JSON.parse(fs.readFileSync(`./dist/k-fold/${kFold}/${file}`))
    let { trainingFeatures, testingFeatures } = getFeatures(data)

    testingFeatures.forEach(image => {
      let options = {
        feature: usedFeature,
        k
      }

      let isWellPredicted = false

      if (classifier === 'ed-classifier') {
        isWellPredicted = edClassifier.predict(image, trainingFeatures, options) === image.label
      } else if (classifier === 'knn') {
        isWellPredicted = knnClassifier.predict(image, trainingFeatures, options) === image.label
      }

      if (isWellPredicted) {
        correct++
      } else {
        incorrect++
      }
      length++
    })
  })

  let accuracy = correct / length * 100

  // // console.log(`correct -> ${correct}`)
  // // console.log(`length -> ${length}`)
  // console.log(`      accuracy -> ${accuracy}%`)

  // console.log('      ------------------')

  return { correct, incorrect, length, accuracy }
}

function getFeatures (data) {
  let trainingFeatures = []
  let testingFeatures = []

  data.training.forEach(image => {
    trainingFeatures.push(featureFinder.findFeature(image.path))
  })

  data.testing.forEach(image => {
    testingFeatures.push(featureFinder.findFeature(image.path))
  })

  return { trainingFeatures, testingFeatures }
}

function getBestAccuracy(object) {
  let bestAccuracy = -1
  let bestAttr = null

  for (let attr in object) {
    let accuracy = object[attr].accuracy

    if (accuracy === undefined && object[attr].overview) {
      accuracy = object[attr].overview.bestAccuracy
    }

    if (accuracy > bestAccuracy) {
      bestAccuracy = accuracy
      bestAttr = attr
    }
  }

  return { bestAttr, bestAccuracy }
}

exports.getBestAccuracy = getBestAccuracy