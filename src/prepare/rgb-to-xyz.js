exports.convert = ({ r, g, b }) => {
  let x, y, z

  r = r / 255
  g = g / 255
  b = b / 255
  
  r = Math.pow(r, 2.19921875)
  g = Math.pow(g, 2.19921875)
  b = Math.pow(b, 2.19921875)

  r = r * 100
  g = g * 100
  b = b * 100

  x = r * 0.57667 + g * 0.18556 + b * 0.18823
  y = r * 0.29734 + g * 0.62736 + b * 0.07529
  z = r * 0.02703 + g * 0.07069 + b * 0.99134

  return { x, y, z }
}