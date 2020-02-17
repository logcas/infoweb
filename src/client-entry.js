import Vue from 'vue';
import {
  createApp
} from './app.js';
import ProgressBar from '@/components/ProgressBar.vue';

const progress = Vue.prototype.$progress = new Vue(ProgressBar).$mount();
document.body.appendChild(progress.$el);

Vue.mixin({
  beforeRouteUpdate(to, from, next) {
    progress.start();
    const {
      asyncData
    } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(() => {
        progress.finish();
        next();
      }).catch(() => {
        progress.fail();
        next();
      });
    } else {
      next()
    }
  }
})

const {
  app,
  router,
  store
} = createApp();

console.log('initState', window.__INITIAL_STATE__);

// if (window.__INITIAL_STATE__) {
//   store.replaceState(window.__INITIAL_STATE__);
//   router.onReady(() => {
//     app.$mount('#app');
//   });
// } else {
//   const matchedComponents = router.getMatchedComponents();
//   Promise.all(matchedComponents.map(Component => {
//     if (Component.asyncData) {
//       return Component.asyncData({
//         store,
//         router: router.currentRoute
//       });
//     }
//   })).then(() => {
//     app.$mount('#de-app');
//   });
// }

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

router.onReady(() => {

  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);
    let diffed = false;
    const activatedComponents = matched.filter((currentComponent, index) => {
      return diffed || (diffed = (prevMatched[index] !== currentComponent));
    });
    const asyncDataHooks = activatedComponents.map(Component => Component.asyncData).filter(fn => fn);
    if (!asyncDataHooks.length) {
      return next();
    }

    progress.start();
    Promise.all(asyncDataHooks.map(hook => hook({store, route: to})))
      .then(() => {
        progress.finish();
        next();
      }).catch(() => {
        progress.fail();
        next();
      });
  })

  app.$mount('#app');
});