module.exports.PASSWORD_PATTERN = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
module.exports.EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\“]+(\.[^<>()\[\]\.,;:\s@\“]+)*)|(\“.+\“))@(([^<>()[\]\.,;:\s@\“]+\.)+[^<>()[\]\.,;:\s@\“]{2,})$/i;
module.exports.DEFAULT_AVATAR = 'https://res.cloudinary.com/ddby3wqlo/image/upload/v1553528527/api-no-hay-webos/Users/default_user_avatar.png';
module.exports.CATEGORIES_CHALLENGE = ['SPORTS', 'ART', 'FUN', 'SOCIAL'];
module.exports.SALT_WORK_FACTOR = 10;
module.exports.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/no-hay-webos';
module.exports.COOKIE_EXP = 60 * 60 * 24 * 1000;
module.exports.ALLOWED_ORIGINS = ['http://localhost:3000']