import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "";

    if (file.fieldname === "profilePic") {
      folder = "uploads/profile";
    } else if (file.fieldname === "aadharPic") {
      folder = "uploads/aadhar";
    } else {
      folder = "uploads/others";
    }

    
    const fullPath = path.join(__dirname, "../../", folder);

   
    fs.mkdirSync(fullPath, { recursive: true });

    cb(null, fullPath);
  },

  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.floor(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});


const upload = multer({ storage });

export default upload;
