let fs = require('fs-extra')
let measurement = require('./src/app/measurement.js')
let beautify = require("json-beautify")

let params = process.argv
let feature = params.find(arg => arg.match(/feature\=/g))
let fold = params.find(arg => arg.match(/fold\=/g))
let neighbour = params.find(arg => arg.match(/neighbour\=/g))

feature = feature ? feature.split('=')[1] : null
fold = fold ? parseInt(fold.split('=')[1]) : null

if (!feature || !fold) throw 'Parameter tidak lengkap.'

console.log(`[${feature}]`)

let result = {}
let classifier = 'knn' // pasti knn

result = measurement.measure(`k-${fold}`, feature, classifier)

if (!fs.existsSync(`./dist/partial-results`)) {
  fs.mkdirSync(`./dist/partial-results/`)
}

if (!fs.existsSync(`./dist/partial-results/${feature}`)) {
  fs.mkdirSync(`./dist/partial-results/${feature}`)
}


fs.writeFileSync(`./dist/partial-results/${feature}/fold-${fold}.json`, beautify(result, null, 2, 100))
