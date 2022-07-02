const multer = require("multer");

// file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // cb=> call back
        cb(null, './funbook_images')
    },
    filename: (req, file, cb) => {
        cb(null,  Date.now() + file.originalname)
    }
})

// we need to filtering the files -jpg
const filter = (req, file, cb) => {
    if (file.mimetype == 'image/PNG' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/gif' || file.mimetype == 'image/jpeg') {
        // correct format
        cb(null, true)
    } else {
        // incorrect format 
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    fileFilter: filter
})
module.exports = upload;