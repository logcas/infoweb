<template>
  <header class="page-header">
    <div class="center-container">
      <div class="page-name">NewsSpider</div>
      <ul class="page-nav">
        <li class="page-nav_item" :class="{ active: current === 'news' }"><router-link to="/">看新闻</router-link></li>
        <li class="page-nav_item" :class="{ active: current === 'about' }">
          <router-link to="/about">关于本站</router-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  watch: {
    $route(to, from) {
      this.current = to.name;
    }
  },
  data() {
    return {
      current: this.$router.currentRoute.name
    };
  }
}
</script>

<style lang="scss" scoped>
.page-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 63px;
  background: #fff;
  box-shadow: 0 4px 10px 0 rgba(0,0,0,.05);
  border-bottom: 1px solid #e1e1e1;
  z-index: 10;

  .page-name {
    float: left;
    color: #5079d9;
    font-size: 30px;
    height: 63px;
    line-height: 63px;
  }

  .page-nav {
    float: right;
    list-style: none;
    height: 63px;
    line-height: 63px;

    &_item {
      float: left;
      padding: 0 20px;
      font-size: 14px;
      transition: all 0.5s;

      a {
        color: gray;
      }

      &:hover, &.active {
        a {
          color: #5079d9;
        }
      }
    }
  }
}
</style>
