const express = require('express')
const webRoutes = require('./routes/web.js')
const iceCreamModel = require('./models/ice-creams.js')
const app = express()

app.use('/', webRoutes)

app.get('/api/ice-creams', (req, res, next) => {
  iceCreamModel.getAll()
    .then((result) => {
      res.json(result)
      console.log("got results ", result);
    }).catch((err) => {
      console.log(err)
      res.send("whoops")
    })
})
module.exports = app
