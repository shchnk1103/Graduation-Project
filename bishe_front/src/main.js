import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import installElementPlus from "./plugins/element";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";

URLSearchParams.prototype.appendIfExists = function(key, value) {
  if (value !== null && value !== undefined) {
    this.append(key, value);
  }
};

const app = createApp(App);
installElementPlus(app);
app
  .use(store)
  .use(router)
  .use(ElementPlus)
  .mount("#app");
