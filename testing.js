let Jimp = require('jimp')
let Fch = require('./src/fch/fch.js')

Jimp.read('./images/removeobjects.jpg').then(image => {

  let fch = new Fch(image)

  console.log(fch.getHistogram())
  console.log(fch.getNormalizedHistogram())
})