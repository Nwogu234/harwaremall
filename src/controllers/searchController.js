const Product = require('../models/product')
const Video = require('../models/advideo')
const axios = require('axios')

// fetch products
const search = async (req, res) => {
    try{
        
        const q = req.body.q
        const tab = req.body.tab
        const start = Number(req.body.start)
        const count = Number(req.body.count)
        const location = req.body.location

        if((count == null || count == '') && (start == null || start == '')){
            if(location == null || location == ''){
                if(tab == null || tab == '' || tab == 'products'){
                    let response = await Product.find({ [name]: { $regex: q, $options: 'i' } }).sort({ createdAt: -1 })
                    if(response !== null) {
                        res.json({ message: response })
                    }
                    else {
                        res.json({ message: 'error handling request' })
                    }

                }else if(tab == 'videos'){
                    let response = await Video.find({ [title]: { $regex: q, $options: 'i' } }).sort({ createdAt: -1 })
                    if(response !== null) {
                        res.json({ message: response })
                    }
                    else {
                        res.json({ message: 'error handling request' })
                    }
                }else{
                    let response = await axios.post('https://vendors-jpnc.onrender.com/search/adminsearch', {
                        search: q,
                        location: location
                    })
                    if(response.data !== null) {
                        res.json({ message: response.data.message })
                    }
                    else {
                        res.json({ message: 'error processing request' })
                    }
                }
            }else{
                let response = await axios.post('https://vendors-jpnc.onrender.com/search/adminsearch', {
                    search: q,
                    location: location
                })
                if(response.data !== null) {
                    res.json({ message: response.data.message })
                }
                else {
                    res.json({ message: 'error processing request' })
                }
            }


            
        }else if((count != null || count != '') && (start == null || start == '')){
            if(location == null || location == ''){
                if(tab == null || tab == '' || tab == 'products'){
                    let response = await Product.find({ [name]: { $regex: q, $options: 'i' } }).sort({ createdAt: -1 }).limit(count)
                    if(response !== null) {
                        res.json({ message: response })
                    }
                    else {
                        res.json({ message: 'error handling request' })
                    }

                }else if(tab == 'videos'){
                    let response = await Video.find({ [title]: { $regex: q, $options: 'i' } }).sort({ createdAt: -1 }).limit(count)
                    if(response !== null) {
                        res.json({ message: response })
                    }
                    else {
                        res.json({ message: 'error handling request' })
                    }
                }else{
                    let response = await axios.post('https://vendors-jpnc.onrender.com/search/adminsearchTwo', {
                        search: q,
                        location: location,
                        count: count
                    })
                    if(response.data !== null) {
                        res.json({ message: response.data.message })
                    }
                    else {
                        res.json({ message: 'error processing request' })
                    }
                }
            }else{
                let response = await axios.post('https://vendors-jpnc.onrender.com/search/adminsearchTwo', {
                    search: q,
                    location: location,
                    count: count
                })
                if(response.data !== null) {
                    res.json({ message: response.data.message })
                }
                else {
                    res.json({ message: 'error processing request' })
                }
            }


        }else if((count == null || count == '') && (start != null || start != '')){
            if(location == null || location == ''){
                if(tab == null || tab == '' || tab == 'products'){
                    let response = await Product.find({ [name]: { $regex: q, $options: 'i' } }).sort({ createdAt: -1 }).skip(start)
                    if(response !== null) {
                        res.json({ message: response })
                    }
                    else {
                        res.json({ message: 'error handling request' })
                    }

                }else if(tab == 'videos'){
                    let response = await Video.find({ [title]: { $regex: q, $options: 'i' } }).sort({ createdAt: -1 }).skip(start)
                    if(response !== null) {
                        res.json({ message: response })
                    }
                    else {
                        res.json({ message: 'error handling request' })
                    }
                }else{
                    let response = await axios.post('https://vendors-jpnc.onrender.com/search/adminsearchThree', {
                        search: q,
                        location: location,
                        start: start
                    })
                    if(response.data !== null) {
                        res.json({ message: response.data.message })
                    }
                    else {
                        res.json({ message: 'error processing request' })
                    }
                }
            }else{
                let response = await axios.post('https://vendors-jpnc.onrender.com/search/adminsearchThree', {
                    search: q,
                    location: location,
                    start: start
                })
                if(response.data !== null) {
                    res.json({ message: response.data.message })
                }
                else {
                    res.json({ message: 'error processing request' })
                }
            }


        }else if((count != null || count != '') && (start != null || start != '')){
            if(location == null || location == ''){
                if(tab == null || tab == '' || tab == 'products'){
                    let response = await Product.find({ [name]: { $regex: q, $options: 'i' } }).sort({ createdAt: -1 }).limit(count).skip(start)
                    if(response !== null) {
                        res.json({ message: response })
                    }
                    else {
                        res.json({ message: 'error handling request' })
                    }

                }else if(tab == 'videos'){
                    let response = await Video.find({ [title]: { $regex: q, $options: 'i' } }).sort({ createdAt: -1 }).limit(count).skip(start)
                    if(response !== null) {
                        res.json({ message: response })
                    }
                    else {
                        res.json({ message: 'error handling request' })
                    }
                }else{
                    let response = await axios.post('https://vendors-jpnc.onrender.com/search/adminsearchfour', {
                        search: q,
                        location: location,
                        start: start,
                        count: count
                    })
                    if(response.data !== null) {
                        res.json({ message: response.data.message })
                    }
                    else {
                        res.json({ message: 'error processing request' })
                    }
                }
            }else{
                let response = await axios.post('https://vendors-jpnc.onrender.com/search/adminsearchfour', {
                    search: q,
                    location: location,
                    start: start,
                    count: count
                })
                if(response.data !== null) {
                    res.json({ message: response.data.message })
                }
                else {
                    res.json({ message: 'error processing request' })
                }
            }
        }
       

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}





module.exports = {
    search,
}
