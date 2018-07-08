exports.compute = (glrlm) => {
  let matrix = glrlm.matrix
  let rp = 0
  let n = matrix.rows.length * matrix.columns.length
  // do a looping for every row
  matrix.rows.forEach(row => {
    // do a looping for every column, start from 1
    let length = 1

    row.forEach(col => {
      if (col > 0) {
        let colMultipliedByLength = (col * length++)

        rp += n / colMultipliedByLength
      }
    })
  })

  return rp
}