import { atom } from 'recoil';

export const tokenState = atom({
  key: 'token',
  default: null,
});

export const userState = atom({
  key: 'userInfo',
  default: null,
});

export const guState = atom({
  key: 'gu',
  default: [],
});

export const dongState = atom({
  key: 'dong',
  default: [],
});

export const subCategoryState = atom({
  key: 'subCategory',
  default: [],
});

export const storeState = atom({
  key: 'storeList',
  default: [],
});

export const queryState = atom({
  key: 'query',
  default: {
    gu: 1,
    dong: 1,
    sub_category: 1,
    place_name: '',
    minimum_kakao_rating: null,
    minimum_naver_rating: null,
    minimum_instagram_hashtag: null,
  },
});

export const foodListState = atom({
  key: 'foodList',
  default: [],
});

export const bookmarkListState = atom({
  key: 'bookmarkList',
  default: [],
});

export const focusedIdState = atom({
  key: 'focusedId',
  default: {
    normal: null,
    small: null,
  },
});

export const totalState = atom({
  key: 'total',
  default: 0,
});
