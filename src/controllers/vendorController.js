const axios = require('axios')
const Product = require('../models/product')
const { compressSent, decompressSent } = require('../middlewares/compressdata')

// block vendor account
const editVendor = async (req, res) => {
    try{

        if(req.body.admin_email != req.admin.email){
            return res.json({ message: 'invalid or expired token' })
        }
        
        const vendorid = req.body.vendor_id
        const action = req.body.action

        let edit = await axios.post('https://vendors-j37j.onrender.com/giveData/editdata', {
            vendorid: vendorid,
            action: action
        })
        
        res.json({ message: edit.data.message })
       

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}




const getProducts = async (req, res) => {
    try{
        let productGotten = await decompressSent(req.body.products)
        let foundProducts = []

        let products = await Product.find({})

        if(products !== null){

            products.forEach(product => {
                for(let x = 0; x < productGotten.length; x++){
                    if(product._id == productGotten[x].productid){
                        let data = {
                            importObj: productGotten[x],
                            productObj: product
                        }
                        foundProducts.push(data)
                    }
                }
            })
            
            // Compress the data
            const compressedData = await compressSent(foundProducts)
            res.json({ foundProducts: compressedData })
        }else{
            const compressedData = await compressSent(foundProducts)
            res.json({ foundProducts: compressedData })
        }


    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}


const getEditedProducts = async (req, res) => {
    try{
        let productid = req.body.productid

        let product = await Product.findOne({ _id: productid })

        if(product !== null){            
            res.json({ product: product })
        }else{
            res.json({ product: product })
        }

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}

module.exports = {
    editVendor,
    getProducts,
    getEditedProducts
}
