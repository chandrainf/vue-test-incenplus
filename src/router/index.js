import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";

const routes = [

  {
    path: "/login",
    name: "login",
    component: () => import("../pages/login/Index.vue"),
  },
  {
    path: "/",
    name: "app.index",
    component: () => import("../pages/home/Index.vue"),
  },
  {
    path: "/book",
    name: "book.index",
    meta: { requiresAuth: true },
    component: () => import("../pages/books/List.vue"),
  },
  {
    path: "/create",
    name: "book.create",
    meta: { requiresAuth: true },
    component: () => import("../pages/books/Create.vue"),
  },
  {
    path: "/book/edit/:id",
    name: "book.edit",
    meta: { requiresAuth: true },
    component: () => import("../pages/books/Edit.vue"),
  },
  {
    path: "/book/detail/:id",
    name: "book.detail",
    meta: { requiresAuth: true },
    component: () => import("../pages/books/Detail.vue"),
  },
  //{
    //path: "/login",
    //name: "login",
    //component: () => import("../pages/login/Index.vue"),
  //},
  {
    path: "/me",
    name: "user.me",
    meta: { requiresAuth: true },
    component: () => import("../pages/users/Index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: "active",
});
const token = localStorage.getItem("token");

const isAuthenticated = token !== null && token !== "";

router.beforeEach((to, from, next) => {

  console.log({ to, token, isAuthenticated });
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    
    if (!isAuthenticated) {
      next({
        name: "login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next(); 
  }

});

export default router;
