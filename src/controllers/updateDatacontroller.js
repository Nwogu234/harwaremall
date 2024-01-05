const Product = require('../models/product')


const updateData = async (req, res) => {
    try{
        const product = await Product.updateOne({ _id: req.body.productid }, 
            {
                $set:{
                    countperimport: req.body.countperimport
                }
            }
        )

        if(product !== null){
            res.json({ message: 'import count updated' })
        }else{
            res.json({ message: 'error updating count' })
        }

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}

module.exports = {
    updateData,
}