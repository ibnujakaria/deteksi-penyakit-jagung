exports.compute = (glrlm) => {
  let matrix = glrlm.matrix
  let gln = 0
  let n = matrix.rows.length * matrix.columns.length
  // do a looping for every row
  matrix.rows.forEach(row => {
    // do a looping for every column, start from 1
    let resultPerRow = 0

    row.forEach(col => {
      resultPerRow += col
    })

    gln += Math.pow(resultPerRow, 2)
  })

  return gln / n
}