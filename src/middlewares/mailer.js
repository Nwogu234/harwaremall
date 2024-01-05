const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

// Configure mailgen by setting a theme and your product info
var mailGenerator = new Mailgen({
    theme: 'default',
    product: {
        // Appears in header & footer of e-mails
        name: 'Hardware Mall',
        link: 'https://www.hardwaremall.com/'
    }
});


// email configuration 
const transporter = nodemailer.createTransport({
    host: 'mail.hardwaremall.com',
    port: 465,
    auth: {
      user: 'testemail@hardwaremall.com',
      pass: 'Nodetest2022'
    }
});


// mail request
function sendmail(to, subject, message){
    const mailOptions = {
        from: 'testemail@hardwaremall.com',
        to: to,
        subject: subject,
        html: message
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        return false
    } else {
        return true
    }
    });

}

module.exports = { 
    sendmail, 
    mailGenerator 
}