import { atom } from 'recoil';

export const tokenState = atom({
  key: 'token',
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
  default: [
    {
      id: 1,
      name: '상수동 밥한끼',
      naverRating: 4.5,
      kakaoRating: 4.5,
      instagramHashtag: 10000,
    },
    {
      id: 1,
      name: '상수동 밥한끼',
      naverRating: 4.5,
      kakaoRating: 4.5,
      instagramHashtag: 10000,
    },
    {
      id: 1,
      name: '상수동 밥한끼',
      naverRating: 4.5,
      kakaoRating: 4.5,
      instagramHashtag: 10000,
    },
    {
      id: 1,
      name: '상수동 밥한끼',
      naverRating: 4.5,
      kakaoRating: 4.5,
      instagramHashtag: 10000,
    },
  ],
});

export const totalState = atom({
  key: 'total',
  default: 0,
});
