import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

import LayoutHeader from "@/components/LayoutHeader";
Vue.component("layout-header", LayoutHeader);

import LayoutFooter from "@/components/LayoutFooter";
Vue.component("layout-footer", LayoutFooter);

import ModalConfirm from "@/components/ModalConfirm";
Vue.component("modal-confirm", ModalConfirm);

import ModalAlert from "@/components/ModalAlert";
Vue.component("modal-alert", ModalAlert);

import ModalLoading from "@/components/ModalLoading";
Vue.component("modal-loading", ModalLoading);

import VueCookie from "vue-cookie";
Vue.use(VueCookie);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
