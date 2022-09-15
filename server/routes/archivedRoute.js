import express from 'express';

import {
  archivedFiles,
  getArchivedFiles,
  deleteArchivedFiles,
} from '../controllers/archived.js';

const router = express.Router();

router.post('/addArchived', archivedFiles);
router.get('/get-archivedfile', getArchivedFiles);
router.delete('/delete-Archivedfile/:id', deleteArchivedFiles);

export default router;
