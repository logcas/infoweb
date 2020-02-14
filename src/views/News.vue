<template>
  <div class="news-wrapper">
    <ul class="news-media">
      <li class="news-media_item" @click="go(0, 0)" :class="{
        active: type === 0
      }">36Kr</li>
      <li class="news-media_item" @click="go(0, 1)" :class="{
        active: type === 1
      }">爱范儿</li>
    </ul>
    <ul class="news-list">
      <li v-for="news in newsList" :key="news.url" class="news-item">
        [<router-link to="/news" class="news-item_media" target="_blank">{{ news.media }}</router-link>]
        <a :href="news.url" class="news-item_title" target="_blank">{{
          news.title
        }}</a>
        <p class="news-item_time">收录时间：{{ news.inserted | formatDate }}</p>
      </li>
    </ul>
    <div class="pagination">
      <div class="switch-button" @click="go(page - 1, type)" v-show="hasLast">上一页</div>
      <div class="switch-button" @click="go(page + 1, type)" v-show="hasNext">下一页</div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/filters/date';
export default {
  asyncData({ store, route }) {
    store.commit("setSearchCondition", {
      type: route.query.type,
      page: route.query.page
    });
    return store.dispatch("fetchNews");
  },
  filters: {
    formatDate
  },
  computed: {
    newsList() {
      return this.$store.state.newsList;
    },
    hasNext() {
      return this.$store.state.hasMore;
    },
    hasLast() {
      return this.$store.state.page !== 0;
    },
    page() {
      return this.$store.state.page;
    },
    type() {
      return this.$store.state.type;
    }
  },
  methods: {
    fetchData(page, type) {
      this.$store.commit("setSearchCondition", {
        type,
        page
      });
      this.$store.dispatch("fetchNews");
    },
    go(page, type) {
      this.$router.push({
        path: '/',
        query: {
          page,
          type
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.news-wrapper {
  padding-bottom: 10px;
  background: #fff;
}

.news-media {
  font-size: 14px;
  border-bottom: 1px solid hsla(0, 0%, 59.2%, 0.1);
  color: #909090;
  list-style: none;
  overflow: hidden;
  user-select: none;

  &.active {
    color: #5079d9;
  }

  &_item {
    float: left;
    position: relative;
    padding: 15px 20px;
    cursor: pointer;

    &:hover,
    &.active {
      color: #5079d9;
    }
  }

  &_item + &_item {
    &::after {
      position: absolute;
      content: " ";
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 15px;
      width: 1px;
      background: hsla(0, 0%, 59.2%, 0.1);
    }
  }
}

.news-list {
  list-style: none;
  padding: 0;

  .news-item {
    padding: 20px 15px;
    font-size: 16px;
    border-bottom: 1px solid hsla(0, 0%, 59.2%, 0.1);

    &:hover {
      background: rgba($color: #000000, $alpha: 0.01);
    }

    &_title {
      position: relative;
      color: #333;
      font-weight: bold;

      &:hover {
        text-decoration: underline;
      }
    }

    &_media {
      color: #909090;

      &:hover {
        color: #5079d9;
      }
    }

    &_time {
      padding-top: 10px;
      font-size: 12px;
      color: #909090;
    }
  }
}

.pagination {
  text-align: center;
  padding: 20px 0;
  font-size: 14px;
  color: #909090;
  user-select: none;

  .switch-button {
    display: inline-block;
    padding: 5px 10px;
    cursor: pointer;

    &:hover {
      color: #5079d9;
    }
  }
}
</style>
