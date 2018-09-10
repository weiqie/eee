<template>
    <ul class="nav-aside">
        <li class="nav-user">
            <!-- <a href="javascript:;">个人中心</a> -->
            <router-link to='/login'>个人中心</router-link>
            <div class="nav-user-wrapper">
                <div class="nav-user-list">
                    <dl class="nav-user-avatar">
                        <dd><span class="ng-scope"></span></dd>
                        <!-- <dt class="ng-binding">+86 138****9453</dt> -->
                    </dl>
                    <ul>
                        <router-link class="order" to='/order' tag='li'><a href="javascript:;">我的订单</a></router-link>
                        <!-- <li class="order"><a href="javascript:;">我的订单</a></li> -->
                    </ul>
                </div>
            </div>
        </li>
        <!--active-->
        <li class="nav-cart">
            <a href="javascript:;" 
                @mouseover="ShowShop"
            >购物车</a>
            <!--根据class改变颜色-->
            <span class="cart-empty-num cart-num">
                <i>{{$store.getters.totalQ.totalBuyNumber}}</i>
            </span>
            <div class="nav-cart-wrapper" 
                :style="{display: this.show===true ? 'block' : 'none'}"
                @mouseout="showNo"
                @mouseover="ShowShop"
            >
                <div class="nav-cart-list">
                    <!--购物车为空提示-->
                    <div class="empty" v-show="!shopCarList.length">
                        <h3>购物车为空</h3>
                        <p>您还没有选购任何商品，现在前往商城选购吧!</p>
                    </div>
                    <!--小购物车-->
                    <div class="full" v-show="shopCarList.length" >
                        <div class="nav-cart-items">
                            <ul>
                                <li 
                                    class="clear" 
                                    v-for="(item,index) in shopCarList"
                                    :key="item.index"
                                >
                                    <div class="cart-item js-cart-item cart-item-sell">
                                        <div class="cart-item-inner">
                                            <div class="item-thumb">
                                                <img :src="item.ali_image">
                                            </div>
                                            <div class="item-desc">
                                                <div class="cart-cell">
                                                    <h4>
                                                        <a href="#/item/100027401">{{item.title}}</a>
                                                    </h4>
                                                    <h6>
                                                        <span class="price-icon">¥</span><span class="price-num">{{item.price}}</span><span class="item-num">x {{item.buyNumber}}</span>
                                                    </h6>
                                                </div>
                                            </div>
                                            <div class="del-btn" @click="remove(index)">删除</div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="nav-cart-total">
                            <p>共 <strong class="ng-binding">{{$store.getters.total.totalBuyNumber}}</strong> 件商品</p>
                            <h5>合计：<span class="price-icon">¥</span><span class="price-num ng-binding" ng-bind="cartMenu.totalPrice">{{$store.getters.total.totalMoney}}</span></h5>
                            <h6>
                                <router-link to="/car" class="nav-cart-btn">去购物车</router-link>
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    </ul>
</template>
<script>
export default {
    data(){
        return {
            show:false
        }
    },
    computed:{
       shopCarList(){
           return this.$store.state.shopCarList
       } 
    },
    created(){
        let shopCarListLocalStorage = JSON.parse(localStorage.getItem('shop-buy')) || {};
        let shopCarList = shopCarListLocalStorage.shopCarList || [];
        console.log(shopCarList)
        let ids=shopCarList.map((item)=>{
            return item.sku_id;
        }).join(',');
        this.$store.dispatch('getShopCarListInfoAction',{
            ids:ids
        })
    },
    methods:{
        ShowShop(){
            this.show=true;
            console.log(this.show)
        },
        showNo(){
            this.show=false;
        },
        remove(index){
            console.log(this.shopCarList[index].sku_id)
            this.$store.commit('removeOne',{
               id:this.shopCarList[index].sku_id,
               index:index
            })
        }
    }
}
</script>
<style>

</style>


