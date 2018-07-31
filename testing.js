let fs = require('fs')
let measurement = require('./src/app/measurement.js')
let kFolds = fs.readdirSync('./dist/k-fold')
let beautify = require("json-beautify")

let results = {}

for (let usedFeature of ['color', 'texture', 'all']) {
  console.log(`[${usedFeature}]`)

  let result = {}

  for (let classifier of ['ed-classifier', 'knn', 'naive-bayes']) {
    console.log(`   -> ${classifier}`)
    kFolds.forEach(kFold => {
      if (result[classifier] === undefined) {
        result[classifier] = {}
      }

      result[classifier][kFold] = measurement.measure(kFold, usedFeature, classifier)
    })

    let overview = measurement.getBestAccuracy(result[classifier])
    result[classifier] = { overview, ...result[classifier] }
  }

  let overview = measurement.getBestAccuracy(result)
  result = { overview, ...result }

  results[usedFeature] = result
}

let overview = measurement.getBestAccuracy(results)
results = { overview, ...results }

fs.writeFileSync('./dist/results.json', beautify(results, null, 2, 100))
