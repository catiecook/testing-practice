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

_app.js, set up the basic route to test_
```javascript
  app.get('/', (req, res, next) => {
    res.sendFile('index.html', {root: __dirname + '/public'}, (err) =>{
      if(err) return next(err) //if there is an error, pass it to next
    })
  })
```

- to make things more modular, make a routes folder
`mkdir routes`
`touch routes/web.js`

_in app.js_
    ```javascript
    const express = require('express')
    const webRoutes = require('./routes/web.js')
    const app = express()

    app.use('/', webRoutes) //this is telling the server to look int webRoutes aka web.js in this case

    module.exports = app
    ```
_in web.js_
  ```javascript
  const express = require('express')
  const router = express.Router()


  router.get('/', (req, res, next) => {
    res.sendFile('index.html', {root: __dirname + '/../public'}, (err) =>{
      if(err) return next(err) //if there is an error, pass it to next
    })
  })

  module.exports = router
  ```

###Run a server AND also be able to run tests   
  `mkdir bin`
  `touch bin/www` - we made this file so that when we do the testing, it doesn't try to automatically run the server when you run a server
      so if we run `npm start` it runs a server and not the tests
  _in bin_
    ```javascript
    const app = require('../app');

    app.listen(3000);
    ```

##Testing API
- the set up is the same as the route testing, so follow that for basic set up
_in food-spec.js_
- after the `.expect(200)`

  ```javascript
  .end(err, res) => {
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

    res.body.should.br.deep.equal(iceCreams);
  }
  ```
  in app.js make sure to add a new app.get route
  _app.js_
  ```javascript
  const express = require('express')
  const webRoutes = require('./routes/web.js')
  const iceCreamModel = require('./models/ice-creams.js')
  const app = express()

  app.use('/', webRoutes)

  app.get('/api/ice-creams', (req, res, next) => {
    iceCream.getAll()
      .then(result) => {
        res.json(result)
      }
  })
  module.exports = app
```
