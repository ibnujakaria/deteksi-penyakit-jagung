module.exports = class Triangular {

  /**
   * Triangulars contains: [{label, a, b, c}]
   */
  constructor ({ min, max, triangulars }) {
    this.min = min ? min : 0
    this.max = max ? max : 100
    this.triangulars = triangulars ? triangulars : []
  }

  /**
   * return the membership of value x with triangular membership function
   */
  membership (x) {
    let groups = []

    console.log(`x -> ${x}\n`)

    // looking for membership value of each triangulars
    this.triangulars.forEach(triangular => {
      if (x <= triangular.a || x >= triangular.c) {
        // do nothing?
        // haha, im sorry, just making fun of it
      } else {
        let membershipValue

        if (triangular.a < x && x <= triangular.b) {
          membershipValue = (x - triangular.a) / (triangular.b - triangular.a)
        } else {
          membershipValue = -(x - triangular.c) / (triangular.c - triangular.b)
        }

        groups.push({ label: triangular.label, membershipValue })
      }
    })

    return groups
  }
}