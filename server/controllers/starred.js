import express from 'express';
import mongoose from 'mongoose';

import starredFile from '../models/StarredModel.js';

const router = express.Router();

export const getStarredFiles = async (req, res) => {
  try {
    const starredFiles = await starredFile.find();

    res.status(200).json(starredFiles);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const starredFiles = async (req, res) => {
  let {
    name,
    type,

    size,
    fileID,
  } = req.body;
  console.log('file starred', name, type, size, fileID);
  const newStarredFile = new starredFile({
    name,
    type,
    size,
    fileID,
    createdAt: new Date().toISOString(),
  });
  newStarredFile.save((doc, error) => {
    if (!error) {
      console.log(doc);
      return res.status(201).json({ doc });
    }
  });
};

export const deleteStarredFiles = async (req, res) => {
  let id = req.params.id;

  console.log('id to delete', id);
  if (!id) {
    return res.json({ error: 'All filled must be required' });
  } else {
    try {
      let deleteStarredFile = await starredFile.findByIdAndDelete(id);
      if (deleteStarredFile) {
        return res.json({ id });
      }
    } catch (err) {
      return res.status(500).json({ err });
    }
  }
};

export default router;
