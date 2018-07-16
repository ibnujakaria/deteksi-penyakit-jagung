exports.getRGB = (image) => {
  let pixels = []
  let lastY = 0
  let row = []

  image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
    let rgb = {
      r: image.bitmap.data[idx + 0],
      g: image.bitmap.data[idx + 1],
      b: image.bitmap.data[idx + 2],
    }
    // console.log({x, y, rgb})

    if (y > lastY) {
      pixels.push(row)
      row = []
      lastY++
    } else {
      row.push(rgb)
    }
  })

  return pixels
}

exports.getGreyscale = (image) => {
  let pixels = []
  let lastY = 0
  let row = []

  image.greyscale()

  image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
    let color = image.bitmap.data[idx + 0]

    if (y > lastY) {
      pixels.push(row)
      row = []
      lastY++
    } else {
      row.push(color)
    }
  })

  return pixels
}