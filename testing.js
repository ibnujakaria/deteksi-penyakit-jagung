let fs = require('fs')
let measurement = require('./src/app/measurement.js')
let kFolds = fs.readdirSync('./dist/k-fold')

for (let usedFeature of ['color', 'texture', 'all']) {
  console.log(`[${usedFeature}]`)
  for (let classifier of ['ed-classifier', 'knn', 'naive-bayes']) {
    console.log(`   -> ${classifier}`)
    kFolds.forEach(kFold => {
      let result = measurement.measure(kFold, usedFeature, classifier)
    })
  }
}
