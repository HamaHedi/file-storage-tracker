import axios from '../../axios-instance';

import * as types from '../constants/archivedConstants';

export const archivedFileStart = () => {
  return { type: types.ADD_ARCHIVED_START };
};
export const archivedFileSuccess = (archivedFile) => {
  return { type: types.ADD_ARCHIVED_SUCCESS, archivedFile };
};
export const archivedFileFailed = () => {
  return { type: types.ADD_ARCHIVED_FAILED };
};

export const getAllArchivedStart = () => {
  return { type: types.GET_ARCHIVED_START };
};
export const getAllArchivedSuccess = (allArchiveds) => {
  return { type: types.GET_ARCHIVED_SUCCESS, allArchiveds };
};
export const getAllArchivedFailed = () => {
  return { type: types.GET_ARCHIVED_FAILED };
};

export const deleteArchivedFilesStart = () => {
  return { type: types.DELETE_ARCHIVED_START };
};
export const deleteArchivedFilesSuccess = (deletedArchived) => {
  return { type: types.DELETE_ARCHIVED_SUCCESS, deletedArchived };
};
export const deleteArchivedFilesFailed = () => {
  return { type: types.DELETE_ARCHIVED_FAILED };
};

export const archivedFile = (file) => async (dispatch) => {
  try {
    dispatch(archivedFileStart());
    axios
      .post('/archived/addArchived', {
        name: file.name,

        type: file.type,
        size: file.size,
        fileID: file.fileID,
      })

      .then((res) => {
        dispatch(archivedFileSuccess(res.archivedFile));
      });
  } catch (error) {
    dispatch(archivedFileFailed());
  }
};

export const getAllArchived = () => async (dispatch) => {
  try {
    dispatch(getAllArchivedStart());
    axios.get('/archived/get-archivedfile').then((res) => {
      dispatch(getAllArchivedSuccess(res.data));
    });
  } catch (error) {
    dispatch(getAllArchivedFailed());
  }
};

export const deleteArchivedFiles = (id) => async (dispatch) => {
  try {
    dispatch(deleteArchivedFilesStart());
    axios.delete('/archived/delete-Archivedfile/' + id).then((res) => {
      dispatch(deleteArchivedFilesSuccess(res.data));
    });
  } catch (error) {
    dispatch(deleteArchivedFilesFailed());
  }
};
