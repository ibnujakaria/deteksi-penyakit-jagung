module.exports = class Logic {

  constructor (rules) {
    this.rules = rules
  }

  getResults () {
    let results = []
    let i = 1

    this.rules.forEach(rule => {
      if (rule.when.comparedResult) {
        // console.log(`${i++}. ${rule.then} -> ${rule.when.comparedResult} (${rule.when.smallestMembershipValue()})`)
        results.push(rule)
      }
    })

    return results
  }

  getFuzzyResult () {
    let maximumMembershipValue = 0
    let allResults = this.getResults()

    let possibleLinguisticColors = []

    allResults.forEach(result => {
      possibleLinguisticColors.push({
        color: result.then,
        value: result.when.smallestMembershipValue()
      })

      if (result.when.smallestMembershipValue() > maximumMembershipValue) {
        maximumMembershipValue = result.when.smallestMembershipValue()
      }
    })

    let results = []

    // store the result that has value of maximumMembershipValue
    allResults.forEach(result => {
      if (result.when.smallestMembershipValue() === maximumMembershipValue) {
        results.push(result)
      }
    })

    if (results.length === 1) {
      return { possibleLinguisticColors, then: results[0].then }
    }

    // if there is more than just one result with the same value, just random it
    let i = Math.floor(Math.random() * Math.floor(results.length))

    return { possibleLinguisticColors, then: results[i].then }
  }
}