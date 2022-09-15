import express from 'express';
import mongoose from 'mongoose';

import uploadedFile from '../models/uploadsModel.js';

const router = express.Router();

export const getAllFiles = async (req, res) => {
  try {
    const uploadedFiles = await uploadedFile.find();

    res.status(200).json(uploadedFiles);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getLatestFiles = async (req, res) => {
  try {
    const latestFiles = await uploadedFile.find().sort({ _id: -1 }).limit(5);

    res.status(200).json(latestFiles);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const postFile = async (req, res) => {
  let {
    name,
    type,

    size,
  } = req.body;
  console.log('file uploaded', name, type, size);
  const newuploadedFile = new uploadedFile({
    name,
    type,
    size,
    createdAt: new Date().toISOString(),
  });
  newuploadedFile.save((doc, error) => {
    if (!error) {
      console.log(doc);
      return res.status(201).json({ doc });
    }
  });
};

export default router;
