let Triangular = require('../membership/triangular.js')

let triangular = new Triangular({
  min: 0,
  max: 100,
  triangulars: [
    {
      label: 'black',
      a: -40,
      b: 0,
      c: 40
    },
    {
      label: 'grey',
      a: 10,
      b: 50,
      c: 90
    },
    {
      label: 'white',
      a: 60,
      b: 100,
      c: 160
    }
  ]
})

console.log(triangular.membership(21))