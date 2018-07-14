let Rule = require('./fuzzy-rule.js')
let membL = require('./fuzzification/membership-of-l.js')
let membA = require('./fuzzification/membership-of-a.js')
let membB = require('./fuzzification/membership-of-b.js')
let rgbToCielab = require('../prepare/rgb-to-cielab.js')

let rgb = {
  r: 50,
  g: 255,
  b: 0
}

let {l, a, b} = rgbToCielab.convert(rgb)

let mL = membL.val(l)
let mA = membA.val(a)
let mB = membB.val(b)

console.log({ l, a, b })
console.log({ mL, mA, mB })

let rules = []

// rule 1
rules.push({
  when: new Rule()
          .is(mL, 'black').and().is(mA, 'amiddle').and().is(mB, 'bmiddle')
          .compare(),
  then: 'black'
})

// rule 2
rules.push({
  when: new Rule()
          .is(mL, 'black').and().is(mB, 'bluish')
          .compare(),
  then: 'blue'
})


// rule 3
rules.push({
  when: new Rule()
          .is(mL, 'grey').and().isNot(mA, 'green').and().is(mB, 'blue')
          .compare(),
  then: 'blue'
})

// rule 4
rules.push({
  when: new Rule()
          .is(mL, 'white').and().is(mA, 'amiddle').and().is(mB, 'bluish')
          .compare(),
  then: 'blue'
})

// rule 5
rules.push({
  when: new Rule()
          .is(mL, 'white').and().is(mA, 'greenish').and().is(mB, 'bluish')
          .compare(),
  then: 'blue'
})

// rule 6
rules.push({
  when: new Rule()
          .is(mL, 'black').and().is(mA, 'reddish').and().is(mB, 'blue')
          .compare(),
  then: 'navy'
})

// rule 7
rules.push({
  when: new Rule()
          .is(mL, 'grey').and().is(mA, 'red').and().isNot(mB, 'blue')
          .compare(),
  then: 'red'
})


// rule 8
rules.push({
  when: new Rule()
          .is(mL, 'grey').and().is(mA, 'reddish').and().is(mB, 'bmiddle')
          .compare(),
  then: 'red'
})


// rule 9
rules.push({
  when: new Rule()
          .is(mL, 'black').and().is(mA, 'reddish').and().is(mB, 'yellowish')
          .compare(),
  then: 'red'
})

// rule 10
rules.push({
  when: new Rule()
          .is(mL, 'grey').and().is(mA, 'reddish').and().is(mB, 'yellow')
          .compare(),
  then: 'yellow'
})

// rule 11
rules.push({
  when: new Rule()
          .is(mL, 'white').and().is(mA, 'amiddle').and().is(mB, 'yellow')
          .compare(),
  then: 'yellow'
})

// rule 12
rules.push({
  when: new Rule()
          .is(mL, 'white').and().is(mA, 'greenish').and().is(mB, 'yellow')
          .compare(),
  then: 'yellow'
})

// rule 13
rules.push({
  when: new Rule()
          .is(mL, 'grey').and().is(mA, 'reddish').and().is(mB, 'bluish')
          .compare(),
  then: 'magenta'
})

// rule 14
rules.push({
  when: new Rule()
          .is(mL, 'white').and().is(mA, 'reddish').and().is(mB, 'bluish')
          .compare(),
  then: 'magenta'
})

// rule 15
rules.push({
  when: new Rule()
          .is(mL, 'grey').and().is(mA, 'amiddle').and().is(mB, 'yellowish')
          .compare(),
  then: 'brown'
})

// rule 16
rules.push({
  when: new Rule()
          .is(mL, 'white').and().is(mA, 'reddish').and().is(mB, 'yellow')
          .compare(),
  then: 'brown'
})

// rule 17
rules.push({
  when: new Rule()
          .is(mL, 'grey').and().is(mA, 'amiddle').and().is(mB, 'bmiddle')
          .compare(),
  then: 'grey'
})

// rule 18
rules.push({
  when: new Rule()
          .is(mL, 'grey').and().is(mA, 'greenish').and().is(mB, 'yellow')
          .compare(),
  then: 'green'
})

// rule 19
rules.push({
  when: new Rule()
          .is(mL, 'white').and().is(mA, 'green').and().is(mB, 'yellowish')
          .compare(),
  then: 'green'
})

// additional rule
rules.push({
  when: new Rule()
          .is(mL, 'white').and().is(mA, 'green').and().is(mB, 'yellow')
          .compare(),
  then: 'green'
})

// rule 20
rules.push({
  when: new Rule()
          .is(mL, 'grey').and().is(mA, 'greenish').and().is(mB, 'bmiddle')
          .compare(),
  then: 'teal'
})

// rule 21
rules.push({
  when: new Rule()
          .is(mL, 'grey').and().is(mA, 'green').and().is(mB, 'blue')
          .compare(),
  then: 'violet'
})

// rule 22
rules.push({
  when: new Rule()
          .is(mL, 'white').and().is(mA, 'red').and().is(mB, 'yellow')
          .compare(),
  then: 'orange'
})

// rule 23
rules.push({
  when: new Rule()
          .is(mL, 'white').and().is(mA, 'reddish').and().is(mB, 'bmiddle')
          .compare(),
  then: 'pink'
})

// rule 24
rules.push({
  when: new Rule()
          .is(mL, 'white').and().is(mA, 'amiddle').and().is(mB, 'bmiddle')
          .compare(),
  then: 'white'
})

// rule 25
rules.push({
  when: new Rule()
          .is(mL, 'white').and().is(mA, 'greenish').and().is(mB, 'bmiddle')
          .compare(),
  then: 'cyan'
})

// rule 26
rules.push({
  when: new Rule()
          .is(mL, 'white').and().is(mA, 'green').and().is(mB, 'bluish')
          .compare(),
  then: 'cyan'
})

console.log('\nResult:')
let i = 1
rules.forEach(rule => {
  if (rule.when.comparedResult) {
    console.log(`${i++}. ${rule.then} -> ${rule.when.comparedResult}`)
  }
})