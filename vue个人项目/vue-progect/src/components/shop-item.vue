<template>
    <div class="item">
        <div class="item-img">
            <img 
                :alt="showData.title" 
                :src="showData.ali_image"
                 v-lazy="showData.ali_image"
            >
        </div>
        <h6>{{showData.title}}</h6>
        <h3>{{showData.sub_title}}</h3>
        <div class="params-colors">
            <ul class="colors-list">
                <li
                    v-for="(item,index) in ImageData" :key="index"
                    @mouseover="currentIndex=index"
                >
                    <span :class="{active: index === currentIndex}">
                        <img :src="item">
                    </span>
                </li>
            </ul>
        </div>
        <div class="item-btns clearfix">
            <span class="item-gray-btn">
                <router-link :to="{name:'Item',params:{sku_id: showData.sku_id}}">查看详情</router-link>
            </span>
             <!-- <a href="" class="item-blue-btn" @click="addCar">加入购物车</a> -->
            <span class="item-blue-btn" @click="addCar">加入购物车</span>
        </div>
        <div class="item-price clearfix">
            <i>¥</i><span>{{showData.price}}</span>
        </div>
        <div class="discount-icon">false</div>
        <div class="item-cover">
            <a href="javascript:;" target="_blank"></a>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        option:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    data(){
        return {
            currentIndex:0
        }
    },
    computed:{
        showData(){
            return this.option.sku_list[this.currentIndex]
        },
        ImageData(){
            return this.option.sku_list.map(item => {
                return item.image
            })
        }
    },
    methods:{
        addCar(){
            console.log(this.showData)
            this.$set(this.showData,'buyNumber',1)
            this.$store.commit('addShopCarList',{
                shop:this.showData
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


