<template>
    <div class="goods">
      <div class="menu-wrapper"></div>
      <div class="foods-wrapper"></div>
    </div>
</template>

<script>
  export default {
    name: 'goods'
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .goods
    display: flex
    position: absolute  /*绝对定位*/
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden /*超过页面显示会被隐藏*/
    .menu-wrapper
      flex：0 0 80px  /*三个参数，第一个是等分 ，第二个是缩放情况， 第三个是占位空间*/
</style>
