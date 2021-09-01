export default (axios) => ({
  getPlace: async (query) => {
    try {
      const { data } = await axios.post('/api/places', query);
      return data;
    } catch (e) {
      console.log(e);
    }
  },

  getPlaceByPage: async (page, pageSize, query) => {
    try {
      const { data } = await axios.post('/api/paging/places', query, {
        params: {
          page: page,
          size: pageSize,
        },
      });

      console.log(data, page, pageSize);

      return data;
    } catch (e) {
      console.log(e);
    }
  },
});
