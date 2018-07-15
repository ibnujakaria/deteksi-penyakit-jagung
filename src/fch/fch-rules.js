let Rule = require('./rule.js')

exports.build = ({ mL, mA, mB }) => {
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

  // additional for orange
  rules.push({
    when: new Rule()
    .is(mL, 'white').and().is(mA, 'reddish').and().is(mB, 'yellowish')
    .compare(),
    then: 'orange'
  })

  // additional for orange
  rules.push({
    when: new Rule()
    .is(mL, 'white').and().is(mA, 'red').and().is(mB, 'yellowish')
    .compare(),
    then: 'orange'
  })

  // additional for orange
  rules.push({
    when: new Rule()
    .is(mL, 'white').and().is(mA, 'reddish').and().is(mB, 'yellow')
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

  return rules
}