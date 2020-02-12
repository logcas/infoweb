<template>
  <div>
    这是新闻列表页321321
    <ul>
      <li v-for="news in newsList" :key="news.url">{{ news.title }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  asyncData({ store, route }) {
    store.commit('setSearchCondition', { type: route.query.type, page: route.query.page });
    return store.dispatch('fetchNews');
  },
  computed: {
    newsList() {
      return this.$store.state.newsList;
    }
  }
}
</script>