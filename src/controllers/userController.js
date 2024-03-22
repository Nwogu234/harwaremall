const Product = require('../models/product')
const Category = require('../models/category')
const Video = require('../models/advideo')
const Affiliate = require('../models/affiliate')
const axios = require('axios')
const escapeRegexp = require("escape-string-regexp-node");
const { compressSent, decompressSent } = require('../middlewares/compressdata')

// send all uploaded product
const findProducts = async (req, res) => {
    try{
        const products = await Product.find({}, { img: 1, name: 1, category: 1, tags: 1, brand: 1, reviewvideo: 1 }).sort({ click: -1 })
        if(products !== null){

            // Compress the data
            const compressedProducts = await compressSent(products);

            let response = await axios.post('https://vendors-j37j.onrender.com/users/products', {
                products: compressedProducts.toString('base64')
            })
            
            res.json({ message: response.data.foundproducts })
        }else{
            res.json({ message: 'no product found' })
        }

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}


// send product with specified slug
const findProductWithSlug = async (req, res) => {
    try{

        // using slug to get id of the product
        let id = req.body.id
        
        let getId = await Product.findOne({ _id: id })
        
        if(getId !== null){

            let pclick = getId.click
            pclick += 1
        
            let pname = getId.name
            let pcategory = getId.category

            const rvideo = await Category.find({ title: pcategory });

            const clicks = await Product.updateOne({ _id: id }, 
                {
                    $set:{
                        click: pclick
                    }
                }
            )
    
            if(clicks !== null){

                // send request to vendor app to get vendors that imported this product 
                let response = await axios.post('https://vendors-j37j.onrender.com/users/productsid', {
                    id: getId._id
                })

                // get affiliate links
                let getAff = []
                let affiliate = getId.affiliate
                affiliate = affiliate.split(',')

                const seen = await Affiliate.find()

                if(seen !== null){
                    seen.forEach(data => {
                        for(let x = 0; x < affiliate.length; x++){
                            if(data._id == affiliate[x]){
                                getAff.push(data)
                            }
                        }
                    });
                }

                const similar = await Product.find({ _id: { $ne: id } });

                async function filterProductsSearch( keywords, data ){
                    const words = keywords.toLowerCase().split(" ");
                    const top10 = [];
                    let counter = 10;
                    for (let i = words.length; i > 0 && counter > 0; i--) {
                        for (const datum of data) {
                            let count = 0;
                            const name = datum.name.toLowerCase();
                            for (const word of words) {
                                if (name.includes(word)) count++;
                            }
                            if (count === i) {
                                top10.push(datum);
                                counter--;
                            }
                        }
                    }
                    return top10.slice(0, 10);
                }

                const similarProducts =  await filterProductsSearch(pname, similar)

                // const similarProducts = await Product.find({
                //     $or: [
                //         { brand: { $regex: new RegExp(pbrand, 'i') } },
                //         { category: { $regex: new RegExp(pcategory, 'i') } }
                //     ]
                // }).limit(10);

                // get 3 similar video
                const similarVideos = await Video.find({
                    title: { $regex: new RegExp(pname, 'i') },
                }).limit(3);

                let sendData = {
                    product: getId,
                    vendors: response.data.vendors,
                    affiliates: getAff,
                    similarProducts: similarProducts,
                    similarVideos: similarVideos,
                    rcommendedvideo: rvideo
                }

                // Compress the data
                const compressedData = await compressSent(sendData)

                res.json({ data: compressedData })

            }else{
                let sendData = { }
                // Compress the data
                const compressedData = await compressSent(sendData)

                res.json({ data: compressedData })
            }
        }else{
            let sendData = { }
            // Compress the data
            const compressedData = await compressSent(sendData)

            res.json({ data: compressedData })
        }


    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}




// send top 8 uploaded product
const topproducts = async (req, res) => {
    try{
        const products = await Product.find().sort({ click: -1 }).limit(8)
        
        if(products !== null){
            const compressedProducts = await compressSent(products);

            let response = await axios.post('https://vendors-j37j.onrender.com/users/topproducts', {
                products: compressedProducts.toString('base64')
            })
           
            res.json({ message: response.data.foundproducts })
        }else{
            res.json({ message: 'no product found' })
        }

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}



// send top 8 uploaded product
const findVideo = async (req, res) => {
    try{
        const videos = await Video.find().sort({ createdAt: -1 })
        if(videos !== null){
            // Compress the data
            const compressedData = await compressSent(videos)

            res.json({ foundvideos: compressedData })
        }else{
            const compressedData = await compressSent(videos)

            res.json({ foundvideos: compressedData })
        }

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}



// get and send all vendor imported products back to vendor route for users to access
const vendorProducts = async (req, res) => {
    try{
        // decompress data
        let productData = await decompressSent(req.body.data);
        let productDetails = []
        
        const products = await Product.find()

        productData.forEach(data => {
            for(let x = 0; x < products.length; x++){
                if(data.productid == products[x]._id){
                    let found = {
                        product: products[x],
                        currency: data.currency,
                        price: data.price
                    }
                    productDetails.push(found)
                }
            }
        });

        // Compress the data
        const compressedData = await compressSent(productDetails)
        res.json({ foundproducts: compressedData })
        
    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}



module.exports = {
    findVideo,
    topproducts,
    findProducts,
    findProductWithSlug,
    vendorProducts,
}
