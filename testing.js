let rgbToCielab = require('./src/prepare/rgb-to-cielab')

console.log(rgbToCielab.convert({ r: 100, g: 100, b: 100 }))