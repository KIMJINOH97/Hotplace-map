import axios from 'axios';
import initCityApi from './initCityApi';
import initPlaceApi from './initPlaceApi';
import dotenv from 'dotenv';
dotenv.config();

export const Axios = axios.create({
  baseURL: 'http://3.36.26.169:8080',
});

export const cityApi = initCityApi(Axios);
export const placeApi = initPlaceApi(Axios);
