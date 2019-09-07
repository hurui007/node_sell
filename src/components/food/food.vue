<template>
  <div v-show="showFlag" class="food" ref="food">
    <div class="food-content">
      <div class="image-header">
        <img v-bind:src="food.image">
        <div class="back" v-on:click="hide"><i class="fa fa-angle-left fa-2x"></i></div>
      </div>
      <div class="content">
        <h1 class="title">{{food.name}}</h1>
        <div class="detail">
          <span class="sell-count">月售: {{food.sellCount}}</span>
          <span class="rating">好评率: {{food.rating}}</span>
        </div>
        <div class="price">
          <span class="now">￥{{food.price}}</span>
          <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
        </div>
      </div>
      <div class="cartcontrol-wrapper">
        <cartcontrol v-bind:food="food"></cartcontrol>
      </div>
      <div v-on:click.stop.prevent="addFirst(food,$event)" class="buy" v-show="!food.count || food.count === 0">加入购物车</div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import cartcontrol from './../cartcontrol/cartcontrol'
  import Vue from 'vue'
  export default {
    name: 'food',
    data () {
      return {
        showFlag: false
      }
    },
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      show () {
        this.showFlag = true
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      },
      hide () {
        this.showFlag = false
      },
      addFirst (food, event) {
        if (!event._constructed) {
          return
        }
        Vue.set(food, 'count', 1)
      }
    },
    components: {
      cartcontrol
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/font-awesome.css";
  .food
    position: fixed;
    left : 0;
    top: 0;
    bottom: 48px;
    z-index: 35;
    width: 100%;
    background: #fff
    .image-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 10px
        left: 0
        padding: 0 10px
        border-radius: 50%;
        background: blur(10px);
        backdrop-filter: blur(10px);
        background: gray;
        opacity: 0.7;
        .fa-angle-double-left
          color: #fff
    .content
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 8px
        font-size: 14px
        font-weight: 700
        color: rgb(7,17,27)
      .detail
        margin-bottom: 18px
        line-height: 10px
        height: 10px
        font-size: 0
        .sell-count,.rating
          font-size: 10px
          color: rgb(147,153,159)
        .sell-count
          margin-right: 12px
      .price
        font-weight: 700
        line-height: 24px
        .now
          margin-right: 8px
          font-size: 14px
          color: rgb(240,20,20)
        .old
          text-decoration: line-thorugh
          font-size: 10px
          color: rgb(147,153,159)
    .cartcontrol-wrapper
      position: absolute
      right: 12px
      bottom: 12px
    .buy
      position: absolute
      right: 18px
      bottom: 18px
      z-index: 10
      height: 24px
      line-height: 2px
      padding: 12px
      box-sizing: border-box
      font-size: 10px
      border-radius: 12px
      color: #fff
      background: rgb(0,160,220)
</style>
