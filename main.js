let Jimp = require('jimp')
let GLRLM = require('./src/glrlm.js')
let jimpToPixels = require('./src/prepare/from-jimp-to-pixels.js')

Jimp.read('./images/resized-removeobjects.jpg').then(image => {
  let pixels = jimpToPixels.getGreyscale(image)

  let glrlm = new GLRLM(pixels)

  glrlm.buildMatrix()

  // console.log(glrlm.matrix.rows[0])
})