const originsAllowed = process.env.CORS_ORIGINS || [
  'http://localhost:3000'
];

module.exports = {
  origin: function (origin, cb) {
      const allowed = originsAllowed.indexOf(origin) !== -1;
      cb(null, allowed);
  },
  credentials: true,
}




// const createError = require('http-errors');
// const cors = require('cors');
// const originsAllowed = process.env.CORS_ORIGINS || [
//   'http://localhost:3000'
//  ];

// module.exports = cors({
//   origin: (origin, next) => {
//     const allowed = !origin || originsAllowed.indexOf(origin) !== -1;
//     if (allowed) {
//       next(null, allowed)
//     } else {
//       next(createError(401, 'ESTÁ LLEGANDO AQUÍ: not allowed by Cors'))
//     }
//   },
//   credentials: true
// })


//// EL CORS DE MOI ////

// const cors = require('cors')
// const createError = require('http-errors');

// const allowedOrigins = [process.env.ALLOWED_ORIGINS,'http://localhost:3000']
// module.exports = cors({
//   origin: (origin, next) => {
//     console.log("WEBOS-origin: ", origin)
//     const isAllowed = !origin || allowedOrigins.some(o => o === origin);
//     if(isAllowed) {
//       next(null,isAllowed);
//     } else {
//       next(createError(401, "Not allowed by CORS"))
//     }
//   },
//   credentials: true
// })


//EL CORS DE HEROKU
