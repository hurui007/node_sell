<template>
  <div class="cartcontrol">
    <transition name="move">
    <div class="cart-decrease" @click.stop.prevent="decreaseCart" v-show="food.count>0">
      <span class="inner fa fa-minus-circle"></span>
    </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add" @click="addCart" v-on:click="$emit('cart-add')">
      <i class="fa fa-plus-circle"></i>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'cartcontrol',
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart (event) {
        if (!event._constructed) {
          return
        }
        if (!this.food.count) {
          // 给这个对象添加一个之前没有的属性
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
        // this.$emit('cart.add', event.target)
      },
      decreaseCart (event) {
        if (!event._constructed) {
          return
        }
        if (this.food) {
          this.food.count--
        }
      }
    }
  }
</script >

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      transition: all 0.3s linear
      &.transition
        opacity: 1
        transform: translate3d(0,0,0)
      .inner
        displsy: inline-block
        font-size: 24px
        line-height: 24px
        color: rgb(0,160,220)
        transition: all 0.3s linear
        transform: rotate(0) // 初始状态

      &.move-enter-active,&.move-leave-active
        opacity: 0.4
        transform: translate3d(20px,0 ,0)
        .inner
          transform: rotate(360deg)
      &.move-enter,&.move-leave-to
        opacity: 0
        .inner
          opacity: 0
    .cart-count
      display: inline-block
      font-size: 24px
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 20px
      color: rgb(147,153,159)
      margin-right: 10px
    .cart-add
      display: inline-block
      padding: 6px
      font-size: 24px
      line-height: 24px
      color: rgb(0,160,220)

</style>
