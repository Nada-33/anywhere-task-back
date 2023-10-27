import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/authentication.js";
import authRoute from "./Routes/authRoute.js"
import annoncementRoute from "./Routes/announcementRoute.js";
import courseRoute from "./Routes/coursesRoute.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//envoke
dotenv.config();
const app = express();
app.use(express.json());

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

//filestorage
//files locally stored using multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets')
        //file is saved in this folder
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({ storage });

//authentication routes with file 
app.post("/auth/register", upload.single("picture"), register);


//routes
app.use("/auth", authRoute);
app.use("/announcements", annoncementRoute)
app.use("/course",courseRoute )


//Mongodb 
const PORT = process.env.PORT || 3001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`server port ${PORT}`))
}).catch((error) => console.log(`there is monogoDb error in => ${error} `))
