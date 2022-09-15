import * as types from '../constants/archivedConstants';
import { updateObject } from '../../shared/utility';
const initialState = {
  archived: [],
  archivedFileLoading: false,
  archivedFileError: false,
  getArchivedLoading: false,
  getArchivedError: false,
  deleteArchivedLoading: false,
  deleteArchivedError: false,
};
const archivedFileStart = (state, action) => {
  return updateObject(state, { archivedFileLoading: true });
};
const archivedFileSuccess = (state, action) => {
  const archivedFile = action.archivedFile;
  const currentArchived = state.archived;
  const archivedFiles = currentArchived.concat(archivedFile);
  return updateObject(state, {
    archivedFileLoading: false,
    starred: archivedFiles,
  });
};
const archivedFileFailed = (state, action) => {
  return updateObject(state, {
    archivedFileLoading: false,
    archivedFileError: true,
  });
};

const getAllArchivedStart = (state, action) => {
  return updateObject(state, { getArchivedLoading: true });
};
const getAllArchivedSuccess = (state, action) => {
  const allArchiveds = action.allArchiveds;

  return updateObject(state, {
    archived: allArchiveds,
    getArchivedLoading: false,
  });
};
const getAllArchivedFailed = (state, action) => {
  return updateObject(state, {
    getArchivedLoading: false,
    getArchivedLoading: true,
  });
};

const deleteArchivedFilesStart = (state, action) => {
  return updateObject(state, { deleteArchivedLoading: true });
};
const deleteArchivedFilesSuccess = (state, action) => {
  const deletedArchived = action.deletedArchived.id;

  const currentArchived = state.archived;
  let updatedArchived = [];
  for (let i = 0; i < currentArchived.length; i++) {
    if (currentArchived[i]._id !== deletedArchived) {
      updatedArchived.push(currentArchived[i]);
    }
  }

  return updateObject(state, {
    archived: updatedArchived,
    deleteArchivedError: false,
  });
};
const deleteArchivedFilesFailed = (state, action) => {
  return updateObject(state, {
    deleteArchivedLoading: false,
    deleteArchivedError: true,
  });
};
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.ADD_ARCHIVED_START:
      return archivedFileStart(state, action);
    case types.ADD_ARCHIVED_SUCCESS:
      return archivedFileSuccess(state, action);
    case types.ADD_ARCHIVED_FAILED:
      return archivedFileFailed(state, action);

    case types.GET_ARCHIVED_START:
      return getAllArchivedStart(state, action);
    case types.GET_ARCHIVED_SUCCESS:
      return getAllArchivedSuccess(state, action);
    case types.GET_ARCHIVED_FAILED:
      return getAllArchivedFailed(state, action);

    case types.DELETE_ARCHIVED_START:
      return deleteArchivedFilesStart(state, action);
    case types.DELETE_ARCHIVED_SUCCESS:
      return deleteArchivedFilesSuccess(state, action);
    case types.DELETE_ARCHIVED_FAILED:
      return deleteArchivedFilesFailed(state, action);

    default:
      return state;
  }
};

export default reducer;
