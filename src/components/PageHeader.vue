<template>
  <header class="page-header">
    <div class="center-container">
      <div class="page-name">NewsSpider</div>
      <div class="page-nav-btn" @click="show">
        <div class="page-nav-btn-line"></div>
        <div class="page-nav-btn-line"></div>
        <div class="page-nav-btn-line"></div>
      </div>
      <ul class="page-nav" :class="{
        display: displayNav
      }">
        <li class="page-nav_item" :class="{ active: current === 'news' }">
          <router-link to="/">看新闻</router-link>
        </li>
        <li class="page-nav_item" :class="{ active: current === 'about' }">
          <router-link to="/about">关于本站</router-link>
        </li>
        <div class="page-nav_close" @click="hide"></div>
      </ul>
      <div class="page-nav-mask" @click="hide" v-show="displayNav"></div>
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
      current: this.$router.currentRoute.name,
      displayNav: false
    };
  },
  methods: {
    hide() {
      this.displayNav = false;
    },
    show() {
      this.displayNav = true;
    }
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
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid #e1e1e1;
  z-index: 10;

  .page-name {
    float: left;
    padding-left: 20px;
    color: #5079d9;
    font-size: 30px;
    height: 63px;
    line-height: 63px;
  }

  @media (max-width: 768px) {
    .page-nav {
      position: fixed;
      right: -100%;
      top: 0;
      height: 100%;
      width: 150px;
      list-style: none;
      line-height: 63px;
      background: #fff;
      box-shadow: -4px 0 10px 0 rgba(0, 0, 0, 0.05);
      z-index: 11;
      transition: right .5s;

      &.display {
        right: 0;
      }

      &_item {
        margin: 0 0 0 20px;
        font-size: 14px;
        transition: all 0.5s;
        border-bottom: 1px solid #e1e1e1;

        a {
          color: gray;
        }

        &:hover,
        &.active {
          a {
            color: #5079d9;
          }
        }
      }

      &_close {
        position: absolute;
        bottom: 100px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        left: 50%;
        transform: translateX(-40%);

        &:active {
          opacity: 0.5;
        }

        &::before,
        &::after {
          position: absolute;
          left: 0;
          width: 65px;
          height: 4px;
          background: #829bd6;

          content: " ";
        }

        &::before {
          top: 0;
          transform-origin: top left;
          transform: rotate(45deg);
        }

        &::after {
          bottom: 0;
          transform-origin: bottom left;
          transform: rotate(-45deg);
        }
      }
    }

    .page-nav-mask {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.05);
      z-index: 10;
    }

    .page-nav-btn {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      width: 35px;
      height: 35px;
      background: #fff;
      border: 1px solid #5079d9;
      border-radius: 2px;
      padding: 5px;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15);

      &:active {
        background: #e1e1e1;
      }

      &-line {
        margin: 3px 0;
        height: 4px;
        background-color: #5079d9;
      }
    }
  }

  @media (min-width: 769px) {
    .page-nav-btn {
      display: none;
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

        &:hover,
        &.active {
          a {
            color: #5079d9;
          }
        }
      }

      &_close {
        display: none;
      }
    }

    .page-nav-mask {
      display: none;
    }
  }
}
</style>
