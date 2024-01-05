const router = require('express').Router()
const userController = require('../controllers/userController')


router.get('/products', userController.findProducts)
router.post('/productsslug', userController.findProductWithSlug)


router.post('/vendorproducts', userController.vendorProducts)



router.get('/topproducts', userController.topproducts)
router.get('/findvideo', userController.findVideo)


module.exports = router