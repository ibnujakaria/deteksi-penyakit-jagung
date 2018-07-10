let rgbToXyz = require('./src/prepare/rgb-to-xyz.js')

console.log(rgbToXyz.convert({ r: 100, g: 100, b: 100 }))