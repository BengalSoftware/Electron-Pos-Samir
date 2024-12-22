"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination(req, file, callback) {
        callback(null, "./src/uploads/assets/");
    },
    filename(req, file, callback) {
        callback(null, Date.now() + "-" + file.originalname);
    },
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fileFilter = (req, file, callback) => {
    if (file.fieldname === "image" || file.fieldname === "whiteLogo" || file.fieldname === "blackLogo" || file.fieldname === "favIcon" || file.fieldname === "smallLogo") {
        if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/svg") {
            callback(null, true);
        }
        else {
            callback(new Error("File format not valid"));
        }
    }
    else {
        callback(new Error("There was an unknown error!"));
    }
};
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2,
    },
    fileFilter: fileFilter
});
exports.default = upload;
