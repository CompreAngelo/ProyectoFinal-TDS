import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import Routes from "./Routes/routes.routes.js"
import path from "path";
import { fileURLToPath } from "url";
import { imageStorage } from "./Helpers/Storage.Helper.js";


const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../backend/public")));
const imagePath = "/public/images";
app.use(imagePath, express.static(path.join(__dirname, `..${imagePath}`)));
app.use(imageStorage);

app.use(cors());

app.use(Routes);

export default app;