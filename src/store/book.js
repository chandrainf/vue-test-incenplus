import { postApi, getApi } from "../api";

const books = {
  state: () => ({
    loading: false,
    data: [],
    loading: true,
    book: {
      author: "",
      description: "",
      name: "",
      id: "",
    },
  }),
  mutations: {
    setData(state, payload) {
      const data = state;
      data[payload.key] = payload.value;
      state = data;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setBook(state, payload) {
      console.log({ payload });
      const data = state;
      data.book[payload.key] = payload.value;
      state = data;
    },
  },
  actions: {
    delBook: async ({ commit }, payload) => {
    },
    updateBook: async ({ commit }) => {
      commit("setLoading", true);
      postApi("/books/edit")
        .then((res) => {
          console.log("update", { res });
        })
        .catch((err) => {
          console.log("update", { err });
        })
        .finally(() => {
          console.log("update", "final");
          commit("setLoading", false);
        });
    },
    getBook: async ({ commit }, id) => {
      commit("setLoading", true);
      getApi("/books/detail", { id })
        .then((res) => {
          // console.log({ book: res.data });
          const {
            data: { id, name, description, createdBy },
          } = res;
          const book = {
            author: createdBy.fullname,
            name,
            description,
            id,
          };

          commit("setData", { key: "book", value: book });
        })
        .catch((err) => {
          console.log({ err });
        })
        .finally(() => {
          console.log("finish loading");
        });
    },
    getData: async ({ commit }) => {
      commit("setLoading", true);
      getApi("/books")
        .then((res) => {
          commit("setData", { key: "data", value: res.data.books });
        })
        .catch((err) => {
          console.log({ err });
        })
        .finally(() => {
          console.log("fetch book done");
          setTimeout(() => commit("setLoading", false), 2000);
        });
    },
  },
};

export default books;
