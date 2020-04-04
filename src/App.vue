<template>
  <div id="app">
    <PageHeader/>
    <div class="body-wrapper center-container"><router-view /></div>
    <PageFooter/>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue';
import PageFooter from '@/components/PageFooter.vue';
  export default {
    components: {
      PageHeader,
      PageFooter,
    },
    data() {
      return {
        current: ['mail'],
      };
    },
    mounted() {
      const nextday = new Date('2020-04-05 00:00:00');
      const today = new Date();
      if (today < nextday) {
        const style = document.createElement('style');
        style.innerText = `
html {
  filter: grayscale(100%);
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale");
  filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
  -webkit-filter: grayscale(1);
}
`;
        document.head.appendChild(style);
      }
    }
  };
</script>

<style>
html, body {
  background: #ededed;
  height: 100%;
}
</style>

<style lang="scss" scoped>
#app {
  position: relative;
  min-height: 100%;
  padding-bottom: 120px;
}

.body-wrapper {
  padding-top: 84px;
  padding-bottom: 20px;
}
</style>
