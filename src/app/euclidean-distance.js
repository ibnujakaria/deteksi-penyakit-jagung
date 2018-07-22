exports.measure = (dataset1, dataset2) => {
  let distance = 0

  if (dataset1.length !== dataset2.length) {
    throw 'Two both data should have the same length'
  }

  dataset1.forEach((data1, i) => {
    let data2 = dataset2[i]

    distance += Math.pow(data1 - data2, 2)
  })

  distance = Math.sqrt(distance)

  return Math.abs(distance)
}