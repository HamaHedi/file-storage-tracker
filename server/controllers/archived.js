import express from 'express';
import mongoose from 'mongoose';

import archivedFile from '../models/archivedModel.js';

const router = express.Router();

export const getArchivedFiles = async (req, res) => {
  try {
    const archivedFiles = await archivedFile.find();

    res.status(200).json(archivedFiles);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const archivedFiles = async (req, res) => {
  let {
    name,
    type,

    size,
    fileID,
  } = req.body;
  console.log('file archived', name, type, size, fileID);
  const newArchivedFile = new archivedFile({
    name,
    type,
    size,
    fileID,
    createdAt: new Date().toISOString(),
  });
  newArchivedFile.save((doc, error) => {
    if (!error) {
      console.log(doc);
      return res.status(201).json({ doc });
    }
  });
};

export const deleteArchivedFiles = async (req, res) => {
  let id = req.params.id;

  console.log('id to delete', id);
  if (!id) {
    return res.json({ error: 'All filled must be required' });
  } else {
    try {
      let deleteArchivedFile = await archivedFile.findByIdAndDelete(id);
      if (deleteArchivedFile) {
        return res.json({ id });
      }
    } catch (err) {
      return res.status(500).json({ err });
    }
  }
};

export default router;
