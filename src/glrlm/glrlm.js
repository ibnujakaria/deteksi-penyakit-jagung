let Matrix = require('./matrix.js')
let jimpToPixels = require('../prepare/from-jimp-to-pixels.js')
let shortRunEmphasis = require('./short-run-emphasis.js')
let longRunEmphasis = require('./long-run-emphasis.js')
let greyLevelNonUniformity = require('./grey-level-non-uniformity.js')
let runLengthNonUniformity = require('./run-length-non-uniformity.js')
let runPercentage = require('./run-percentage.js')
let lowGreyLevelRunEmphasis = require('./low-grey-level-run-emphasis.js')
let highGreyLevelRunEmphasis = require('./high-grey-level-run-emphasis.js')

module.exports = class Glrlm {

  /**
   * @param image: instance of Jimp image
   */
  constructor (image) {
    this.image = image
    this.pixels = jimpToPixels.getGreyscale(image)
    this.matrix = new Matrix(this.pixels)

    this.buildMatrix()
  }

  buildMatrix () {
    this.matrix.buildMatrix()
  }

  getFeatures () {
    let features = {
      sre: shortRunEmphasis.compute(this.matrix),
      lre: longRunEmphasis.compute(this.matrix),
      gln: greyLevelNonUniformity.compute(this.matrix),
      rln: runLengthNonUniformity.compute(this.matrix),
      rp: runPercentage.compute(this.matrix),
      lglre: lowGreyLevelRunEmphasis.compute(this.matrix),
      hglre: highGreyLevelRunEmphasis.compute(this.matrix)
    }

    return features
  }
}