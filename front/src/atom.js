import { atom } from 'recoil';

export const urlState = atom({
  key: 'url',
  default: 'http://localhost:8080',
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

export const placeState = atom({
  key: 'store_list',
  default: [],
});

export const queryState = atom({
  key: 'query',
  default: {
    gu: null,
    dong: null,
    subCategory: null,
    keyword: null,
  },
});
