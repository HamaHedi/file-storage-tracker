import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import uploadsRoutes from './routes/uploadsRoute.js';
import starredRoutes from './routes/starredRoute.js';
import archivedRoutes from './routes/archivedRoute.js';
const app = express();

app.use(bodyParser.json({ limit: '6gb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '6gb', extended: true }));
app.use(cors());

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './files/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '--' + file.originalname);
  },
});
const upload = multer({ storage: fileStorageEngine });
app.post('/single', upload.single('file'), (req, res) => {
  console.log(req.file);
  res.send('single fiel upload success');
});
app.post('/multiple', upload.array('files', 3), (req, res) => {
  console.log(req.files);
  res.send('multiple fiel upload success');
});

app.use('/uploads', uploadsRoutes);
app.use('/starred', starredRoutes);
app.use('/archived', archivedRoutes);
const CONNECTION_URL =
  'mongodb+srv://userName:paswword@cluster0.4ccgn.mongodb.net/?retryWrites=true&w=majority';

const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`server running on port :${PORT}`))
  )
  .catch((error) => console.log(error.message));
