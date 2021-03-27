import axios from 'axios';

import {
  CHANGE_BANNERS,
  CHANGE_RECOMMEND,
  FETCH_HOME_MULTIDATA,
  ALBUM_FETCH_SUCCEEDED,
  ALBUM_FETCH_REQUESTED,
  ALBUM_FETCH_FAILED
} from './constants.js';


// 轮播图和推荐的action
export const changeBannersAction = (banners) => ({
  type: CHANGE_BANNERS,
  banners
});

export const changeRecommendAction = (recommends) => ({
  type: CHANGE_RECOMMEND,
  recommends
});


// redux-thunk中定义的action函数
export const getHomeMultidataAction = (dispatch, getState) => {
  axios({
    url: "http://123.207.32.32:8000/home/multidata",
  }).then(res => {
    const data = res.data.data;
    dispatch(changeBannersAction(data.banner.list));
    dispatch(changeRecommendAction(data.recommend.list));
  })
}


// redux-saga拦截的action
export const fetchHomeMultidataAction = {
  type: FETCH_HOME_MULTIDATA
}

export const albumFetchRequestedAction = (payload) => ({
  type: ALBUM_FETCH_REQUESTED,
  payload
})

export const albumFetchSucceededAction = (albums) => ({
  type: ALBUM_FETCH_SUCCEEDED,
  albums
})

export const albumFetchFaileddAction = {
  type: ALBUM_FETCH_FAILED
}
