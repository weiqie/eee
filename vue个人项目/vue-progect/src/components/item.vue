<template>
    <div id="main">
        <div class="store-content item">
            <div class="item-box">
                <!--左侧轮播-->
                <div class="gallery-wrapper">
                    <div class="gallery">
                        <div class="thumbnail">
                            <ul>
                                <li 
                                    :class="{on:currentIndex === index}"
                                    v-for="(item,index) in images"
                                    :key="index"
                                    @mouseover="currentIndex=index"
                                >
                                    <img style="width:100%" :src="item+'?x-oss-process=image/resize,w_100/format,webp'">
                                </li>
                            </ul>
                        </div>
                        <div class="thumb">
                            <ul>
                                <li class="on">
                                    <img style="width:100%" :src="currentImage+'?x-oss-process=image/resize,w_659/format,webp'">
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!--右侧信息-->
                <div class="banner">
                    <div class="sku-custom-title">
                        <div class="params-price">
                            <span><em>¥</em><i>{{shopInfo.price}}</i></span>
                        </div>
                        <div class="params-info">
                            <h4>{{shopInfo.shop_info.title}}</h4>
                            <h6>{{shopInfo.shop_info.sub_title}}</h6>
                        </div>
                    </div>
                    <div class="sku-dynamic-params-panel">
                        <div class="sku-dynamic-params clear">
                            <span class="params-name">颜色</span>
                            <ul class="params-colors">
                                <li class="cur">
                                    <span>
                                        <img src="http://img01.smartisanos.cn/attr/v2/1000299/B37F37544921114CEF1EC01ED4DF44E4/20X20.jpg">
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div class="sku-dynamic-params clear">
                            <div class="params-name">数量</div>
                            <div class="params-detail clear">
                                <div class="item-num js-select-quantity">
                                    <span class="down down-disabled" @click="jie()">-</span>
                                    <span class="num">{{this.shopInfo.buyNumber}}</span>
                                    <span class="up up-disabled" @click="jia">+</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="sku-status">
                        <div class="cart-operation-wrapper clearfix">
                            <span class="blue-title-btn js-add-cart" @click="addCar">加入购物车</span>
                            <span class="gray-title-btn">现在购买</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            shopInfo:{
                shop_info:{}
            },
            currentIndex:0
        }
    },
    computed:{
       images(){
           return this.shopInfo.shop_info.ali_images
       },
       currentImage(){
           return this.images&&this.images[this.currentIndex]
       }
    },
    async created(){
        let sku_id=this.$route.params.sku_id;
        if (sku_id) {
            let {data}=await this.$api.getShopSkus({ids:sku_id})
            console.log(data)
            this.shopInfo = data.data.list[0];
        }
        this.$set(this.shopInfo,'buyNumber',1)
        console.log(this.shopInfo)
    },
    methods:{
        jie(){
           this.shopInfo.buyNumber--;
            if (this.shopInfo.buyNumber<1) {
               this.shopInfo.buyNumber=1
                alert('购买数量不能为0')
            }
        },
        jia(){
            this.shopInfo.buyNumber++;
            console.log(this.shopInfo.buyNumber)
        },
        addCar(){
            this.shopInfo=Object.assign({ali_image:this.shopInfo.shop_info.ali_image,
                                        sku_id:this.shopInfo.id,
                                        buyNumber:this.shopInfo.buyNumber
                                            },this.shopInfo)
            console.log(this.shopInfo.buyNumber)
            this.$store.commit('addShopCarList',{
                shop:this.shopInfo
            })
            
        }
    }
}
</script>

