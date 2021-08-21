export default (axios) => ({
  getGuList: async () => {
    try {
      const { data } = await axios.get('/api/gu');
      return data;
    } catch (e) {
      console.log(e);
    }
  },

  getDongListByGuId: async (id) => {
    try {
      const { data } = await axios.get(`/api/dong/${id}`);
      return data;
    } catch (e) {
      console.log(e);
    }
  },

  getSubCategory: async () => {
    try {
      const { data } = await axios.get('/api/sub_category');
      return data;
    } catch (e) {
      console.log(e);
    }
  },
});
