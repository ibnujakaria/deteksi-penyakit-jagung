let membL = require('./fuzzification/membership-of-l.js')
let membA = require('./fuzzification/membership-of-a.js')
let membB = require('./fuzzification/membership-of-b.js')
let rgbToCielab = require('../prepare/rgb-to-cielab.js')
let FuzzyLogic = require('./logic.js')
let FchRules = require('./fch-rules.js')

/**
 * @param: { r, g, b }
 */
exports.convert = (rgb) => {
  let { l, a, b } = rgbToCielab.convert(rgb)

  let mL = membL.val(l)
  let mA = membA.val(a)
  let mB = membB.val(b)

  let fchRules = FchRules.build({ mL, mA, mB }) 
  let fuzzyLogic = new FuzzyLogic(fchRules)

  // console.log(rgb)
  // console.log({ l, a, b })
  // console.log({ mL, mA, mB })

  let result = fuzzyLogic.getFuzzyResult()

  return { ...result, fuzzySet: { mL, mA, mB } }
}