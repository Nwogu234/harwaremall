const Admin = require('../models/admin')

async function onlyMailExist (email){
    let admin = await Admin.findOne({ email: email  })
    if(admin === null){
        return false
    }else{
        return true
    }
}


module.exports = {
    onlyMailExist
};