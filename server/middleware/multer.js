import multer from 'multer';
import path from 'path';
import fs from 'fs';

function makeUploadMiddleware(pathDir) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const dest = `../client/public/${pathDir}/`;
      fs.mkdirSync(dest, { recursive: true });
      cb(null, dest);
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + "-" + Date.now() + ext);
    },
  });

  return multer({ storage: storage });
}

export const colorUpload = makeUploadMiddleware('colors');
export const reviewUpload = makeUploadMiddleware('review');