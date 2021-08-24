import axios from 'axios';
import initCityApi from './initCityApi';
import initPlaceApi from './initPlaceApi';

export const Axios = axios.create({
  baseURL: process.env.REACT_APP_SPRING_SERVER_API,
});

export const cityApi = initCityApi(Axios);
export const placeApi = initPlaceApi(Axios);
