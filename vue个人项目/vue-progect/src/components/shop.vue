<template>
    <div id="main">
        <div class="sku-box store-content">
            <!-- <div class="sort-option">
                <ul class="line clear">
                    <li><a href="javascript:;" class="active">综合排序</a></li>
                    <li><a href="javascript:;" class="">销量排序</a></li>
                    <li><a href="javascript:;" class="">价格低到高</a></li>
                    <li><a href="javascript:;" class="">价格高到低</a></li>
                </ul>
            </div> -->
            <div class="gray-box">
                <div class="item-box">
                    <shop-item v-for="item in list" :key='item.id' :option=item></shop-item>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ShopItem from '@/components/shop-item'
export default {
    components:{
        ShopItem
    },
    data(){
        return {
            list:[]
        }
    },
    watch:{
        $route(){
            this.getShopList()
        }
    },
    methods:{
        async getShopList(){
            let id = this.$route.query.id;
            if (!id) {
                id=62;
                this.$router.push({query:{id}})
            }
            let {data}  = await this.$api.getShopList({id});
            this.list=data.data.list
            console.log(this.list)
        }
    },
    created(){
        this.getShopList();
    }
}
</script>
<style>
#main{
    background-color: rgb(0, 217, 255);
    margin-top: 20px;
}
</style>


