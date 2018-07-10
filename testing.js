let rgbToXyz = require('./src/prepare/rgb-to-xyz.js')
let xyzToLab = require('./src/prepare/xyz-to-cielab.js')

console.log(rgbToXyz.convert({ r: 100, g: 100, b: 100 }))
console.log(xyzToLab.convert({ x: 1, y: 1, z: 1 }))