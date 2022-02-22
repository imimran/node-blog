import multer from 'multer';
import path from 'path'
import moment from 'moment'


//configuring multer storage for images
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/');
    },
    filename: (req, file, cb) => {

        const fileExt = path.extname(file.originalname)  //remove extntion
        const fileName = file.originalname
            .replace(fileExt, "")
            .toLowerCase()
            .split(' ')
            .join('-') + "-" + moment(Date.now()).format('DD_MM_YYYY_hh_mm_ss')
        cb(null, fileName + fileExt)


    }
});

//Filtering images for every file Field
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' ||
        file.mimetype === 'image/x-icon' ||
        file.mimetype === 'image/gif' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
        cb(new Error("Only .jpg, .png, .jpeg, x-icon or .gif formet allowed !"));
    }
};


const upload = multer({
    storage: fileStorage,
    fileFilter: fileFilter,
    limits: { fileSize: 1000000 } //1 MB //count as a byte
});

const formOnly = multer();


const uploadFile = upload.single('image');
const form = formOnly.none();


export default {  uploadFile, form }