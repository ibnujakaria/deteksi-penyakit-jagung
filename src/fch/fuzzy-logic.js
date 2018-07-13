let Rule = require('./fuzzy-rule.js')
let membershipOfL = require('./fuzzification/membership-of-l.js')
let membershipOfA = require('./fuzzification/membership-of-a.js')
let membershipOfB = require('./fuzzification/membership-of-b.js')

let l = 30
let a = 100
let b = -60

let rules = []

rules.push({
  rule: new Rule()
          .is(membershipOfL.membership(l), 'black')
          .and()
          .is(membershipOfA.membership(a), 'amiddle')
          .and()
          .is(membershipOfB.membership(b), 'bmiddle')
          .compare(),
  then: 'black'
})

rules.push({
  rule: new Rule()
          .is(membershipOfL.membership(l), 'black')
          .and()
          .is(membershipOfB.membership(b), 'bluish')
          .compare(),
  then: 'blue'
})


rules.push({
  rule: new Rule()
          .is(membershipOfL.membership(l), 'grey')
          .and()
          .isNot(membershipOfA.membership(a), 'green')
          .and()
          .is(membershipOfB.membership(b), 'blue')
          .compare(),
  then: 'blue'
})