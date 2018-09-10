<template>
    <div id="main">
        <div class="content page-order-payment">
            <div class="gray-box clear">
                <div class="title">
                    <h2>支付订单</h2>
                </div>
                <div class="box-inner order-info">
                    <h3>提交订单成功</h3>
                    <p class="payment-detail">请在 <span>24 小时内</span>完成支付，超时订单将自动取消。</p>
                    <p class="payment-detail">我们将在您完成支付后的 72 小时内发货</p>    
                </div>
                <div class="box-inner payment-checkout-panel clear">
                    <span class="jianguo-blue-main-btn big-main-btn js-payment-order" @click="payN(dingDan[0].dingDanId)" v-if="!dingDan[0].isPay">
                        <a>现在支付</a>
                    </span>
                    <span v-else class="is-pay">已付款</span>
                    <span class="prices"> 应付金额：   <em><span>¥ </span>{{dingDan[0].price}}</em>   </span>
                </div>
            </div>
            <div class="confirm-detail">
                <div class="info-title">订单编号</div>
                <p class="info-detail">{{dingDan[0].dingDanId}}</p>
            </div>
            <div class="confirm-detail">
                <div class="info-title">收货信息</div>
                <p class="info-detail">姓名：{{dingDan[0].shopAdd.name}}</p>
                <p class="info-detail">联系电话：{{dingDan[0].shopAdd.phone}}</p>  
                <p class="info-detail">详细地址：{{dingDan[0].shopAdd.sheng}} {{dingDan[0].shopAdd.shi}} {{dingDan[0].shopAdd.xian}} {{dingDan[0].shopAdd.add}}</p>
            </div>
            <div class="confirm-detail">
                <div class="info-title">发票信息</div>
                <p class="info-detail">发票类型：电子发票</p>
                <p class="info-detail">发票抬头：{{dingDan[0].faPiaoName}}</p>
                <p class="info-detail">发票内容：购买商品明细</p>
            </div>
            <div class="confirm-table-title clear">
                <span class="name fn-left">商品信息</span>
                <span class="subtotal fn-right">小计</span>
                <span class="num fn-right">数量</span>
                <span class="price fn-right">单价</span>
            </div>
            <div class="confirm-goods-table">
                <div class="cart-items clear" v-for="(item,index) in dingDan[0].shopList" :key="index">
                    <div class="name fn-left hide-row">
                        <div class="name-cell"> 
                            <!-- <a href="http://localhost:8080/item/100023501" :title="item.title" target="_self">{{item.title}}</a><br> -->
                            <router-link :to="{name:'Item',params:{sku_id:item.sku_id}}"> {{item.title}} </router-link> <br>
                        </div>
                    </div>
                    <div class="subtotal fn-right">
                        <div class="subtotal-cell">¥ {{item.buyNumber*item.price}}</div>
                    </div>
                    <div class="goods-num fn-right">{{item.buyNumber}}</div>
                    <div class="price fn-right">¥ {{item.price}}</div> 
                </div>
            </div>
            <div class="order-discount-line">
                <p> 商品总计： <span>¥ {{dingDan[0].price}}</span> </p>
                <p> 运费： <span>+ ¥ 10.00</span> </p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    computed:{
        dingDan(){
            let dingDan=this.$store.state.dingDanList.filter(item=>{
                return item.dingDanId===this.$route.query.dingDanId
            })
            console.log(dingDan)
            return dingDan
        }
    },
    methods:{
        payN(id){
            this.$store.commit('payNow',{id:id})
            alert('成功支付'+(this.dingDan[0].price)+'元')
            this.$router.push({name:'OrderRight'})
        }
    }
}
</script>

