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
  let correct = 0
  let incorrect = 0
  let length = 0

  files.forEach((file, i) => {
    let data = JSON.parse(fs.readFileSync(`./dist/k-fold/${kFold}/${file}`))
    let { trainingFeatures, testingFeatures } = getFeatures(data)

    testingFeatures.forEach(image => {
      let options = {
        feature: usedFeature
      }

      let isWellPredicted = false

      if (classifier === 'ed-classifier') {
        isWellPredicted = edClassifier.predict(image, trainingFeatures, options)
      } else if (classifier === 'knn') {
        isWellPredicted = knnClassifier.predict(image, trainingFeatures, options)
      }

      if (isWellPredicted) {
        correct++
      } else {
        incorrect++
      }
      length++
    })
  })

  let accuracy = (correct / length * 100).toFixed(2)

  console.log(`      K-Fold dengan ${kFold}`)
  // console.log(`correct -> ${correct}`)
  // console.log(`length -> ${length}`)
  console.log(`      accuracy -> ${accuracy}%`)

  console.log('      ------------------')
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