import { createStore } from "vuex";
import axios from "axios";
import users from "./users";
import books from "./book";

const count = {
  state: () => ({
    count: 0,
    loading: false,
  }),
  mutations: {
    inc(state) {
      state.count++;
    },
    dec(state) {
      state.count--;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    getUser: async ({ commit }) => {
      commit("setLoading", true);
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((res) => {
          console.log("get user", res);
        })
        .catch((e) => {
          console.log("get user", { e });
        })
        .finally(() => {
          console.log("get user", "final");
          commit("setLoading", false);
        });
    },
  },
};

const store = createStore({
  state: {
    name: "Vue",
  },
  modules: {
    user: users,
    count,
    books,
  },
});

export default store;
