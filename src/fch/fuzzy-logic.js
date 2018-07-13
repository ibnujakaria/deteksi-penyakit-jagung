let Rule = require('./fuzzy-rule.js')
let membershipOfL = require('./fuzzification/membership-of-l.js')
let membershipOfA = require('./fuzzification/membership-of-a.js')
let membershipOfB = require('./fuzzification/membership-of-b.js')

let rules = []

rules.push(
  new Rule()
    .is(membershipOfL.membership(30), 'black')
    .and()
    .is(membershipOfA.membership(-30), 'amiddle')
    .and()
    .is(membershipOfB.membership(50), 'yellow')
    .compare()
)
