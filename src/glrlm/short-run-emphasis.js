exports.compute = (glrlm) => {
  let matrix = glrlm.matrix
  let sre = 0
  let n = matrix.rows.length * matrix.columns.length
  // do a looping for every row
  matrix.rows.forEach(row => {
    // do a looping for every column, start from 1
    let length = 1

    row.forEach(col => {
      sre += col / Math.pow(length++, 2)
    })
  })

  return sre / n
}