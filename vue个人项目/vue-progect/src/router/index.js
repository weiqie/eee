import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import '@/assets/css/header.css'
import '@/assets/css/reset.css'
import '@/assets/css/goodsList.css'
import '@/assets/css/item.css'
import '@/assets/css/cart.css'
import '@/assets/css/checkout.css'
import '@/assets/css/payment.css'
import '@/assets/css/address-pop.css'
import '@/assets/css/address.css'
import '@/assets/css/order.css'
import '@/assets/css/account.css'
let Shop = () => import('@/components/shop') 
let Item = () => import('@/components/item')
let Car = () => import('@/components/car')
let LunBo= () => import('@/components/lunbotu')
let Checkout=() =>import('@/components/checkout')
let DingDan =() =>import('@/components/dingdan') 
let Login=() =>import('@/components/login')
let Order=() => import ('@/components/order')
let OrderRight =() =>import('@/components/order-right')
let OrderAdd= () =>import('@/components/order-add')
export default new Router({
    mode:'history',
    routes:[
        {
            path: '/',
            redirect: '/shop'
        },

        {
            path:'/shop',
            name:'Shop',
            components:{
                lunbo:LunBo,
                default:Shop
            }
        },
        {
            path:'/item/:sku_id',
            name:'Item',
            component:Item
        },
        {
            path:'/car',
            name:'Car',
            component:Car
        },
        {
            path:'/checkout',
            name:'Checkout',
            component:Checkout
        },
        {
            path:'/dingdan',
            name:'DingDan',
            component:DingDan
        },
        {
            path:'/login',
            name:'Login',
            component:Login
        },
        {
            path:'/order',
            // name:'Order',
            component:Order,
            children:[
                {
                    path:'',
                    name:'OrderRight',
                    component:OrderRight
                },
                {
                    path:'/add',
                    name:'OrderAdd',
                    component:OrderAdd
                }
            ]
        }
    ]
})