# testing-practice

`npm init` - test command 'mocha' author "author name"
`npm install --dave-dev mocha chai` - make sure to save to dev, because the testing dependencies are not needed in the production environment
    - For reference go to chaijs.com or mochajs.org
`mkdir test`
`touch test/canary-spec.js` - create a test file in the test folder
    - in the canary-spec.js file, wirte a simple test to make sure mocha is running

    ```javascript
    const chai = require('chai')

    chai.should()

    describe('Canary test', () => {
      it('five should be equal to five', () => {
        const five = 5

        five.should.be.a('number')
        five.should.equal(5)
      })
    })
    ```
`npm test` - run this anywhere in the app and it will run the test
`mocha` - run this in the directory the package.json is in, and the test will run. If this command is run inside of the test folder, it won't work. have to run `npm test` in that case

###Making server tests
`touch test/webserver-spec.js` - make serve test file
*Note that GET requests are Asynchronous actions*
    - require in chai, and require, and app.
`npm install --save-dev supertest`
    - The REQUIRE dependency is important because it allows route/server testing
    - require in fs, so we can pull in whole files, and test the entire file
`touch public/index.html`
`touch app.js`
`npm i express -S`
  - now we are set up with files for basic route testing
*in the webserver-spec.js*
```javascript
const chai = require('chai')
const request = require('supertest')
const fs = require('fs')
const app = require('../app')


chai.should()

describe('sending a GET to /', () => {
  describe('should succeed', () => {
    it('in retrieving the index.html', (done) => {
      const indexFile = fs.readFileSync('public/index.html', 'utf8')

      request(app) // pulls in app
        .get('/') //then test the get request
        .expect(200)
        .end((err, result) => {
          if(err) return done(err)

          res.text.should.be.equal(indexFile) //the first item in the string should be an open tag for html

          done();
        })
    })
  })
})
```

- go to expressjs.org for all the options for render/req/next etc.

- in app.js, set up the basic route to test
```javascript
  app.get('/', (req, res, next) => {
    res.sendFile('index.html', {root: __dirname + '/public'}, (err) =>{
      if(err) return next(err) //if there is an error, pass it to next
    })
  })
```
