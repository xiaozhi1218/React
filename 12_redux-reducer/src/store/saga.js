import { call, put, all, takeEvery, takeLatest, take } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_HOME_MULTIDATA,
  ALBUM_FETCH_REQUESTED,
  ALBUM_FETCH_SUCCEEDED,
  ALBUM_FETCH_FAILED,
} from './home/constants';
import {
  changeBannersAction,
  changeRecommendAction
} from './home/actionCreators';

import * as Api from '../services/recommend';

function* fetchHomeMultidata(action) {
  const res = yield axios.get("http://123.207.32.32:8000/home/multidata");
  const banners = res.data.data.banner.list;
  const recommends = res.data.data.recommend.list;
  // yield put(changeBannersAction(banners));
  // yield put(changeRecommendAction(recommends));
  yield all([
    yield put(changeBannersAction(banners)),
    yield put(changeRecommendAction(recommends))
  ])
}

function* fetchAlbum(action) {
  try {
    const res = yield call(Api.getNewAlbums, action.payload.limit);
    yield put({ type: ALBUM_FETCH_SUCCEEDED, newAlbums: res.albums });
  } catch (e) {
    // yield put({ type: ALBUM_FETCH_FAILED, message: e.message });
    console.log(e);
  }
}

function* mySaga() {
  // takeLatest takeEvery区别:
  // takeLatest: 依次只能监听一个对应的action
  // takeEvery: 每一个都会被执行
  yield all([
    takeEvery(FETCH_HOME_MULTIDATA, fetchHomeMultidata),
    takeLatest(ALBUM_FETCH_REQUESTED, fetchAlbum),
  ]);
}

export default mySaga;