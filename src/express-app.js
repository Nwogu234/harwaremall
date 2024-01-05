const express = require('express')
const cors = require('cors')
const basicRoutes = require('./routes/basicRoutes')
const productRoutes = require('./routes/productRoutes')
const vendorRoutes = require('./routes/vendorRoutes')
const searchRoutes = require('./routes/searchRoutes')
const updateDataRoutes = require('./routes/updateDataRoutes')
const userRoutes = require('./routes/userRoutes')
const session = require('express-session')
const { SESSION_SECRET } = require('./config')

module.exports = async (app) => {
    
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs')

    // middleware for static files
    app.use(express.static('public'))
    
    app.use(cors())

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))    

    // setting d express session middleware
    app.use(session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    }))


    // admin account routes
    app.use('/', basicRoutes)

    // product routes
    app.use('/products', productRoutes)

    // vendor routes
    app.use('/vendors', vendorRoutes)
    
    // users routes
    app.use('/users', userRoutes)
    
    // search routes
    app.use('/search', searchRoutes)
    
    // search routes
    app.use('/updateData', updateDataRoutes)
    
}