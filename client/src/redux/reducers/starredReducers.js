import * as types from '../constants/starredConstants';
import { updateObject } from '../../shared/utility';
const initialState = {
  starred: [],
  starredFileLoading: false,
  starredFileError: false,
  getStarredLoading: false,
  getStarredError: false,
  deleteStarredLoading: false,
  deleteStarredError: false,
};
const starredFileStart = (state, action) => {
  return updateObject(state, { starredFileLoading: true });
};
const starredFileSuccess = (state, action) => {
  const starredFile = action.starredFile;
  const currentStarred = state.starred;
  const starredFiles = currentStarred.concat(starredFile);
  return updateObject(state, {
    starredFileLoading: false,
    starred: starredFiles,
  });
};
const starredFileFailed = (state, action) => {
  return updateObject(state, {
    starredFileLoading: false,
    starredFileError: true,
  });
};

const getAllStarredStart = (state, action) => {
  return updateObject(state, { getStarredLoading: true });
};
const getAllStarredSuccess = (state, action) => {
  const allStarreds = action.allStarreds;

  return updateObject(state, {
    starred: allStarreds,
    getStarredLoading: false,
  });
};
const getAllStarredFailed = (state, action) => {
  return updateObject(state, {
    getStarredLoading: false,
    getStarredError: true,
  });
};

const deleteStarredFilesStart = (state, action) => {
  return updateObject(state, { deleteStarredLoading: true });
};
const deleteStarredFilesSuccess = (state, action) => {
  const deletedStarred = action.deletedStarred.id;

  const currentStarred = state.starred;
  let updatedStarred = [];
  for (let i = 0; i < currentStarred.length; i++) {
    if (currentStarred[i]._id !== deletedStarred) {
      updatedStarred.push(currentStarred[i]);
    }
  }

  return updateObject(state, {
    starred: updatedStarred,
    deleteStarredError: false,
  });
};
const deleteStarredFilesFailed = (state, action) => {
  return updateObject(state, {
    deleteStarredLoading: false,
    deleteStarredError: true,
  });
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.ADD_STARRED_START:
      return starredFileStart(state, action);
    case types.ADD_STARRED_SUCCESS:
      return starredFileSuccess(state, action);
    case types.ADD_STARRED_FAILED:
      return starredFileFailed(state, action);

    case types.GET_STARRED_START:
      return getAllStarredStart(state, action);
    case types.GET_STARRED_SUCCESS:
      return getAllStarredSuccess(state, action);
    case types.GET_STARRED_FAILED:
      return getAllStarredFailed(state, action);

    case types.DELETE_STARRED_START:
      return deleteStarredFilesStart(state, action);
    case types.DELETE_STARRED_SUCCESS:
      return deleteStarredFilesSuccess(state, action);
    case types.DELETE_STARRED_FAILED:
      return deleteStarredFilesFailed(state, action);

    default:
      return state;
  }
};

export default reducer;
