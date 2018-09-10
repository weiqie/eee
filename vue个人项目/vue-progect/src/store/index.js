import Vue from 'vue'
import Vuex from 'vuex'
import {getShopSkus} from '@/server/index'
let shopCarListLocalStorage = JSON.parse(localStorage.getItem('shop-buy')) || {};
let shopCarListStorage = shopCarListLocalStorage.shopCarList || [];
let shopAddLocalStroge=JSON.parse(localStorage.getItem('shop-add')) || {};
let shopAddStroge=shopAddLocalStroge.shopAddress || [];
let shopDingDanLocalStorage=JSON.parse(localStorage.getItem('shop-ding')) || {};
let shopDingDanStroge= shopDingDanLocalStorage.dingDanList || [];
console.log(shopAddStroge)
Vue.use(Vuex)
let store=new Vuex.Store({
    state:{
        shopCarList:[],
        shopAddress:[
            {
                name:'王某某',
                phone:'13811111111',
                sheng:'北京市',
                shi:'市辖区',
                xian:'海淀区',
                add:'上地十街辉煌国际大商西6号楼319室',
                default:true
            }
        ],
        dingDanList:[]
    },
    getters:{
        //统计购买总数和总钱数
        total(state){
            console.log(state.shopCarList)
            let shopCarList= state.shopCarList.filter(item=>item.checked===true)
            return shopCarList.reduce((item1,item2) => {
                return {
                  totalMoney: item1.totalMoney + item2.price * item2.buyNumber,
                  totalBuyNumber: item1.totalBuyNumber + item2.buyNumber
                }
            },{
                totalMoney: 0,
                totalBuyNumber: 0
            })
        },
        totalQ(state){
            return state.shopCarList.reduce((item1,item2) => {
                return {
                  totalMoney: item1.totalMoney + item2.price * item2.buyNumber,
                  totalBuyNumber: item1.totalBuyNumber + item2.buyNumber
                }
            },{
                totalMoney: 0,
                totalBuyNumber: 0
            })
        },
        jianShu(state){
            return state.shopCarList.filter(item=>item.checked===true).length
        }
    },
    mutations:{
        addShopCarList(state,payload){
            console.log(state.shopCarList)
            console.log(payload.shop)
            let item=state.shopCarList.find(item=>item.sku_id===payload.shop.sku_id)
            console.log(item)
            if (item) {
                console.log(111)
                item.buyNumber+=payload.shop.buyNumber
            }else{
                Vue.set(payload.shop,'checked',true)
                state.shopCarList.push(payload.shop)
            }
        },
        replaceShopList(state,playload){  
            state.shopCarList = playload.list;
        },
        replaceShopadd(state,payload){
            state.shopAddress=payload.list;
        },
        replaceDingDan(state,payload){
            state.dingDanList=payload.list;
        },
        removeOne(state,payload){
            console.log(payload.index)
            if (payload.index!=-1) {
                state.shopCarList.splice(payload.index,1)
            }
        },
        jie(state,payload){
            if (payload.index!=-1) {
                state.shopCarList[payload.index].buyNumber--;
            }
            if (state.shopCarList[payload.index].buyNumber<1) {
                state.shopCarList[payload.index].buyNumber=1
                alert('购买数量不能为零')
            }
        },
        jia(state,payload){
            console.log(state.shopCarList)
            if (payload.index!=-1) {
                state.shopCarList[payload.index].buyNumber++;
            }
           console.log(state.shopCarList)
           if (state.shopCarList[payload.index].buyNumber>state.shopCarList[payload.index].limit_num) {
                state.shopCarList[payload.index].buyNumber--;
                alert('已达到购买上限')
           }
        },
        checkedOne(state,payload){
            if (payload.index!=-1) {
                state.shopCarList[payload.index].checked=!state.shopCarList[payload.index].checked;
            }
        },
        quanXuan(state,payload){
            state.shopCarList.forEach(item => {
                item.checked=payload.xuanzhong
            })
        },
        shanQuan(state,payload){
           console.log(payload.shop)
           payload.shop.forEach(item=>{
               state.shopCarList.forEach(abc=>{
                   if (item==abc) {
                       let index= state.shopCarList.findIndex(a=>a===abc)
                       state.shopCarList.splice(index,1)
                   }
               })
           })
        },
        addTiJiao(state,payload){
            if (payload.shopAdd.default===true) {
                state.shopAddress.forEach(item=>item.default=false)
            }
            state.shopAddress.push(payload.shopAdd)
        },
        dingDan(state,payload){
            state.dingDanList.unshift(payload.data)
            let i=state.shopCarList.length;
            while(i--){
                if (state.shopCarList[i].checked) {
                    state.shopCarList.splice(i,1)
                }
            }
        },
        payNow(state,payload){
            console.log(11)
            state.dingDanList.forEach(item=>{
                console.log(item)
                console.log(payload.id)
                if (item.dingDanId==payload.id) {
                    console.log(33)
                    console.log(item.isPay)
                    item.isPay=true;
                    return
                }
            })
        },
        shanChuAdd(state,payload){
            if (payload.index!=-1) {
                state.shopAddress.splice(payload.index,1)
            }
        }
    },
    actions:{
        getShopCarListInfoAction(store,payload){
            return getShopSkus(payload).then(({data})=>{
                let list=data.data.list.map((item)=>{
                    let option=shopCarListStorage.find(abc=>abc.sku_id==item.id)
                    return {
                        ...item.shop_info,
                        sku_id: item.id,
                        price: item.price,
                        buyNumber: option.buyNumber,
                        checked:true
                    }
                })
                store.commit('replaceShopList',{
                    list:list
                })
            })
        },
        getShopAddress(store){
            let list=shopAddStroge
            console.log(list)
            store.commit('replaceShopadd',{
                list:list
            })
            return list
        },
        getDingDan(store){
            let list = shopDingDanStroge
            console.log(list)
            store.commit('replaceDingDan',{
                list:list
            })
            return list
        }

    }
})
store.watch((state)=>{
   return {
       shopAddress:state.shopAddress,
       shopCarList:state.shopCarList,
       dingDanList:state.dingDanList
   }
},(newValue)=>{
    localStorage.setItem('shop-buy',JSON.stringify(newValue))
    localStorage.setItem('shop-add',JSON.stringify(newValue))
    localStorage.setItem('shop-ding',JSON.stringify(newValue))
},{
    deep:true
})
export default store;