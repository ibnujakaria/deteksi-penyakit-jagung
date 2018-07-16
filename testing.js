let Jimp = require('jimp')
let Fch = require('./src/fch/fch.js')
let Glrlm = require('./src/glrlm/glrlm.js')

Jimp.read('./images/50x50.jpg').then(image => {

  let fch = new Fch(image)

  console.log(fch.getHistogram())
  // console.log(fch.getNormalizedHistogram())

  let glrlm = new Glrlm(image)

  console.log(glrlm.getFeatures())
})