const express = require('express')

const app = express()


app.get('/', (req, res, next) => {
  res.sendFile('index.html', {root: __dirname + '/public'}, (err) =>{
    if(err) return next(err) //if there is an error, pass it to next
  })
})

module.exports = app
