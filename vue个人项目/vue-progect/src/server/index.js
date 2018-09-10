import axios from 'axios';
let instace=axios.create({
    baseURL : 'http://localhost:5000/api'
})
//获取商品列表
export function getShopList(params){
    let defaults={
        page_size:20,
        page:1,
        id: 62,
        sort:"sort"
    }
    Object.assign(defaults,params)
    return instace.get('/shop_list',{params:defaults})
}
//获取商品详情
export function getShopSkus(params){
    let defaults={
        ids:''
    }
    Object.assign(defaults,params)
    return instace.get('/shop_skus',{params:defaults})
}
export default {
    install(Vue){
        Vue.prototype.$api={
            getShopList,
            getShopSkus
        }
    }
}