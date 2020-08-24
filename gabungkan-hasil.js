let fs = require('fs-extra')
let measurement = require('./src/app/measurement.js')
let beautify = require("json-beautify")

let features = fs.readdirSync('./dist/partial-results')
let results = {} // ini untuk nyimpan semua hasil
let classifier = 'knn' // ini tak paten pake knn

features.forEach(feature => {
  let folds = fs.readdirSync(`./dist/partial-results/${feature}`)

  results[feature] = { [classifier]: {} }

  let fold10SimpanTaruhBelakang = null
  folds.forEach(fold => {
    let file = JSON.parse(fs.readFileSync(`./dist/partial-results/${feature}/${fold}`))
    let attr = fold.split('.')[0].split('-')

    if (attr[1].length < 2) {
      attr[1] = `0${attr[1]}`
    }
    
    attr = attr.join('-')

    if (attr === 'fold-10') {
      fold10SimpanTaruhBelakang = file
    } else {
      results[feature][classifier][attr] = file
    }
  })

  results[feature][classifier]['fold-10'] = fold10SimpanTaruhBelakang
  
  results[feature][classifier] = {
    overview: measurement.getBestAccuracy(results[feature][classifier]),
    ...results[feature][classifier]
  }
  
  results[feature] = {
    overview: measurement.getBestAccuracy(results[feature]),
    ...results[feature]
  }
})

results = { overview: measurement.getBestAccuracy(results), ...results }

fs.writeFileSync('./dist/results.json', beautify(results, null, 2, 100))