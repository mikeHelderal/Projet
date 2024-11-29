
import multer from 'multer'





const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb){
        const name = file.originalname.split('.');

        console.log("MULTERCONFIG ===> ", req.body)
        cb(null, name[0] + '-'+ req.body.title+ '.jpeg');
    }
})

const multerFilter = (req, file, callback) => {
    if (
        file.mimetype.split('/')[1] !== 'jpg' &&
        file.mimetype.split('/')[1] !== 'jpeg' &&
        file.mimetype.split('/')[1] !== 'png'
    ) {
        callback(new Error('Fichier non-conforme !'), false)
    } else {
        callback(null, true)
    }
}

const upload =multer({ storage: storage, fileFilter: multerFilter }).single('image')
export default upload ;