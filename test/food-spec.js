const chai = require('chai')
const request = require('supertest')
const app = require('../app')

chai.should()

describe('sending a GET to /api/ice-creams', () => {
  describe('should succeed', () => {
    it('in getting all ice cream flavors', (done) => {

      request(app)
        .get('/api/ice-creams')
        .expect(200)
        .end((err, res) => {
          if(err) return done(err)

          const iceCreams = [
            {
              name: "Raisin",
              ingredients: ['milk', 'sugar', 'cream', 'raisons'],
              brand: 'Sweet Cow'
            },
            {
              name: 'Chunky Monkey',
              ingredients: ['milk', 'eggs', 'sugar', 'banana', 'chocolate chips'],
              brand: 'Ben and Jerry\'s'
            }
          ];

          res.body.should.be.deep.equal(iceCreams);

          done();
        })

    })
  })
})
