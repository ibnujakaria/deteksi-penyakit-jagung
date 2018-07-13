/**
 * this class is a really simple class to make the logical function simpler
 * and its only designed for this unique case, not for general fuzzy logic 
 * use
 */
module.exports = class Rule {

  constructor () {
    this.statements = []

    /**
     * this variable is used to save boolean value for each statements 
     * and its corresponding membership value
     */
    this.resultOfStatements = [] 

    // this variable used to save the result of all statement
    this.comparedResult = false
    
    // this variable used to hold 'and', 'or'
    this.comparisons = []
  }

  /**
   * fuzzySets is an array returns from membership function
   * label is a string contains linguistic variable
   */
  is (fuzzySets, label) {
    this.statements.push({ fuzzySets, type: 'is', label })

    return this
  }

  and () {
    if (this.comparisons.length < this.statements.length) {
      this.comparisons.push('and')
    } else {
      throw 'Double comparisons laa yajuuz.'
    }

    return this
  }

  or () {
    if (this.comparisons.length < this.statements.length) {
      this.comparisons.push('or')
    } else {
      throw 'Double comparisons laa yajuuz.'
    }

    return this
  }

  compare () {
    this.gettingResultOfEveryStatements()
    this.comparingTheResultOfEveryStatements()

    return this
  }

  gettingResultOfEveryStatements () {
    this.statements.forEach(statement => {
      console.log(statement)
      let result = { bool: false, value: 0 }

      if (statement.type === 'is') {
        statement.fuzzySets.forEach(set => {
          console.log(`if ${set.label} is ${statement.label}`)
          if (set.label === statement.label) {
            result = { bool: true, value: set.membershipValue}
            console.log('true')
          } else {
            console.log('false')
          }
        })
      }

      this.resultOfStatements.push(result)
    })
  }

  comparingTheResultOfEveryStatements () {
    if (this.comparisons.length < 1 && this.resultOfStatements.length === 1) {
      this.comparedResult = this.resultOfStatements[0]
    } else {
      console.log(this.resultOfStatements)

      let i = 0
      let lastBool = this.resultOfStatements[i].bool
      let lastStatement = null

      this.comparisons.forEach(comparison => {
        let nextBool = this.resultOfStatements[i + 1].bool

        let currentBool
        if (comparison === 'and') {
          currentBool = lastBool && nextBool
        } else {
          currentBool = lastBool || nextBool
        }

        console.log(`${lastBool} ${comparison} ${nextBool} -> ${currentBool}`)

        lastBool = currentBool
        i++
      })

      this.comparedResult = lastBool
    }
  }
}