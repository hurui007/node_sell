<template>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <!--eslint-disable-next-line-->
          <li v-for="(item,index) in goods" class="menu-item" v-bind:class="{'current':currentIndex === index}" @click="selectMenu(index,$event)">
            <span class="text border-1px">
              <span v-show="item.type > 0" class="icon" v-bind:class="classMap[item.type]">
              </span>
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <!--eslint-disable-next-line-->
          <li v-for="item in goods" class="food-list food-list-hook">
            <h1 class="title">{{item.name}}</h1>
            <!-- 每个分类有多个商品 -->
            <ul>
              <!--eslint-disable-next-line-->
              <li v-for="food in item.foods" class="food-item border-1px">
                <div class="icon" v-on:click="selectFood(food,$event)">
                  <img v-bind:src="food.icon">
                </div>
                <div class="content">
                  <h2 v-on:click="selectFood(food,$event)" class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}</span>
                  </div>
                  <div class="price">
                    <span class="now">{{food.price}}</span><span class="old" v-show="food.oldPrice">{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol v-bind:food="food"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shop-cart ref="shopcart" v-on:cart-addd="_drop" v-bind:select-foods="selectFoods" v-bind:delivery-price="seller.deliveryPrice" v-bind:min-price="seller.minPrice"></shop-cart>
      <food v-bind:food="selectedFood" ref="food"></food>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import shopCart from './../../components/shopcart/shopcart'
  import cartcontrol from './../../components/cartcontrol/cartcontrol'
  import food from './../../components/food/food'
  const ERR_OK = 0
  export default {
    name: 'goods',
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      }
    },
    computed: {
      // 计算属性,计算滚动位置
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      },
      selectFoods() {
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              console.info('一旦food的这个属性发生了变化，就会被检测到')
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      this.$http.get('/api/goods').then((res) => {
        res = res.body
        if (res.errno === ERR_OK) {
          this.goods = res.data
          this.$nextTick(() => {
            // $nextTick 这个方法可以保证在数据变化后更新dom
            // 在这里添加滚动条
            this._initScroll()
            // 左侧根据右侧滚动进行高亮
            this._calculateHeight()
          })
        }
      })
    },
    methods: {
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true // 可以添加点击效果
        })
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          probeType: 3,
          click: true
        })
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight() {
        // 根据类名找到这个元素
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          // 每个分类对应的dom高度
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      selectMenu(index, event) {
        // 点击左侧菜单，右侧滚动到指定位置
        if (!event._constructed) {
          return
        }
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let el = foodList[index]
        this.foodsScroll.scrollToElement(el, 300)
      },
      _drop(target) {
        console.info('goods drop')
        this.$refs.shopcart.drop(target)
      },
      selectFood (food, enent) {
        if (!event._constructed) {
          return
        }
        this.selectedFood = food
        console.info('调用子组件的方法')
        this.$refs.food.show()
      }
    },
    components: {
      shopCart,
      cartcontrol,
      food
    },
    events: {
      'cart-add'(target) {
        console.info(target)
        this._drop(target)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  @import "../../common/stylus/font-awesome.css";
  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px // 等分，缩放 ，占位空间
      width: 80px
      background: #f3f5f7
      /*margin-top: 3px*/
      .menu-item
        display: table  //为了垂直居中
        height 54px
        width: 56px
        line-height: 14px
        padding: 0 12px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: 700
          .text
            font-size: 16px
            line-height: 16px
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          border-1px(rgba(7,17,27,0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147,153,159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7,17,27,0.1))
        &:last-chlid
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 18px
            line-height: 14px
            font-size: 16px
            color: rgb(7,17,27)
          .desc,.extra
            line-height: 12px
            font-size: 14px
            margin-top: 4px
            color: rgb(147,153,159)
          .desc
            margin-bottom: 8px
            line-height: 12px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 18px
              font-size: 14px
              color: rgb(240,20,20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147,153,159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
