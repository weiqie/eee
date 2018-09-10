<template>
    <div id="header">
        <div class="nav-global">
            <div class="container">
                <h1 class="nav-logo">
                    <a href="javascript:;"></a>
                </h1>
                <small-car></small-car>
                <ul class="nav-list">
                    <router-link
                        v-for="item in navConfig"
                        :key="item.id"
                        tag='li'
                        :to="{path:'/',query:{id:item.id}}"
                        :class="{active: currentId==item.id}"
                    >
                        <a>{{item.title}}</a>
                    </router-link>>
                </ul>
            </div>
        </div>
        
    </div>
</template>
<script>
let navConfig = [
    {
        title:'全部商品',
        id: 62
    },
    {
        title:'官方配件',
        id: 60
    },
    {
        title:'品牌周边',
        id: 69
    },
    {
        title:'第三方商品',
        id: 61
    }
]
import SmallCar from '@/components/smallCar'
export default {
    data(){
        return{
            navConfig,
            currentId:62
        }
    },
    components:{
        SmallCar
    },
    watch:{
        $route:{
            handler(){
                let id=this.$route.query.id;
                this.currentId=id
            },
            immediate:true
        }
    }
}
</script>

