import {
  CHANGE_BANNERS,
  CHANGE_RECOMMEND,
  ALBUM_FETCH_SUCCEEDED
} from './constants.js';

// 拆分homeReducer
const initialHomeState = {
  banners: [],
  recommends: [],
  newAlbums: []
}
function homeReducer(state = initialHomeState, action) {
  switch (action.type) {
    case CHANGE_BANNERS:
      return { ...state, banners: action.banners };
    case CHANGE_RECOMMEND:
      return { ...state, recommends: action.recommends };
    case ALBUM_FETCH_SUCCEEDED:
      return { ...state, newAlbums: action.albums }
    default:
      return state;
  }
}

export default homeReducer;