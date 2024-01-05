require('dotenv').config({path: __dirname + '/.env'})

const PORT = process.env.PORT
const dbURI = process.env.DBURI
const SALT = process.env.SALT
const SESSION_SECRET = process.env.SESSION_SECRET

const CLOUD_NAME = process.env.CLOUD_NAME
const CLOUD_API = process.env.CLOUD_API
const CLOUD_SECRET = process.env.CLOUD_SECRET

module.exports = {
    PORT,
    dbURI,
    SALT,
    SESSION_SECRET,
    CLOUD_NAME,
    CLOUD_API,
    CLOUD_SECRET,
}