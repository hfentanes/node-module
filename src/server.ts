import dotenv from 'dotenv';
import express from 'express';
import "express-async-errors";
import morgan from 'morgan';
import multer from "multer";
import { getAll, getOneById, create, createImage, updateById, deleteById } from './controllers/planets';
import { logIn, signUp, logOut } from './controllers/users';
import authorize from './authorize.js';
import "./passport.js";

dotenv.config();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });
const app = express();
const PORT = process.env.PORT || 3000;

app.use("/uploads", express.static('uploads'));
app.use(morgan('dev'));
app.use(express.json());

app.get('/api/planets', getAll);
app.get('/api/planets/:id', getOneById);
app.post('/api/planets', create);
app.post('/api/planets/:id/image', upload.single('image'), createImage);
app.put('/api/planets/:id', updateById);
app.delete('/api/planets/:id', deleteById);

app.post("/api/users/login", logIn);
app.post("/api/users/signup", signUp);
app.get("/api/users/logout", authorize, logOut);

app.listen(PORT, () => {
  console.log(`App listening on port http://localhost:${PORT}`)
})