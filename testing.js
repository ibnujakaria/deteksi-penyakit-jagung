let fs = require('fs')
let featureFinder = require('./src/app/find-feature-by-path.js')
// let prediction = require('./src/app/prediction.js')
let prediction = require('./src/app/prediction-knn.js')

let kFolds = fs.readdirSync('./dist/k-fold')

let correct = 0
let incorrect = 0
let length = 0

kFolds.forEach((file, i) => {
  // console.log(`k-fold ${i}`)
  // console.log('------------------')

  let data = JSON.parse(fs.readFileSync(`./dist/k-fold/${file}`))

  let trainingFeatures = []
  let testingFeatures = []

  data.training.forEach(image => {
    trainingFeatures.push(featureFinder.findFeature(image.path))
  })

  data.testing.forEach(image => {
    testingFeatures.push(featureFinder.findFeature(image.path))
  })

  testingFeatures.forEach(image => {
    if (prediction.predict(image, trainingFeatures)) {
      correct++
    } else {
      incorrect++
    }
    length++
  })
})

let accuracy = (correct / length * 100).toFixed(2)

console.log(`correct -> ${correct}`)
// console.log(`incorrect -> ${incorrect}`)
console.log(`length -> ${length}`)

console.log(`accuracy -> ${accuracy}%`)