const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'app.nohaywebos@gmail.com',
    pass: process.env.MAIL_PASSWORD
  }
});

module.exports = transporter;