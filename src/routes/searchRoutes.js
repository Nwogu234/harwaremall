const router = require('express').Router()
const searchController = require('../controllers/searchController')


router.post('', searchController.search)


module.exports = router