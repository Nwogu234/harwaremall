const mongoose = require('mongoose')

const databaseConnection = (dbURI) => {
    
    mongoose.connect(dbURI)
    .then((result) => {
        console.log('connected to db')
    })
    .catch((err) => {
        console.log(err)
    })  
}

module.exports = databaseConnection