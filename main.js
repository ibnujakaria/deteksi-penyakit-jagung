let Jimp = require('jimp')
let GLRLM = require('./src/glrlm/glrlm.js')
let jimpToPixels = require('./src/prepare/from-jimp-to-pixels.js')
let shortRunEmphasis = require('./src/glrlm/short-run-emphasis.js')
let longRunEmphasis = require('./src/glrlm/long-run-emphasis.js')
let greyLevelNonUniformity = require('./src/glrlm/grey-level-non-uniformity.js')
let runPercentage = require('./src/glrlm/run-percentage.js')

Jimp.read('./images/resized-removeobjects.jpg').then(image => {
  let pixels = jimpToPixels.getGreyscale(image)

  let glrlm = new GLRLM(pixels)

  glrlm.buildMatrix()

  let sre = shortRunEmphasis.compute(glrlm)
  let lre = longRunEmphasis.compute(glrlm)
  let gln = greyLevelNonUniformity.compute(glrlm)
  let rp = runPercentage.compute(glrlm)

  console.log(`SRE: ${sre}`)
  console.log(`LRE: ${lre}`)
  console.log(`GLN: ${gln}`)
  console.log(`RP: ${rp}`)
})