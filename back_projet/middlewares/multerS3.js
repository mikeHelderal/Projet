import multer  from 'multer';
import multerS3  from 'multer-s3';
import s3  from '../config/S3.js';


const storage = multerS3({
    s3,
    bucket: process.env.AWS_BUCKET_NAME,
    key: async (req, file, cb) => {
        console.log("DANS MULTER S3.0");
        const fileSize = parseInt(req.headers["content-length"])
        const imageMimeTypes = [
            'image/png',
            'image/jpeg',
        ];
        //console.log("DANS MULTERS3" ,file);
         // Chemin stocker tes images
         const {  originalname } = file
         const name = originalname.split('.');


         const ref = `${name[0]}-${req.body.title}.jpeg`
            const path = `./uploads/${ref}`
       // const path = `uploads/profile-picture.pn`;

        if (!imageMimeTypes.includes(file.mimetype)) {
            return cb(new Error('Seulement les fichiers .png et .jpeg sont autorisés !'));
        }

        if (fileSize > 400 * 1024) { // 400Ko
            return cb(new Error('Votre fichier doit être inferieur à 400Ko'));
        }

        cb(null, path);
    }
});

export default multer({ storage });