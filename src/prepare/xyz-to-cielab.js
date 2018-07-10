exports.convert = ({ x, y, z }) => {
  let xRef = 95.047  
  let yRef = 100.000
  let zRef = 108.883

  let l, a, b

  x = x / xRef
  y = y / yRef
  z = z / zRef

  if (x > 0.008856) {
    x = Math.pow(x, 1 / 3)
  } else {
    x = ( 7.787 * x ) + ( 16 / 116)
  }

  if (y > 0.008856) {
    y = Math.pow(y, 1 / 3)
  } else {
    y = ( 7.787 * y ) + ( 16 / 116)
  }

  if (z > 0.008856) {
    z = Math.pow(z, 1 / 3)
  } else {
    z = ( 7.787 * z ) + ( 16 / 116)
  }

  l = ( 116 * y ) - 16
  a = 500 * ( x - y )
  b = 200 * ( y - z )

  return { l, a, b }
}