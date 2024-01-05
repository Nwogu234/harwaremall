const Admin = require('../models/admin')
const passwordHash = require('../middlewares/passwordencrypt')
const { onlyMailExist } = require('../middlewares/detailsExist')
const jwt = require('jsonwebtoken')
const { SESSION_SECRET } = require('../config')


// admin register
const adminregister = async (req, res) => {
    try{
        var details = await onlyMailExist(req.body.email);
        if(details === false){             

            password = await passwordHash(req.body.password)

            let info = {
                email: req.body.email,
                password: password,
            }

            const admin = await new Admin(info).save()
            if(admin !== null){
                
                const token = await jwt.sign(
                    { id: admin._id },
                    process.env.SESSION_SECRET,
                    {
                      expiresIn: "2h",
                    }
                );

                res.json({ message: 'account created', data: admin, token: token })
            }else{
                res.json({ message: 'error creating account' })
            }
        }else{
            res.json({message: "admin with email address already exists"});
        }

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}


// admin login
const adminlogin = async (req, res) => {
    try{
        // console.log('data', req.body)

        email = req.body.email;
        
        password = await passwordHash(req.body.password)


        const admin = await Admin.findOne({ email: req.body.email }); 
        if (admin) { 
            //check if password matches and create token
            const result = password === admin.password; 
          if (result) {

            const token = await jwt.sign(
                { id: admin._id },
                process.env.SESSION_SECRET,
                {
                  expiresIn: "2h",
                }
            );

            res.json({ message: 'login successful', data: admin, token: token }) 

          } else { 
                res.status(400).json({ error: "password doesn't match" }); 
          } 
        } else { 
            res.status(400).json({ error: "User doesn't exist" }); 
        }

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}





// admin forgot password
const adminForgot = async (req, res) => {
    try{
        email = req.body.email;  

        var details = await onlyMailExist(email);
        
        if(details === true){  

            var emailSender = {
                body: {
                    name: 'Hardware Mall',
                    intro: 'We got a request to reset your  password, if this was you, click the link below to reset password or ignore and nothing will happen to your account.',

                    action: {
                        instructions: 'To get started, please click here:',
                        button: {
                            color: '#22BC66',
                            text: 'Recover Password',
                            link: 'https://www.hardwaremall.com/passwordreset?email='+email
                        }
                    },
                    
                    outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.\n\n Team Hardware Mall.'
                }
            };
            
            // Generate an HTML email with the provided contents
            let emailBody = mailGenerator.generate(emailSender);
            // send mail
            const sent = sendmail(email, 'Password Recovery', emailBody);
            if(sent == true){
                res.status(200).json({ message: 'check your mail', data:email })
            }else{
                res.status(200).json({ message: 'error sending mail' })
            }

        }else{
            res.json({ message: 'email address does not exist' })
        }
    }catch(error){
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}



// admin rest password
const adminReset = async (req, res) => {
    try{
        
        email = req.body.email;
        password = passwordHash(req.body.password);

        const vendor = await Admin.update({ password:password }, { where: {email: email }})

        if(vendor !== null){
            res.json({ message: "password changed", data: email })
        }else{
            res.json({ message: "error reseting password", data: email }) 
        }

    }catch(error){
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}




const fetchAdmin = async (req, res) => {
    try{

        let id = req.params.id
        const admin = await Admin.findOne({ _id: id });

        if(admin !== null){
            res.json({ message: admin })
        }else{
            res.json({ message: 'no admin found' })
        }

    }catch(error){
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}


module.exports = {
    adminlogin,
    adminregister,
    adminForgot,
    adminReset,
    fetchAdmin,
}