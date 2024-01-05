const bcrypt = require('bcrypt');
// require environment variables
const { PORT, dbURI, SALT } = require('../config')

async function password_encrypt($pass){    
    return await bcrypt.hash($pass, SALT);
}

module.exports = password_encrypt;