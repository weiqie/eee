<template>
  <div id="app">
    <header-nav></header-nav>
    <router-view name="lunbo"></router-view>
    <router-view></router-view>
  </div>
</template>
<script>
import HeaderNav from '@/components/header'
export default {
  name: 'app',
  components:{
    HeaderNav
  }
  // created(){
  //   this.$api.getShopList().then(({data})=>{
  //     console.log(data)
  //   })
  // }
}
</script>
