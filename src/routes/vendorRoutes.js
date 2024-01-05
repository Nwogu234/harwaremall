const router = require('express').Router()
const vendorController = require('../controllers/vendorController')
const auth = require("../middlewares/auth");


router.post('/edit', auth, vendorController.editVendor)

// request coming from the vendors service to get vendors products
router.post('/getvendorproducts', vendorController.getProducts)
router.post('/geteditedproducts', vendorController.getEditedProducts)


module.exports = router