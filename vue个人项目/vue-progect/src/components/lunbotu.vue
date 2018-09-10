<template >
<div v-if="show">
    <Carousel autoplay v-model="value2" loop >
        <CarouselItem>
            <div class="demo-carousel">
                <img src="../assets/1.png">
            </div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel">
                <img src="../assets/2.png">
            </div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel">
                <img src="../assets/3.png">
            </div>
        </CarouselItem>
    </Carousel>
</div>
</template>
<script>
    export default {
        data () {
            return {
                value2: 0,
                show:false
            }
        },
        watch: {
            $route:{
                handler(){
                    console.log(this.$route.query.id)
                    if (this.$route.query.id==62) {
                        this.show=true
                    }else{
                        this.show=false
                    }
                },
                immediate: true,
                deep:true
            }
        }
    }
</script>
<style>
    .demo-carousel{
        height: 100%;
        width: 1220px;
        margin: 0 auto;
    }
    .demo-carousel img{
        width: 100%;
        margin: 0 auto;
    }
    .ivu-carousel-item{
        background-color: rgb(0, 217, 255);
    }
</style>

