/* eslint-disable import/no-anonymous-default-export */
const { REACT_APP_TOKEN_KEY } = process.env;

export default (axios) => ({
  getUserInfo: async (token) => {
    // axios.defaults.headers.common['X-AUTH-TOKEN'] = token;
    try {
      const { data } = await axios.get("/user/info", {
        headers: {
          [REACT_APP_TOKEN_KEY]: token,
        },
      });
      return data;
    } catch (e) {
      console.error(e);
      console.error("사용자 정보 불러오기 실패!");
      return null;
    }
  },
});
