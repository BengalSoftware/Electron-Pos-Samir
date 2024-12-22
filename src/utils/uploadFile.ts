
import { Request } from 'express';
import multer, { FileFilterCallback } from "multer";

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, "./src/uploads/assets/");
    },
    filename(req, file, callback) {
        callback(null, Date.now() + "-" + file.originalname);
    },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fileFilter = (req: Request, file: any, callback: FileFilterCallback) => {
    if (file.fieldname === "image" || file.fieldname === "whiteLogo" || file.fieldname === "blackLogo" || file.fieldname === "favIcon" || file.fieldname === "smallLogo") {
        if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/svg") {
            callback(null, true)
        } else {
            callback(
                new Error("File format not valid")
            )
        }
    } else {
        callback(new Error("There was an unknown error!"));

    }
};


const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2,
    },
    fileFilter: fileFilter
})

export default upload;