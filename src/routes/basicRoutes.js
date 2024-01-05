const router = require('express').Router()
const basicController = require('../controllers/basiccontroller')

router.post('', basicController.adminlogin)
router.post('/register', basicController.adminregister)
router.post('/forgot', basicController.adminForgot)
router.post('/reset', basicController.adminReset)
router.get('/profile/:id', basicController.fetchAdmin)

// export

module.exports = router
