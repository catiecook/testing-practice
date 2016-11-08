const chai = require('chai')

chai.should()

describe('Canary test', () => {
  it('five should be equal to five', () => {
    const five = 5

    five.should.be.a('number')
    five.should.equal(5)
  })
})
