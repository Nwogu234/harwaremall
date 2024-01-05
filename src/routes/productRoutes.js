const router = require('express').Router()
const productcontroller = require('../controllers/productcontroller')
const auth = require("../middlewares/auth");
const multer = require("multer")

let storage = multer.memoryStorage()
let upload = multer({storage: storage})

router.post('/create', auth, upload.single("img"), productcontroller.createProduct)
router.post('/addvideo', auth, productcontroller.createVideo)
router.post('/addaffiliate', auth, productcontroller.createAffiliate)
router.post('/edit', auth, upload.single("img"), productcontroller.editProduct)
router.post('/delete', auth, productcontroller.deleteProduct)


router.post('/deleteaff', auth, productcontroller.deleteAff)
router.post('/deletevideo', auth, productcontroller.deleteVideo)



// get routes
router.get('/getaffiliate', productcontroller.viewAffiliate)
router.get('/getvideo', productcontroller.viewVideo)
router.get('/getproducts', productcontroller.viewProduct)


module.exports = router