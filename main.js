let Jimp = require('jimp')
let GLRLM = require('./src/glrlm/glrlm.js')
let jimpToPixels = require('./src/prepare/from-jimp-to-pixels.js')
let shortRunEmphasis = require('./src/glrlm/short-run-emphasis.js')

Jimp.read('./images/resized-removeobjects.jpg').then(image => {
  let pixels = jimpToPixels.getGreyscale(image)

  let glrlm = new GLRLM(pixels)

  glrlm.buildMatrix()

  let sre = shortRunEmphasis.compute(glrlm)

  console.log(sre)
})