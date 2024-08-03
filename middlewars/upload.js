const multer = require('multer');

const DIR = './public/images'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, DIR)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const extArray = file.mimetype.split("/") ;
        const extension = '.' + extArray[1];
        console.log(extension)
        cb(null, file.fieldname + '-' + uniqueSuffix + extension)
    }
})

const extArr = [
    'image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/bmp', 
    'image/tiff', 'image/tif', 'image/webp', 'image/svg', 'image/heic', 'image/heif'
]

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) =>{
        if(extArr.includes(file.mimetype)){
            cb(null, true)
        }
        else{
            cb(new multer.MulterError('not a picture'));
        }
    }
});

module.exports = upload;

