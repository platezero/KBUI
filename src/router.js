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
      path: "/article/relate/:note",
      name: "article_relate",
      component: () => import("./views/RelateArticle.vue")
    },
    {
      path: "/article/:note/:mode",
      name: "article_change",
      component: () => import("./views/Article.vue")
    },
    {
      path: "/article/create",
      name: "article_create",
      component: () => import("./views/Article.vue")
    },
    {
      path: "/article/:note",
      name: "article_view",
      component: () => import("./views/ArticleRead.vue")
    },
    {
      path: "/myarticle",
      name: "my_article",
      component: () => import("./views/MyArticle.vue")
    },
    {
      path: "/quill",
      name: "quill",
      component: () => import("./components/QuillTemplate.vue")
    },
    {
      path: "/developer",
      name: "developer",
      component: () => import("./views/Developer.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue")
    },
    {
      path: "/logout",
      name: "logout",
      component: () => import("./views/Logout.vue")
    }
  ]
});
