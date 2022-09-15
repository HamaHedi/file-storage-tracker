import axios from '../../axios-instance';

import * as types from '../constants/uploadConstants';

export const uploadFileStart = () => {
  return { type: types.ADD_FILE_START };
};
export const uploadFileSuccess = (newFile) => {
  return { type: types.ADD_FILE_SUCCESS, newFile };
};
export const uploadFileFailed = () => {
  return { type: types.ADD_FILE_FAILED };
};

export const getAllFilesStart = () => {
  return { type: types.GET_FILE_START };
};
export const getAllFilesSuccess = (allfiles) => {
  return { type: types.GET_FILE_SUCCESS, allfiles };
};
export const getAllFilesFailed = () => {
  return { type: types.GET_FILE_FAILED };
};

export const getLatestFilesStart = () => {
  return { type: types.GET_LATESTFILE_START };
};
export const getLatestFilesSuccess = (latestfiles) => {
  return { type: types.GET_LATESTFILE_SUCCESS, latestfiles };
};
export const getLatestFilesFailed = () => {
  return { type: types.GET_LATESTFILE_FAILED };
};

export const uploadFile = (file) => async (dispatch) => {
  try {
    dispatch(uploadFileStart());
    axios
      .post('/uploads/add', {
        name: file.name,

        type: file.type,
        size: file.size,
      })

      .then((res) => {
        dispatch(uploadFileSuccess(res.newFile));
      });
  } catch (error) {
    dispatch(uploadFileFailed());
  }
};

export const getAllFiles = () => async (dispatch) => {
  try {
    dispatch(getAllFilesStart());
    axios.get('/uploads/get-file').then((res) => {
      dispatch(getAllFilesSuccess(res.data));
    });
  } catch (error) {
    dispatch(getAllFilesFailed());
  }
};

export const getLatestFiles = () => async (dispatch) => {
  try {
    dispatch(getLatestFilesStart());
    axios.get('/uploads/get-latestfile').then((res) => {
      dispatch(getLatestFilesSuccess(res.data));
    });
  } catch (error) {
    dispatch(getLatestFilesFailed());
  }
};
