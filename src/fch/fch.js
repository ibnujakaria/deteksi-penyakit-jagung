let RgbToLinguisticColor = require('./rgb-to-linguistic-color.js')

let linguisticColor = RgbToLinguisticColor.convert({
  r: 155,
  g: 155,
  b: 155
})

console.log(linguisticColor)