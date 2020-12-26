import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import { topic } from "../module/topic/store";

const store = new Vuex.Store({
  state: {
    user: {
      role: "CEO",
    },
  },
  modules: {
    topic,
  },
});
export default store;
