<template>
  <div id="app">
    <div>
      <h1>Header</h1>
      <ul>
        <li><router-link to="/news">新闻</router-link></li>
        <li><router-link to="/about">关于本站</router-link></li>
      </ul>
    </div>
    <div><router-view/></div>
    <div>Footer</div>
  </div>
</template>