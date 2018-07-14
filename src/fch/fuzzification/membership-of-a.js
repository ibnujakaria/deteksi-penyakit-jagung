let Triangular = require('../membership/triangular.js')

let triangular = new Triangular({
  min: -86.1813,
  max: 98.2352,
  triangulars: [
    {
      label: 'green',
      a: -130,
      b: -86.1813,
      c: -30
    },
    {
      label: 'greenish',
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
      label: 'reddish',
      a: 0,
      b: 40,
      c: 80
    },
    {
      label: 'red',
      a: 40,
      b: 98.2352,
      c: 130
    }
  ]
})

exports.val = (a) => triangular.membership(a)