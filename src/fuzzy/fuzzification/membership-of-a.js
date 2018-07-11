let Triangular = require('../membership/triangular.js')

let triangular = new Triangular({
  min: -86.1813,
  max: 98.2352,
  triangulars: [
    {
      label: 'red',
      a: -130,
      b: -86.1813,
      c: -30
    },
    {
      label: 'reddish',
      a: -75,
      b: 40,
      c: 0
    },
    {
      label: 'amiddle',
      a: -10,
      b: 0,
      c: 10
    },
    {
      label: 'greenish',
      a: 0,
      b: 40,
      c: 80
    },
    {
      label: 'green',
      a: 40,
      b: 98.2352,
      c: 130
    }
  ]
})

console.log(triangular.membership(-50))
console.log(triangular.membership(-40))
console.log(triangular.membership(0))
console.log(triangular.membership(0.4))
console.log(triangular.membership(20))
console.log(triangular.membership(40))
console.log(triangular.membership(60))