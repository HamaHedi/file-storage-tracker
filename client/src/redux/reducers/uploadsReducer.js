import * as types from '../constants/uploadConstants';
import { updateObject } from '../../shared/utility';
const initialState = {
  files: [],
  latestFile: [],
  uploadFileLoading: false,
  uploadFileError: false,
  getFileLoading: false,
  getFileError: false,
  getLatestFileLoading: false,
  getLatestFileError: false,
};
const uploadFileStart = (state, action) => {
  return updateObject(state, { uploadFileLoading: true });
};
const uploadFileSuccess = (state, action) => {
  const newFile = action.newFile;
  const currentFiles = state.files;
  const updatedFiles = currentFiles.concat(newFile);
  return updateObject(state, {
    uploadFileLoading: false,
    files: updatedFiles,
  });
};
const uploadFileFailed = (state, action) => {
  return updateObject(state, {
    uploadFileLoading: false,
    uploadFileError: true,
  });
};

const getAllFilesStart = (state, action) => {
  return updateObject(state, { getFileLoading: true });
};
const getAllFilesSuccess = (state, action) => {
  const allfiles = action.allfiles;

  return updateObject(state, {
    files: allfiles,
    getFileLoading: false,
  });
};
const getAllFilesFailed = (state, action) => {
  return updateObject(state, { getFileLoading: false, getFileError: true });
};

const getLatestFilesStart = (state, action) => {
  return updateObject(state, { getLatestFileLoading: true });
};
const getLatestFilesSuccess = (state, action) => {
  const latestfiles = action.latestfiles;

  return updateObject(state, {
    latestFile: latestfiles,
    getLatestFileLoading: false,
  });
};
const getLatestFilesFailed = (state, action) => {
  return updateObject(state, {
    getLatestFileLoading: false,
    getLatestFileError: true,
  });
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.ADD_FILE_START:
      return uploadFileStart(state, action);
    case types.ADD_FILE_SUCCESS:
      return uploadFileSuccess(state, action);
    case types.ADD_FILE_FAILED:
      return uploadFileFailed(state, action);

    case types.GET_FILE_START:
      return getAllFilesStart(state, action);
    case types.GET_FILE_SUCCESS:
      return getAllFilesSuccess(state, action);
    case types.GET_FILE_FAILED:
      return getAllFilesFailed(state, action);

    case types.GET_LATESTFILE_START:
      return getLatestFilesStart(state, action);
    case types.GET_LATESTFILE_SUCCESS:
      return getLatestFilesSuccess(state, action);
    case types.GET_LATESTFILE_FAILED:
      return getLatestFilesFailed(state, action);

    default:
      return state;
  }
};

export default reducer;
