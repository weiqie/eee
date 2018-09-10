<template>
    <div class="cart-items">
        <div class="items-choose">
            <span 
                class="blue-checkbox-new" 
                @click="checkOne(index)"
                :class="{'checkbox-on':option.checked}"
            ><a></a></span>
        </div>
        <div class="items-thumb">
            <img :src="option.ali_image">
            <a href="javascript:;" target="_blank"></a>
        </div>
        <div class="name hide-row" >
            <div class="name-table">
                <a href="javascript:;" target="_blank">
                    {{option.title}}
                </a>
                <ul class="attribute">
                    <li>{{option.sub_title}}</li>
                </ul>
            </div>
        </div>
        <div class="operation">
            <a class="items-delete-btn" @click="remove(index)"></a>
        </div>
        <div class="subtotal">¥ {{option.buyNumber*option.price}}</div>
        <div class="item-cols-num">
            <div class="select js-select-quantity">
                <span class="down down-disabled" @click="jieJie(index)">-</span>
                <span class="num">{{option.buyNumber}}</span>
                <span class="up up-disabled" @click="jiaJia(index)">+</span>
                
            </div>
        </div>
        <div class="price">¥ {{option.price}}</div>
    </div>
</template>
<script>
export default {
    props:{
        option:Object,
        index:Number
    },
    methods:{
        remove(index){
            console.log(index)
            this.$store.commit('removeOne',{
                index:index
            })
        },
        jieJie(index){
            console.log(index)
            this.$store.commit('jie',{
                index:index
            })
        },
        jiaJia(index){
            console.log(index)
            console.log(11111,this.option)
            this.$store.commit('jia',{
                index:index
            })
        },
        checkOne(index){
            console.log(this.option)
            console.log(index)
            this.$store.commit('checkedOne',{
                index:index
            })
        }
    }
}
</script>

