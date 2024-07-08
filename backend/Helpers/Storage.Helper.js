import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";

const image = multer.diskStorage({
  destination: (req, file, cb) => {
    // Construct absolute path to the destination directory
    const destinationPath = path.resolve(__dirname, "../public/images");
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});

export const imageStorage = multer({ storage: image }).single("image");
