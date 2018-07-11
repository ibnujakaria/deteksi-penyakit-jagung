let rgbToXyz = require('./rgb-to-xyz.js')
let xyzToLab = require('./xyz-to-cielab.js')

exports.convert = ({ r, g, b }) => {
  return xyzToLab.convert(rgbToXyz.convert({ r, g, b }))
}