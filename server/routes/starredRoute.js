import express from 'express';

import {
  starredFiles,
  getStarredFiles,
  deleteStarredFiles,
} from '../controllers/starred.js';

const router = express.Router();

router.post('/addStarred', starredFiles);
router.get('/get-Starredfile', getStarredFiles);
router.delete('/delete-starred/:id', deleteStarredFiles);

export default router;
