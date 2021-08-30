export default (axios) => ({
  getPlace: async (query) => {
    try {
      const { data } = await axios.post('/api/places', query);
      return data;
    } catch (e) {
      console.log(e);
    }
  },

  getPlaceByPage: async (page, pageSize) => {
    try {
      const { data } = await axios.get('/api/places', {
        params: {
          page: page,
          pageSize: pageSize,
        },
      });

      return data;
    } catch (e) {
      console.log(e);
    }
  },
});
