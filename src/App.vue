<template>
  <div id="app">
    <div class="header">
<!--      通过seller 传递对象-->
      <myheader :seller="seller"></myheader>
    </div>
    <div class="tab border-1px">
      <div class="tab-item">

        <router-link :to="'/goods'"><a class="tab-item-a">商品</a></router-link>

      </div>
      <div class="tab-item">

          <router-link :to="'/ratings'"><a class="tab-item-a">评论</a></router-link>

      </div>
      <div class="tab-item">
        <router-link :to="'/seller'"><a class="tab-item-a">商家</a></router-link>
      </div>
    </div>
    <!-- 当路由改变的时候，替换的内容就是在合格view -->
    <router-view></router-view>
  </div>
</template>

<script>
  import myheader from './components/header/header'
  // 设置一个状态码
  const ERR_OK = 0
  export default {
    data: function () {
      return {
        seller: {}
      }
    },
    created: function() {
      this.$http.get('/api/seller').then((res) => {
        res = res.body
        if (res.errno === ERR_OK) {
          this.seller = res.data
        }
      })
    },
    components: {
      myheader: myheader
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  /*#app .tab*/
  /*  display: flex*/
  /*  width:100%*/
  /*  height: 40px*/
  /*  .tab-item*/
  /*    flex: 1*/
  /*    text-align: center*/
  @import "../static/css/reset.css"
  @import "../static/css/my/apptab.css"
  @import "./common/stylus/base.css"

</style>
