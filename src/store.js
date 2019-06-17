import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isShowLoading: false,
    isShowDialog: false,
    messageLoading: null,
    messageDialog: null
  },
  getters: {
    getIsShowLoading: state => {
      return state.isShowLoading;
    }
  },
  mutations: {
    showLoading(state) {
      state.isShowLoading = true;
    },
    hideLoading(state) {
      state.isShowLoading = false;
    }
  },
  actions: {
    showLoading(context) {
      context.commit("showLoading");
    },
    hideLoading(context) {
      context.commit("hideLoading");
    }
  }
});
