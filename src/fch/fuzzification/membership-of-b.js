let Triangular = require('../membership/triangular.js')

let triangular = new Triangular({
  min: -107.8617,
  max: 94.4758,
  triangulars: [
    {
      label: 'blue',
      a: -150,
      b: -100,
      c: -48
    },
    {
      label: 'bluish',
      a: -88,
      b: -55,
      c: -0
    },
    {
      label: 'bmiddle',
      a: -10,
      b: 0,
      c: 10
    },
    {
      label: 'yellowish',
      a: 0,
      b: 48,
      c: 78
    },
    {
      label: 'yellow',
      a: 38,
      b: 94.4758,
      c: 130
    }
  ]
})

exports.membership = (b) => triangular.membership(b)