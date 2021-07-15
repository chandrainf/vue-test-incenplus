import { postApi, getApi } from "../api";
const users = {
  state: () => ({
    user: {
      id: "",
      fullname: "",
      username: "",
    },
    token: "",
    isLogin: false,
    loading: false,
  }),
  mutations: {
    setData(state, payload) {
      const data = state;
      data[payload.key] = payload.value;
      state = data;
    },
    setLogin(state, payload) {
      state.isLogin = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    login: async ({ commit, dispatch }, payload) => {
      console.log({ payload });
      commit("setLoading", true);
      postApi("/users/login", payload)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("users", JSON.stringify(res.data.user));
          commit("setData", { key: "user", value: res.data.user });
          commit("setData", { key: "token", value: res.data.token });
          commit("setLogin", true);
          console.log("succse login");
        })
        .catch((err) => {
          console.log({ err });
        })
        .finally(() => {
          console.log("login done");
          commit("setLoading", false);
        });
    },
  },
};

export default users;
