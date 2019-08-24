<template>
    <div class="shopcart">
      <div class="content">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" v-bind:class="{'highlight':totalCount>0}">
              <i class="cart-icon fa fa-cart-plus" v-bind:class="{'highlight':totalCount>0}"></i>
            </div>
            <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
          </div>
          <div class="price" v-bind:class="{'highlight':totalCount>0}" >{{totalPrice}}元</div>
          <div class="desc">另需要配送费{{deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" v-bind:class="payClass">{{payDesc}}</div>
        </div>
        <div class="ball-container">
          <transition-group name="drop">
            <!--eslint-disable-next-line-->
            <div  class="ball" v-for="(ball, index) in balls" v-show="ball.show" v-bind:key="index">
              <div class="inner"></div>
            </div>
          </transition-group>

        </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'showcart',
    data() {
     return {
       balls: [
         {
           show: false
         },
         {
           show: false
         },
         {
           show: false
         },
         {
           show: false
         },
         {
           show: false
         }
       ],
       dropBall: []
     }
    },
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [
            {
            }
          ]
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    computed: {
      totalPrice () {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        return total
      },
      totalCount () {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      payDesc () {
        if (this.totalPrice === 0) {
          return `还差${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice
          return `还差${diff}元起送`
        } else {
          return `去结算`
        }
      },
      payClass () {
        if (this.totalPrice < this.minPrice) {
          return 'not-enouth'
        } else {
          return 'enough'
        }
      }
    },
    methods: {
      drop (el) {
        console.info('1221')
        console.info(el)
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBall.push(ball)
            return
          }
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/font-awesome.css";
  .shopcart
    position: fixed
    left:0
    bottom:0
    width:100%
    height: 48px
    /*background: #000*/
    .content
      display: flex
      background: #141d27
      font-size: 0
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          vertical-align: top
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            background: #2b343c
            text-align: center
            &.highlight
              background: rgb(0,160,220)
            .cart-icon
              font-size: 24px
              line-height: 44px
              color: #80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #fff
            background: rgb(240,20,20)
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255,255,255,0.1)
          font-size: 16px
          color: rgba(255,255,255,0.4)
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          line-height: 24px
          margin: 12px 0 0 12px
          font-size: 16px
          color: rgba(255,255,255,0.4)
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size:16px
          color: rgba(255,255,255,0.4)
          font-weight: 800
          background: #2b333b
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .ball-container
      .ball
        position : fixed
        left: 32px
        bottom: 22px
        z-index: 200
        transition: all 0.4s
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0,160,220)
          transition: all 0.4
</style>
