<template>
    <div id="main">
        <div class="content page-order-checkout checkout">
            <div class="js-checkout-address-box">
                <div class="gray-box clear">
                    <div class="title columns-title pre-title">
                        <h2>收货信息</h2>
                    </div>
                    <div class="box-inner js-checkout-address-panel ">
                        <div class="address-common-table js-multiple-address-panel">
                            <ul class="address-item-list clear js-address-item-list">
                                <li class="js-choose-address" 
                                    :class="{'selected-address-item':addIndex===index}"
                                    v-for="(item,index) in shopAddress"
                                    :key="index"
                                    @click="chooseAdd(index)"
                                >
                                    <div class="address-item">
                                        <div class="name-section">  {{item.name}}  </div>
                                        <div class="mobile-section">{{item.phone}}</div>
                                        <div class="detail-section">{{item.sheng}} {{item.shi}} {{item.xian}}<br> {{item.add}} </div>
                                    </div>
                                    <div class="operation-section">
                                        <span class="update-btn js-edit-address">修改</span>
                                        <span class="delete-btn js-delete-address">删除</span>
                                    </div>
                                </li>
                                <li class="add-address-item js-add-address" @click="showAdd">
                                    <p>使用新地址</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="gray-box">
                <div class="title">
                    <h2>发票信息</h2>
                </div>
                <div class="box-inner invoice-box js-invoice-box"> 
                    <p class="invoice-detail"> 发票类型：电子发票 </p> 
                    <div class="invoice-detail"> 发票抬头： 
                        <div class="radio-box"> 
                            <label> 
                                <input type="radio" class="hide"> 
                                <span class="blue-radio" 
                                    :class="{'blue-radio-on':geRen}"
                                    @click="checkedGeRen(true)"
                                ><a></a></span>  个人
                            </label> 
                            <label> 
                                <input type="radio" class="hide"> 
                                <span class="blue-radio" 
                                    :class="{'blue-radio-on':!geRen}"
                                    @click="checkedGeRen(false)"
                                ><a></a></span>  单位
                            </label> 
                        </div> 
                        <div class="module-form-row form-item fn-hide js-invoice-title" v-if="!geRen"> 
                            <div class="module-form-item-wrapper no-icon small-item"> 
                                <i v-show="!val">请填写公司发票抬头</i> 
                                <input type="text" class="js-verify" v-model="val"> 
                            </div> 
                        </div> 
                    </div> 
                    <p class="invoice-detail">发票内容：购买商品明细</p> <p class="invoice-label"> 电子发票是税务局认可的有效收付款凭证，可作为售后服务凭据。电子发票打印后可以用于企业报销。 </p>
                </div>
            </div>
            <div class="gray-box">
                <div class="title pre-title">
                    <h2>购物清单</h2> 
                </div>
                <div class="box-inner ui-goods-cart">
                    <div class="gray-sub-title cart-table-title"> 
                        <span class="name">商品名称</span> 
                        <span class="subtotal">小计</span> 
                        <span class="num">数量</span> 
                        <span class="price">单价</span> 
                    </div>
                    <div class="cart-table">
                        <div class="cart-group js-cart-group">
                            <div class="cart-items" 
                                v-for="item in shopCarList"
                                :key="item.index"
                            >
                                <div class="items-thumb">  
                                    <a href="javascript:;" target="_blank"><img :src="item.ali_image"></a>  
                                </div>
                                <div class="name hide-row">
                                    <div class="name-cell"> 
                                        <a href="javascript:;" :title="item.title" target="_blank">{{item.title}}</a>
                                    </div>
                                </div>
                                <div class="subtotal">
                                    <div class="subtotal-cell">  ¥ {{item.price*item.buyNumber}}  </div> 
                                </div>
                                <div class="goods-num">{{item.buyNumber}}</div>
                                <div class="price">¥ {{item.price}}</div>
                            </div>
                            
                            
                        </div>
                    </div>
                    
                </div>
                <div class="box-inner"> 
                    <div class="order-discount-line"> 
                        <p> 商品总计： <span>¥ {{$store.getters.total.totalMoney}}</span> </p> 
                        <p> 运费： <span>+ ¥ 10.00</span> </p>  
                        <p class="discount-line js-discount-cash"> <em>现金券</em>： <span> - 0 </span> </p>  
                    </div> 
                </div>
                <div class="box-inner"> 
                    <div class="last-payment clear"> 
                        <span class="jianguo-blue-main-btn big-main-btn payment-blue-bt fn-right js-checkout" @click="tiJiao"> 
                            <!-- <a>提交订单</a> -->
                            <a>提交订单</a> 
                        </span> <span class="prices fn-right">应付金额： <em>¥ {{$store.getters.total.totalMoney+10}}</em></span> 
                    </div> 
                </div>
            </div>
        </div>
        <addressPop v-if="addShow" @close='closeAdd'></addressPop>
    </div>
</template>
<script>
import addressPop from '@/components/address'
export default {
    data(){
        return{
            addShow:false,
            geRen:true,
            val:'',//发票公司信息
            addIndex:0 
        }
    },
    created(){
        this.$store.state.shopAddress.forEach((item,index) => {
            if (item.default) {
                this.addIndex=index;
                return
            }
        });
        this.$store.dispatch('getShopAddress')
       
    },
    computed:{
        shopCarList(){
            return  this.$store.state.shopCarList.filter(item=>item.checked===true)
        },
        shopAddress(){
            console.log(this.$store.state.shopAddress)
            return this.$store.state.shopAddress
        }
        
    },
    components:{
        addressPop
    },
    methods:{
        closeAdd(){
            this.addShow=false
            this.$store.state.shopAddress.forEach((item,index) => {
            if (item.default) {
                this.addIndex=index;
                return
            }
        });
        },
        showAdd(){
            this.addShow=true
        },
        checkedGeRen(bool){
            this.geRen=bool;
        },
        chooseAdd(index){
            this.addIndex=index;
        },
        tiJiao(){
            if (!this.geRen && !this.val) {
                return
            }
            let shopAdd=this.shopAddress[this.addIndex]
            if (this.geRen) {
                this.val='个人'
            }
            let nDate=new Date();
            let month=nDate.getMonth()+1;
            let day=nDate.getDate();
            if (month>=1 && month<=9) {
                month='0'+month
            }
            if (day>=1 && day<=9) {
                day='0'+day
            }
            let dingDanList={
                dingDanId:nDate.getTime(),
                shopList:this.shopCarList,
                price:this.$store.getters.total.totalMoney+10,
                faPiaoName:this.val,
                data:nDate.getFullYear()+'-'+month+'-'+day,
                shopAdd:shopAdd,
                isPay:false
            }
            console.log(dingDanList)
            this.$store.commit('dingDan',{
                data:dingDanList
            })
            this.$router.push({name:'DingDan',query:{dingDanId:dingDanList.dingDanId}})
        }
    }
}
</script>
<style>
*{
    box-sizing: content-box
}
</style>


