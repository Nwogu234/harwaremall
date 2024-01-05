const jwt = require("jsonwebtoken");
const { SESSION_SECRET } = require('../config')
const Admin = require('../models/admin')


const verifyToken = async (req, res, next) => {
  try {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).json({ message: "A token is required for authentication" })
    }
    
    const decoded = jwt.verify(token, SESSION_SECRET);
    if(decoded.id){
      const admin = await Admin.findById(decoded.id);
      if(admin) {
        req.admin = admin;
        next();
      }else{
        return res.status(401).json({ message: "Invalid Token" })    
      }
    }
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" })
  }
    
  };
  
  module.exports = verifyToken;