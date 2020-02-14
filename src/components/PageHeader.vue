<template>
  <header class="page-header">
    <div class="center-container">
      <div class="page-name">NewsSpider</div>
      <ul class="page-nav">
        <li class="page-nav_item active"><router-link to="/">看新闻</router-link></li>
        <li class="page-nav_item">
          <router-link to="/about">关于本站</router-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      current: "news"
    };
  }
};
</script>

<style lang="scss" scoped>
.page-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 63px;
  background: #fff;
  box-shadow: 0 2px 8px #f0f1f2;
  z-index: 10;

  .page-name {
    float: left;
    color: #1890ff;
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
      font-size: 16px;
      transition: all 0.5s;
      border-top: 2px solid transparent;

      a {
        color: gray;
      }

      &:hover, &.active {
        border-top-color: #1890ff;
        a {
          color: #1890ff;
        }
      }
    }
  }
}
</style>
