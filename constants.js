module.exports.PASSWORD_PATTERN = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
module.exports.EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\“]+(\.[^<>()\[\]\.,;:\s@\“]+)*)|(\“.+\“))@(([^<>()[\]\.,;:\s@\“]+\.)+[^<>()[\]\.,;:\s@\“]{2,})$/i;
module.exports.DEFAULT_AVATAR = "";
module.exports.CATEGORIES_CHALLENGE = [];
module.exports.SALT_WORK_FACTOR = 10;
module.exports.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/no-hay-webos';
