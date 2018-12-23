<template>
    <div class="index">
       <HeadNav/>
       <List/>
    </div>
</template>
<script>
import HeadNav from '../components/HeadNav'
import List from './list'
export default {
    name:'index',
    components:{
        HeadNav,
        List
    }
}
</script>
<style scoped>
.index{
    width:100%;
    height: 100%;
    overflow: hidden;
}
</style>


