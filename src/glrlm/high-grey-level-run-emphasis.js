exports.compute = (glrlm) => {
  let matrix = glrlm.matrix
  let hglre = 0
  let n = matrix.rows.length * matrix.columns.length

  let i = 0
  // do a looping for every row
  matrix.rows.forEach(row => {
    // do a looping for every column, start from 1
    row.forEach(col => {
      let colMultipledByPoweredI = col * Math.pow(i, 2)

      if (!isNaN(colMultipledByPoweredI) && colMultipledByPoweredI !== Infinity) {
        hglre += colMultipledByPoweredI
      }
    })

    i++
  })

  return hglre / n
}