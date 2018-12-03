let fs = require('fs')
let featureFinder = require('./find-feature-by-path.js')
let edClassifier = require('./prediction-ed-classifier.js')
let knnClassifier = require('./prediction-knn.js')

/**
 * This module is used to measure accuracy from data which have
 * been separated
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

    for (let k = 1; k <= 20; k++) {
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
  let details = {} // ini untuk confulsive matrices atau apalah itu namanya

  files.forEach((file, i) => {
    let data = JSON.parse(fs.readFileSync(`./dist/k-fold/${kFold}/${file}`))
    let { trainingFeatures, testingFeatures } = getFeatures(data)

    testingFeatures.forEach(image => {
      let options = {
        feature: usedFeature,
        k
      }

      let isWellPredicted = false
      let predictedLabel = null

      if (classifier === 'ed-classifier') {
        predictedLabel = edClassifier.predict(image, trainingFeatures, options)
        isWellPredicted = predictedLabel === image.label
      } else if (classifier === 'knn') {
        predictedLabel = knnClassifier.predict(image, trainingFeatures, options)
        isWellPredicted = predictedLabel === image.label
      }

      if (!details[image.label]) {
        details[image.label] = {}
      }

      if (details[image.label][predictedLabel] === undefined) {
        details[image.label][predictedLabel] = 1
      } else {
        details[image.label][predictedLabel]++
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

  return { correct, incorrect, length, accuracy, details }
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