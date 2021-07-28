const cloudinary = require("cloudinary").v2

cloudinary.config({ 
  cloud_name: 'marktiger', 
  api_key: '514689554325348', 
  api_secret: 'vR5sQCr536M9x0v1b5ZqW4MieLc',
  secure: true
});

module.exports = cloudinary