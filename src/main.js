import { createApp } from "vue";

import router from "./router";
import store from "./store";

import App from "./App.vue";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./assets/css/blog.css";

// createApp(App).mount("#app");
const app = createApp(App);

app.use(router);
app.use(store);

app.mount("#app");
