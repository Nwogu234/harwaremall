const router = require('express').Router()
const updateDatacontroller = require('../controllers/updateDatacontroller')

router.post('/data', updateDatacontroller.updateData)


module.exports = router