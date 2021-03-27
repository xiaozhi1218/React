import { call, put, all, takeEvery, takeLatest, take, delay, select } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_HOME_MULTIDATA,
  ALBUM_FETCH_REQUESTED,
  ALBUM_FETCH_SUCCEEDED,
  ALBUM_FETCH_FAILED,
} from './home/constants';
import {
  changeBannersAction,
  changeRecommendAction,
  albumFetchSucceededAction
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
    yield delay(5000)
    const { albums } = yield call(Api.getNewAlbums, action.payload.limit);
    // yield put({ type: ALBUM_FETCH_SUCCEEDED, newAlbums: res.albums });
    yield put(albumFetchSucceededAction(albums));
  } catch (e) {
    // yield put({ type: ALBUM_FETCH_FAILED, message: e.message });
    console.log(e);
  }
}

function* watchHomeDataAaync() {
  yield takeEvery(FETCH_HOME_MULTIDATA, fetchHomeMultidata);
}

function* watchAlbumDataAsync() {
  yield takeLatest(ALBUM_FETCH_REQUESTED, fetchAlbum);
}

function* watchAndLog() {
  while (true) {
    const action = yield take('*')
    const state = yield select()

    console.log('action', action)
    console.log('state after', state)
  }
}

function* rootSaga() {
  // takeLatest takeEvery区别:
  // takeLatest: 依次只能监听一个对应的action，如果之前已经有一个action在处理中，那么处理中的 action 会被取消，只会执行当前的
  // takeEvery: 每一个都会被执行
  yield all([
    watchHomeDataAaync(),
    watchAlbumDataAsync(),
    watchAndLog(),
  ]);
}

export default rootSaga;


