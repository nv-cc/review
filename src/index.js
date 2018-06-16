import '@/common/util';
import '@/vue.use';
import Vue from 'vue';
import router from '@/router';
import 'normalize.css';
import '@/common/css/basic.css';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
// init vue
import index from '@/index.vue';

new Vue({
  el: '#app',
  router,
  render: ce => ce(index)
});
