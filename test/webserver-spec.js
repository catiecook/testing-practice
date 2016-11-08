const chai = require('chai')
const request = require('supertest')
const fs = require('fs')
const app = require('../app')


chai.should()

describe('sending a GET to /', () => {
  describe('should succeed', () => {
    it('in retreiving the index.html', (done) => {
      const indexFile = fs.readFileSync('public/index.html', 'utf8')

      request(app) // pulls in app
        .get('/') //then test the get request
        .expect(200)
        .end((err, res) => {
          if(err) return done(err)

          res.text.should.be.equal(indexFile) //the first item in the string should be an open tag for html

          done()
        })
    })
  })
})
