module.exports = class Matrix {

  constructor (pixels) {
    this.pixels = pixels
    this.matrix = null
  }

  buildMatrix () {
    // this is going to be our matrix
    // the color of the image would be the attribute for this json object
    // and the value of each color is the length of that color
    let matrix = {}
    // this is the highest color to determine the hight of the real matrix
    let highestColor = 0


    // do a looping for each row of the pixels
    // this looping is only for 0 degree direction
    this.pixels.forEach(row => {
      // this variable is used to hold the lastColor of each pixel of a row
      let lastColor = null
      let lastLengthOfColor = 1

      // do a looping for every pixel of the row
      row.forEach(color => {
        // looking for how long this color is (in greyscale)
        // if this current color is different from the last one, and 
        // the last color is not null, then assign it to the matrix object
        if (color !== lastColor) {
          if (lastColor !== null) {
            if (matrix[lastColor] === undefined) {
              matrix[lastColor] = {
                [lastLengthOfColor]: 1
              }
            } else if (matrix[lastColor][lastLengthOfColor] === undefined) {
              matrix[lastColor][lastLengthOfColor] = 1
            } else {
              matrix[lastColor][lastLengthOfColor]++
            }
          }

          // check wheter this color is higher than the highestColor found befores
          if (color > highestColor) {
            highestColor = color
          }

          lastColor = color
          lastLengthOfColor = 1
        } else {
          // if current color is the same as the last one, then
          lastLengthOfColor++
        }
      })
    })

    // console.log(matrix[0])
    // console.log(`highest color: ${highestColor}`)

    // build the real matrix
    this.matrix = this.buildTheRealMatrix({ matrix, highestColor })
  }

  buildTheRealMatrix ({ matrix, highestColor }) {
    let realMatrix = {
      columns: [],
      rows: []
    }

    // determine the column 
    for (let i = 1; i <= this.pixels[0].length; i++) {
      realMatrix.columns.push(i)
    }

    for (let color = 0; color <= highestColor; color++) {
      let row = []

      realMatrix.columns.forEach(column => {
        let theLengthOfThisColor = matrix[color] ? matrix[color][column] : undefined

        if (theLengthOfThisColor === undefined) {
          theLengthOfThisColor = 0
        }

        row.push(theLengthOfThisColor)
      })

      realMatrix.rows.push(row)
    }

    return realMatrix
  }
}