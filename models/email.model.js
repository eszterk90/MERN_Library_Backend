const nodemailer = require('nodemailer');
require('dotenv').config();

var transport = nodemailer.createTransport({
    host: "smtp.strato.de",
    port: 465,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD
    }
  });


  const sendMail = (mailTo, subject, message) => {
    return new Promise((resolve, reject) => {
        transport.sendMail({
            from: process.env.USER_EMAIL,
            to: mailTo,
            subject: subject,
            html: message
        })
        .then(result => resolve(result)).catch(error => reject(error))
    })
  }


module.exports = {sendMail}