import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "./api/axios";
import ElementUI from "element-ui";

import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "element-ui/lib/theme-chalk/index.css";
// import "./utils/validate";
import "./assets/font/iconfont.js";

Vue.config.productionTip = false;
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.use(ElementUI);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
