const experss = require('express')
const routes = experss.Router()
const userroutes = require('../controllers/user')
const adminroutes = require('../controllers/admin')

let count = 1

routes.get('/' , (req , res) => {
    res.send('Hello from Routes')
    console.log(count++,  'Api HIT')
})

routes.use('/user' , userroutes)
routes.use('/admin' , adminroutes)


module.exports = routes