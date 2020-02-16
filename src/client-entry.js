import {
  createApp
} from './app.js';

const {
  app,
  router,
  store
} = createApp();

console.log('initState', window.__INITIAL_STATE__);

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
  router.onReady(() => {
    app.$mount('#app');
  });
} else {
  const matchedComponents = router.getMatchedComponents();
  Promise.all(matchedComponents.map(Component => {
    if (Component.asyncData) {
      return Component.asyncData({
        store,
        router: router.currentRoute
      });
    }
  })).then(() => {
    app.$mount('#de-app');
  });
}