const express = require('express')
const router = express.Router()


router.get('/', (req, res, next) => {
  res.sendFile('index.html', {root: __dirname + '/../public'}, (err) =>{
    if(err) return next(err) //if there is an error, pass it to next
  })
})


module.exports = router

//if something errors you need to pass in __dirname + '/public' as the root
