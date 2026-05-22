const multer = require('multer');
const { S3Client } = require('@aws-sdk/client-s3');
const multerS3 = require('multer-s3');
const path = require('path');

const s3 = new S3Client({
  region: process.env.AWS_REGION || 'eu-central-1', // Set your region
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
});

// Sadece görsellere izin ver
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Lütfen sadece görsel (image) dosyası yükleyin.'), false);
  }
};

const upload = multer({ 
  storage: multerS3({
    s3: s3,
    bucket: 'figuverse-images-733959200368',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, 'products/' + 'product-' + uniqueSuffix + path.extname(file.originalname));
    }
  }),
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // Maksimum 5MB
  }
});

module.exports = upload;
