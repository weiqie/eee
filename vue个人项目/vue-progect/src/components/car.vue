<template>
    <div id="main">
        <div class="store-content hander-car">
            <div class="cart-box">
                <div class="title">
                    <h2>购物清单</h2>
                </div>
                <div class="cart-inner">
                    <!--没有购物提醒-->
                    <div class="empty-label hide">
                        <h3>您的购物车中还没有商品</h3>
                        <a class="link" href="javascript:;">现在选购</a>
                    </div>
                    <!--没有购物车-->
                    <div>
                        <div class="cart-table-title">
                            <span class="name">商品信息</span>
                            <span class="operation">操作</span>
                            <span class="subtotal">小计</span>
                            <span class="num">数量</span>
                            <span class="price">单价</span>
                        </div>
                        <div class="cart-table">
                            <div class="cart-group">
                                <!--购物列表-->
                                <div class="cart-top-items">
                                    <car-item
                                        v-for="(item,index) in shopCarList"
                                        :key="item.index"
                                        :option='item'
                                        :index='index'
                                    ></car-item>  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cart-bottom-bg fix-bottom fix-bottom-fixed">
                    <div class="cart-bar-operation">
                        <div>
                            <div class="choose-all js-choose-all">
                                <span 
                                    class="blue-checkbox-new" 
                                    @click="checkedAll"
                                    :class="{'checkbox-on': this.checkAll}"
                                ><a></a></span>
                                全选
                            </div>
                            <div class="delete-choose-goods" @click="removeQuan">删除选中的商品</div>
                        </div>
                    </div>
                    <div class="shipping">
                        <div class="shipping-box">
                            <div class="shipping-total shipping-num">
                                <h4 class="">
                                    已选择 <i>{{$store.getters.jianShu}}</i> 件商品
                                </h4>
                                <h5>
                                    共计 <i >{{$store.getters.total.totalBuyNumber}}</i> 件商品
                                </h5>
                            </div>
                            <div class="shipping-total shipping-price">
                                <h4 class="">
                                    应付总额：<span>￥</span><i>{{$store.getters.total.totalMoney}}</i> 
                                </h4>
                                <h5 class="shipping-tips">
                                    应付总额不含运费
                                </h5>
                                
                            </div>
                        </div>
                        <router-link
                            tag='span'
                            class="jianguo-blue-main-btn big-main-btn js-checkout "
                            :class="{'disabled-btn' : !check }"
                            to='/checkout'
                        > <a href="javascript:;">现在结算</a>
                        </router-link>
                        <!-- <span class="jianguo-blue-main-btn big-main-btn js-checkout ">
                            <a href="javascript:;">现在结算</a>
                        </span> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import CarItem from '@/components/carItem'
export default {
    components:{
        CarItem
    },
    data(){
        return {
            xuanzhong:true
        }
    },
    computed:{
        shopCarList(){
            return this.$store.state.shopCarList
        },
        checkAll(){
            return this.$store.state.shopCarList.every(item=>item.checked)
        },
        check(){
            return this.$store.state.shopCarList.some(item=>item.checked)
        }
    },
    methods:{
        checkedAll(){
            this.$store.commit('quanXuan',{
                xuanzhong:!this.checkAll
            })
        },
        removeQuan(){
            let shopCarList= this.shopCarList.filter(item=>item.checked)
            console.log(shopCarList)
            this.$store.commit('shanQuan',{
                shop:shopCarList
            })
        }
    }
}
</script>
<style>
*{
    box-sizing: content-box
}
</style>


