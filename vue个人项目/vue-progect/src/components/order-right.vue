<template>
    <div class="account-content">
        <div class="account-order">
            <div class="gray-box">
                <div class="title columns-title pre-title">
                    <h2>我的订单</h2>
                </div>
                <div class="js-list-inner">
                    <div class="box-inner order-cart order-list-cart clear" v-for="(item,index) in dingDanList" :key="index">
                        <div class="gray-sub-title cart-title">
                            <span class="date">{{item.data}}</span>
                            <span class="order-id"> 订单号： <a href="javascript:;">{{item.dingDanId}}</a> </span>
                            <span class="order-detail"><router-link :to='{name:"DingDan",query:{dingDanId:item.dingDanId}}'>查看详情</router-link> </span> <span class="sub-total">应付总额</span>
                            <span class="num">数量</span>
                            <span class="price">单价</span>
                        </div>
                        <div class="cart">
                            <div class="cart-items clear" v-for="(option,index) in item.shopList" :key="index">
                                <div class="prod-info clear">
                                    <div class="items-thumb">
                                        <a href="javascript:;" target="_blank"><img :src="option.ali_image+'?x-oss-process=image/resize,w_80/quality,Q_100/format,webp'"></a>
                                    </div>
                                    <div class="items-params clear">
                                        <div class="name vh-center">
                                            <a href="javascript:;" target="_blank" :title="option.title">{{option.title}}</a>
                                        </div>
                                        <div class="detail"></div>
                                    </div>
                                    <div class="num">{{option.buyNumber}}</div>
                                    <div class="price">¥{{option.price}}</div>
                                </div>
                            </div>

                    </div>
                        
                        <div class="prod-operation">
                            <div class="total">¥ {{item.price}}</div>
                            <div class="status">
                                <router-link class="blue-small-btn js-payment-order" v-if="!item.isPay" :to='{name:"DingDan",query:{dingDanId:item.dingDanId}}'>现在付款</router-link>
                                <span v-else>已付款</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    computed:{
        dingDanList(){
            console.log(this.$store.state.dingDanList)
            return this.$store.state.dingDanList
        }
    }
}
</script>
<style>
*{
    box-sizing: content-box
}
</style>

