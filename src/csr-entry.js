import Vue from 'vue';
import App from './App.vue';
import {
  createRouter
} from '@/router';
import {
  createStore
} from '@/store';
import 'normalize.css';
import '@/assets/style/basic.css';

Vue.mixin({
  beforeMount() {
    const {
      asyncData
    } = this.$options
    if (asyncData) {
      // 将获取数据操作分配给 promise
      // 以便在组件中，我们可以在数据准备就绪后
      // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
      this.dataPromise = asyncData({
        store: this.$store,
        route: this.$route
      })
    }
  }
});

Vue.mixin({
  beforeRouteUpdate(to, from, next) {
    const {
      asyncData
    } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})

const router = createRouter();
const store = createStore();
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');