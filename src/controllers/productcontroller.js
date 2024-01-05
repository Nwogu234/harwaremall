const Product = require('../models/product')
const Video = require('../models/advideo')
const Affiliate = require('../models/affiliate')
const cloudinary = require('../middlewares/cloudinary')
const streamifier = require('streamifier')
const axios = require('axios')


// upload products
const createProduct = async (req, res) => {
    try{
        if(req.body.admin_email != req.admin.email){
            return res.json({ message: 'invalid or expired token' })
        }

        if (req.file == undefined) {
            return res.json({ message: 'please upload an image' })
        }

        
        // Convert the buffer to a readable stream
        const bufferStream = streamifier.createReadStream(req.file.buffer);
        // Create a stream from the buffer
        const stream = cloudinary.uploader.upload_stream(async (error, result) => {
            if (error) {
                console.error(error);
                return res.json({ message: 'Error uploading product' });
            } else {
                let slug = Math.floor(Math.random() * Date.now()).toString(16);
                slug = slug + '-' + req.body.name;

                let info = {
                    img: result.secure_url,
                    cloudinaryid: result.public_id,
                    name: req.body.name,
                    description: req.body.description,
                    category: req.body.category,
                    tags: req.body.tags,
                    brand: req.body.brand,
                    countperimport: 0,
                    slug: slug,
                    affiliate: req.body.affiliate,
                };

                const product = await new Product(info).save();
                if (product !== null) {
                    return res.json({ message: 'Product uploaded' });
                } else {
                    return res.json({ message: 'Error uploading product' });
                }
            }
        });

        // Pipe the buffer stream to the Cloudinary stream
        bufferStream.pipe(stream);
        
    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}



// add video links
const createVideo = async (req, res) => {
    try{
        if(req.body.admin_email != req.admin.email){
            return res.json({ message: 'invalid or expired token' })
        }
        
        let info = {
            title: req.body.title,
            url: req.body.url,
        }

        const video = await new Video(info).save()
        if(video !== null){
            res.json({ message: 'video link uploaded' })
        }else{
            res.json({ message: 'error uploading video link' })
        }
       
        
    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}



// add affiliate link
const createAffiliate = async (req, res) => {
    try{
        if(req.body.admin_email != req.admin.email){
            return res.json({ message: 'invalid or expired token' })
        }
        
        let info = {
            title: req.body.title,
            url: req.body.url,
        }

        const video = await new Affiliate(info).save()
        if(video !== null){
            res.json({ message: 'affiliate link uploaded' })
        }else{
            res.json({ message: 'error uploading affiliate link' })
        }
        
    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}



// fetch affiliate
const viewAffiliate = async (req, res) => {
    try{

        let response = await Affiliate.find().sort({ createdAt: -1 })
        if(response !== null){
            res.json({ affiliate: response })
        }
        else {
            res.json({ message: 'error handling request' })
        } 

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}



// fetch video
const viewVideo = async (req, res) => {
    try{

        let response = await Video.find().sort({ createdAt: -1 })
        if(response !== null){
            res.json({ video: response })
        }
        else {
            res.json({ message: 'error handling request' })
        } 

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}



// fetch product
const viewProduct = async (req, res) => {
    try{

        let products = await Product.find().sort({ createdAt: -1 })
        if(products !== null){

            let response = await axios.post('https://vendors-jpnc.onrender.com/users/products', {
                products: products
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



// delete affiliate
const deleteAff = async (req, res) => {
    try{
        if(req.body.admin_email != req.admin.email){
            return res.json({ message: 'invalid or expired token' })
        }

        const affiliateid = req.body.affiliate_id

        const result = await Affiliate.findByIdAndDelete(affiliateid)

        if(result !== null){
            res.json({ message: 'affiliate link deleted' })
        }else{
            res.json({ message: 'error deleting link' })
        }  

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}




// delete video
const deleteVideo = async (req, res) => {
    try{
        if(req.body.admin_email != req.admin.email){
            return res.json({ message: 'invalid or expired token' })
        }

        const videoid = req.body.video_id

        const result = await Video.findByIdAndDelete(videoid)

        if(result !== null){
            res.json({ message: 'video link deleted' })
        }else{
            res.json({ message: 'error deleting video link' })
        }  

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}




// editing products
const editProduct = async (req, res) => {
    try{
        if(req.body.admin_email != req.admin.email){
            return res.json({ message: 'invalid or expired token' })
        }

        const productid = req.body.product_id

        const check = await Product.findOne({ _id: productid }) 
        if (check !== null) {

            let slug = Math.floor(Math.random() * Date.now()).toString(16)
            slug = slug + '-' + req.body.name

                
            if (req.file == undefined) {
                
                const product = await Product.updateOne({ _id: productid }, 
                    {
                        $set:{
                            name: req.body.name,
                            description: req.body.description,
                            category: req.body.category,
                            tags: req.body.tags,
                            brand: req.body.brand,
                            slug: slug,
                            affiliate: req.body.affiliate,
                        }
                    }
                )
                if(product !== null){
                    res.json({ message: 'product updated' })
                }else{
                    res.json({ message: 'error updating product' })
                }
                    
            }else{

                // Convert the buffer to a readable stream
                const bufferStream = streamifier.createReadStream(req.file.buffer);
                // Create a stream from the buffer
                const stream = cloudinary.uploader.upload_stream(async (error, result) => {
                    if (error) {
                        console.error(error);
                        return res.json({ message: 'Error uploading product' });
                    } else {

                        const product = await Product.updateOne({ _id: productid }, 
                            {
                                $set:{

                                    img: result.secure_url,
                                    cloudinaryid: result.public_id,
                                    name: req.body.name,
                                    description: req.body.description,
                                    category: req.body.category,
                                    tags: req.body.tags,
                                    slug: slug,
                                    affiliate: req.body.affiliate,
                                }
                            }
                        )
                        if(product !== null){
                            res.json({ message: 'product updated' })
                        }else{
                            res.json({ message: 'error updating product' })
                        }
                    }
                });

                // Pipe the buffer stream to the Cloudinary stream
                bufferStream.pipe(stream);

            }
            
        }else{
            res.json({ message: 'invalid id' })
        }


    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}





// deleting products
const deleteProduct = async (req, res) => {
    try{
        if(req.body.admin_email != req.admin.email){
            return res.json({ message: 'invalid or expired token' })
        }

        const productid = req.body.product_id

        const product = await Product.findByIdAndDelete(productid)

        if(product !== null){
            res.json({ message: 'product deleted' })
        }else{
            res.json({ message: 'error deleting product' })
        } 
       

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}


module.exports = {
    createProduct,
    createVideo,
    editProduct,
    createAffiliate,
    viewAffiliate,
    viewVideo,
    viewProduct,
    deleteAff,
    deleteVideo,
    deleteProduct,
}