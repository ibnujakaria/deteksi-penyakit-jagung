exports.compute = (glrlm) => {
  let matrix = glrlm.matrix
  let rln = 0
  let n = matrix.rows.length * matrix.columns.length
  
  // x for column, y for row
  for (let x = 0; x < matrix.columns.length; x++) {

    let sumOfRowFromTopToBottom = 0;

    for (let y = 0; y < matrix.rows.length; y++) {
      sumOfRowFromTopToBottom += matrix.rows[y][x]
    }

    rln += Math.pow(sumOfRowFromTopToBottom, 2)
  }

  return rln / n
}