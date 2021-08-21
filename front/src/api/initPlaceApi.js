export default (axios) => ({
  getPlace: async (query) => {
    try {
      const { data } = await axios.post('/api/places', query);
      return data;
    } catch (e) {
      console.log(e);
    }
  },
});
