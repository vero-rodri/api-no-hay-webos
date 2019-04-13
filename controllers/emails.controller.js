const passport = require('passport');
const createError = require('http-errors')
const transporter = require('../configs/nodemailer.config'); 

module.exports.sendEmails = (req, res, next) => {

  const { sender, emails, challenge, pathname, message } = req.body;

  emails.forEach(email => {
    transporter.sendMail({
      from: '"NoHayWebos" <app.nohaywebos@gmail.com>',
      to: email,
      subject: `Te reto a: ${challenge.title}`,
      //text: `Hola, a ver si tienes Webos a realizar este reto:`
      html:`<div class="text-center w-100">
              <h5>Hola, soy <b><i>${sender.nickName}</i></b> y me gustaría comprobar si tienes Webos a realizar el siguiente reto:</h5>
              <h3><u>${challenge.title}</u></h3>
              <p>Comentario de <b>${sender.nickName}</b>: <i>"${message}"</i></p>
              <a href="https://nohaywebos.herokuapp.com${pathname}"><p>goToChallenge</p></a>
              <img src="${challenge.photo}" height="400px"></img>
            </div>`
    })
  })
}