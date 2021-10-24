const { REACT_APP_TOKEN_KEY } = process.env;

export default (axios) => ({
    getAllBookmark: async (token) => {
        try {
            const { data } = await axios.get("/user/bookmark", {
                headers: {
                    [REACT_APP_TOKEN_KEY]: token,
                },
            });
            return data;
        } catch (e) {
            console.error(e);
            console.error("북마크 정보 불러오기 실패!");
            return null;
        }
    },

    createBookmark: async (token, id) => {
        try {
            const { data } = await axios.post(`/user/bookmark/${id}`, id, {
                headers: {
                    [REACT_APP_TOKEN_KEY]: token
                },
            });
            return data;
        } catch (e) {
            console.error(e);
            console.error("북마크 생성 실패!");
            return null;
        }
    }
    ,

    deleteBookmark: async (token, id) => {
        try {
            const { data } = await axios.delete(`/user/bookmark/${id}`, {
                headers: {
                    [REACT_APP_TOKEN_KEY]: token
                },
            });
            return data;
        } catch (e) {
            console.error(e);
            console.error("북마크 제거 실패!");
            return null;
        }
    }
});