import { atom } from 'recoil';

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
