import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

function fetchNewsFromServer(type, page) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [{
          url: 'http://www.baidu.com',
          title: 'fsafsamfsmdklfmskldmfklakl'
        },
        {
          url: 'http://www.baidu.com',
          title: 'fsafsamfsmdklfmskldmfklakl'
        }, {
          url: 'http://www.baidu.com',
          title: 'fsafsamfsmdklfmskldmfklakl'
        }, {
          url: 'http://www.baidu.com',
          title: 'fsafsamfsmdklfmskldmfklakl'
        }, {
          url: 'http://www.baidu.com',
          title: 'fsafsamfsmdklfmskldmfklakl'
        }, {
          url: 'http://www.baidu.com',
          title: 'fsafsamfsmdklfmskldmfklakl'
        },
      ];
      resolve(data);
    })
  });
}

export function createStore() {
  return new Vuex.Store({
    state: {
      type: 0,
      page: 0,
      newsList: []
    },
    actions: {
      fetchNews({
        commit,
        state
      }) {
        return fetchNewsFromServer(state.type, state.page).then(data => {
          commit('setNews', {
            news: data
          });
        });
      }
    },
    mutations: {
      setSearchCondition(state, {
        type,
        page
      }) {
        type = isNaN(+type) ? 0 : +type;
        page = isNaN(+page) ? 0 : +page;
        page = Math.max(page, 0);
        state.type = type;
        state.page = page;
      },
      setNews(state, {
        news
      }) {
        state.newsList = news;
      }
    }
  });
}