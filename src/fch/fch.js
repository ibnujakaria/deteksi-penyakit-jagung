var JimpToPixels = require('../prepare/from-jimp-to-pixels.js')
var RgbToLinguisticColor = require('./rgb-to-linguistic-color.js')

module.exports = class Fch {

  /**
   * @param image: instance of Jimp image
   */
  constructor (image) {
    this.image = image
    this.rgbPixels = JimpToPixels.getRGB(this.image)
    
    this.histogram = {
      black: 0, blue: 0, brown: 0, cyan: 0, magenta: 0,
      grey: 0, navy: 0, green: 0, orange: 0, pink: 0,
      red: 0, teal: 0, violet: 0, white: 0, yellow: 0
    }
    this.normalizedHistogram = { ...this.histogram }

    this.buildHistogram()
    this.buildNormalizedHistogram()
  }

  buildHistogram () {
    this.rgbPixels.forEach(row => {
      row.forEach(rgb => {
        let linguisticColor = RgbToLinguisticColor.convert(rgb).then

        if (linguisticColor) {
          this.histogram[linguisticColor]++
        }
      })
    })
  }

  buildNormalizedHistogram () {
    let nPixels = this.rgbPixels.length * this.rgbPixels[0].length

    for (let linguisticColor in this.histogram) {
      this.normalizedHistogram[linguisticColor] = this.histogram[linguisticColor] / nPixels * 100
    }
  }

  getHistogram () {
    return this.histogram
  }

  getNormalizedHistogram () {
    return this.normalizedHistogram
  }
}