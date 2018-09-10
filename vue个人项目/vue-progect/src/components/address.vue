<template>
    <div id="pop">
        <div class="module-dialog-layer" style="display: block;"></div>
        <div class="module-dialog clear module-dialog-address module-dialog-show">
        <div class="dialog-panel">
            <div class="topbar">
                <div class="dialog-tit clear">
                    <h4 class="js-dialog-title">管理收货地址</h4>
                </div>
                <span class="dialog-close" @click="closeAdd">x</span>
            </div>
            <div class="dialog-con js-dialog-container">
                <div class="animate-layer">
                    <div class="dialog-inner js-address-add">
                        <div class="save-address-box">
                            <div class="address-form">
                                <div class="module-form-row">
                                    <div class="form-item-v3">
                                        <input type="text" class="js-verify" placeholder="收货人姓名" 
                                            v-model="shopAddress.name">
                                        <div class="verify-error"></div>
                                    </div>
                                </div>
                                <div class="module-form-row ">
                                    <div class="form-item-v3 " :class="{'form-invalid-item':phoneError}">
                                        <input type="text" class="js-verify" placeholder="手机号"
                                            @blur="phoneNumber" 
                                            @focus="phoneN"
                                            v-model="shopAddress.phone">
                                        <div class="verify-error"></div>
                                    </div>
                                </div>
                                <VDistpicker
                                    :province="getListData.province"
                                    :city="getListData.city"
                                    :area="getListData.district"
                                    @province="onChangeProvince" 
                                    @city="onChangeCity"
                                    @area="onChangeArea" >
                                </VDistpicker>  
                                <div class="module-form-row">
                                    <div class="form-item-v3">
                                        <input type="text" class="js-verify" 
                                            placeholder="详细地址，如街道名称，楼层，门牌号码等"
                                            v-model="shopAddress.add"
                                        >
                                        <div class="verify-error"></div>
                                    </div>
                                </div>
                                <div class="module-form-row fn-clear">
                                    <input type="checkbox" class="hide">
                                    <span class="blue-checkbox"
                                        :class="{'blue-checkbox-on':shopAddress.default}"
                                        @click="setMoRen"
                                    ></span>设为默认
                                </div>
                                <div class="dialog-blue-btn big-main-btn  js-verify-address"
                                    :class="{'disabled-btn':isRight}"
                                    @click="chengGong"
                                >
                                    <a>保存</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>  
    </div>
</template>
<script>
import VDistpicker from 'v-distpicker'
export default {
     data() {
        return{
            getListData: {
                province: '',
                city: '',
                district: ''  
            },  
            shopAddress:{
                name:'',
                phone:'',
                sheng:'',
                shi:'',
                xian:'',
                add:'',
                default:false
            },
            phoneError:false,
            isRight:true
        }
    },
    watch:{
        shopAddress:{
            handler(){
                this.baoCun();
            },
            deep:true
        }
    },
    
    methods:{
        closeAdd(){
            this.$emit('close')
        },
        onChangeProvince(data) {
            console.log(data.value)
            this.shopAddress.sheng=data.value;
            this.getListData.province = data.value;
        },
        onChangeCity(data) {
            this.shopAddress.shi=data.value;
            this.getListData.city = data.value;
        },
        onChangeArea(data) {
            this.shopAddress.xian=data.value;
            this.getListData.district = data.value;
        },
        phoneNumber(){
             let myreg=/^[1][3,4,5,6,7,8][0-9]{9}$/;
             if (!myreg.test(this.shopAddress.phone)){
                 return this.phoneError=true
             }else{
                 return this.phoneError=false
             }

        },
        phoneN(){
            this.phoneError=false
        },
        setMoRen(){
            this.shopAddress.default=!this.shopAddress.default
        },
        baoCun(){
            if (this.shopAddress.name && !this.phoneError && this.shopAddress.sheng &&this.shopAddress.shi&&this.shopAddress.xian&&this.shopAddress.add) {
                this.isRight=false
            }else{
                this.isRight=true
            }
        },
        chengGong(){
            this.$store.commit('addTiJiao',{
                shopAdd:this.shopAddress
            })
            this.$emit('close')
        }
    },
    components: { VDistpicker }
}
</script>
<style>
.distpicker-address-wrapper select{
    width: 100%;
    height: 46px;
    padding: 0;
    margin-bottom: 15px;
    border-radius: 6px;
    border: 1px solid #CCC;
    background: #fff linear-gradient(#fafafa,#f5f5f5); 
}
.distpicker-address-wrapper select:nth-of-type(2){
    width: 48%;
}
.distpicker-address-wrapper select:nth-of-type(3){
    width: 48%;
}
</style>




