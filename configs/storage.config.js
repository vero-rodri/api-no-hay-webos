const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
  });
  const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'NoHayWebos',
  resource_type: 'auto'
  //allowedFormats: ['jpg', 'png', 'mp4'],
  //transformation: [{ width: 500, height: 500, crop: 'limit' }]
  });


  module.exports = multer({ storage: storage });

