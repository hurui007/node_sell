<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left">
          <div class="logo-wrapper" v-on:click="togglelist">
            <div class="logo" v-bind:class="{'highlight':totalCount>0}">
              <i class="cart-icon fa fa-cart-plus" v-bind:class="{'highlight':totalCount>0}"></i>
            </div>
            <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
          </div>
          <div class="price" v-bind:class="{'highlight':totalCount>0}" >{{totalPrice}}元</div>
          <div class="desc">另需要配送费{{deliveryPrice}}元</div>
        </div>
        <div class="content-right" v-on:click="pay">
          <div class="pay" v-bind:class="payClass">{{payDesc}}</div>
        </div>
        <div class="ball-container">
            <!--eslint-disable-next-line-->
            <div  class="ball" v-for="(ball, index) in balls" v-show="ball.show" v-bind:key="index">
              <div class="inner"></div>
            </div>
        </div>
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" v-on:click="empty">清空</span>
          </div>
          <div class="list-content"  ref="listContent">
            <ul>
              <!--eslint-disable-next-line-->
              <li class="food" v-for="food in selectFoods">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>{{food.price*food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol v-bind:food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
    </div>
  </div>
    <transition name="move">
    <div class="list-mask" v-show="listShow" v-on:click="hidelist"></div>
    </transition>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import cartcontrol from '../cartcontrol/cartcontrol'

  export default {
    name: 'showcart',
    components: {cartcontrol},
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
       fold: true,
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
      },
      listShow() {
        if (!this.totalCount) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.fold = true
          return false
        }
        let show = !this.fold
        // 列表需要展开时，才需要加载滚动条
        if (show) {
          this.$nextTick(() => {
            // 当滚动条不存在时，才需要创建，否则只需要刷新就可以
            if (!this.scroll) {
              // eslint-disable-next-line vue/no-side-effects-in-computed-properties
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              })
            } else {
              this.scroll.refresh()
            }
          })
        }
        return show
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
      },
      togglelist () {
        if (!this.totalCount) {
          return
        }
        this.fold = !this.fold
      },
      empty () {
        this.selectFoods.forEach((food) => {
          food.count = 0
        })
      },
      hidelist () {
        this.fold = true
      },
      pay () {
        if (this.totalPrice < this.minPrice) {
          return
        }
        window.alert(`支付${this.totalPrice}元`)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/font-awesome.css";
  @import "../../common/stylus/mixin.styl"
  .shopcart
    position: fixed
    left:0
    bottom:0
    width:100%
    height: 48px
    z-index: 50
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
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0,160,220)
          transition: all 0.4
    .shopcart-list
      position: absolute
      left: 0
      bottom: 48px
      z-index: -1
      width: 100%
      background: #fff
    .list-header
      height: 40px;
      line-height: 40px;
      padding: 0 18px;
      background: #f3f5f7;
      border-bottom: 1px solid rgba(7,17,27,0.4)
      .title
        float: left
        font-size: 14px
        color: rgb(7,17,27)
        line-height: 36px
        margin: 0 10px
      .empty
        float: right
        font-size: 14px
        color: rgb(7,17,27)
        line-height: 36px;
        margin: 0px 10px;
    .list-content
      max-height: 217px;
      padding: 0 18px;
      overflow: hidden;
      background: #fff;
      .food
        position: relative
        padding: 12px 0;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(7,17,27,0.4)
        .name
          font-size: 14px
          line-height: 24px;
          color: rgb(7,17,27)
        .price
          position: absolute;
          font-size: 14px;
          bottom: 12px;
          right: 120px;
          font-weight: 700;
          color: rgb(240,20,20)
        .cartcontrol-wrapper
          position: absolute;
          bottom: 0px;
          right: 0;
  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    backdrop-filter: blur(10px)
    opacity: 1
    background: rgba(7,17,27,0.6)
    &.move-enter-active,&.move-leave-active
      transition: all 0.5s
      opacity: 1
      background: rgba(7,17,27,0.6)
    &.move-enter,&.move-leave-to
      opacity: 0
      background: rgba(7,17,27,0)
</style>
