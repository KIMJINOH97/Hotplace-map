import cookie from 'react-cookies';

export const getCookie = (name) => {
  const token = cookie.load(name);
  if (token !== null && token !== undefined) {
    return token;
  }
  return null;
};

export const getAllCookie = () => {
  return cookie.loadAll();
};
