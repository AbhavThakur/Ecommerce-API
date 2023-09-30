import { CloudinaryStorage } from 'multer-storage-cloudinary';

import cloudinaryPackage from 'cloudinary';
import multer from 'multer';

const cloudinary = cloudinaryPackage.v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//create storage engine for multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'Ecommerce-api',
    allowedFormats: ['jpeg', 'png', 'jpg'],
  },
});

//init multer with storage engine
const categoryUpload = multer({
  storage,
});

export default categoryUpload;
