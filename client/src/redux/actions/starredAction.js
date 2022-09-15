import axios from '../../axios-instance';

import * as types from '../constants/starredConstants';

export const starredFileStart = () => {
  return { type: types.ADD_STARRED_START };
};
export const starredFileSuccess = (starredFile) => {
  return { type: types.ADD_STARRED_SUCCESS, starredFile };
};
export const starredFileFailed = () => {
  return { type: types.ADD_STARRED_FAILED };
};

export const getAllStarredStart = () => {
  return { type: types.GET_STARRED_START };
};
export const getAllStarredSuccess = (allStarreds) => {
  return { type: types.GET_STARRED_SUCCESS, allStarreds };
};
export const getAllStarredFailed = () => {
  return { type: types.GET_STARRED_FAILED };
};

export const deleteStarredFilesStart = () => {
  return { type: types.DELETE_STARRED_START };
};
export const deleteStarredFilesSuccess = (deletedStarred) => {
  return { type: types.DELETE_STARRED_SUCCESS, deletedStarred };
};
export const deleteStarredFilesFailed = () => {
  return { type: types.DELETE_STARRED_FAILED };
};

export const starredFile = (file) => async (dispatch) => {
  try {
    dispatch(starredFileStart());
    axios
      .post('/starred/addStarred', {
        name: file.name,

        type: file.type,
        size: file.size,
        fileID: file.fileID,
      })

      .then((res) => {
        dispatch(starredFileSuccess(res.starredFile));
      });
  } catch (error) {
    dispatch(starredFileFailed());
  }
};

export const getAllStarred = () => async (dispatch) => {
  try {
    dispatch(getAllStarredStart());
    axios.get('/starred/get-Starredfile').then((res) => {
      dispatch(getAllStarredSuccess(res.data));
    });
  } catch (error) {
    dispatch(getAllStarredFailed());
  }
};

export const deleteStarredFiles = (id) => async (dispatch) => {
  try {
    dispatch(deleteStarredFilesStart());
    axios.delete('/starred/delete-starred/' + id).then((res) => {
      dispatch(deleteStarredFilesSuccess(res.data));
    });
  } catch (error) {
    dispatch(deleteStarredFilesFailed());
  }
};
