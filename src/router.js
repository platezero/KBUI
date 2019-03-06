import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "main",
      component: () => import("./views/Main.vue")
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/About.vue")
    },
    {
      path: "/article/relate/:kmnote",
      name: "article_relate",
      component: () => import("./views/RelateArticle.vue")
    },
    {
      path: "/article/:kmnote",
      name: "article_view",
      component: () => import("./views/Article.vue")
    },
    {
      path: "/article",
      name: "article_create",
      component: () => import("./views/Article.vue")
    },
    {
      path: "/quill",
      name: "quill",
      component: () => import("./components/QuillTemplate.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue")
    }
  ]
});
