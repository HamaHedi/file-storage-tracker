import express from 'express';

import {
  postFile,
  getAllFiles,
  getLatestFiles,
} from '../controllers/uploads.js';

const router = express.Router();

router.post('/add', postFile);
router.get('/get-file', getAllFiles);
router.get('/get-latestfile', getLatestFiles);

export default router;
