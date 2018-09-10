<template>
   <div class="account-content">
						<div class="account-address">
							<div class="gray-box clear">
								<div class="title pre-title">
									<h2 class="fn-left">收货信息</h2>
									<span class="gray-blue-btn js-add-address"><a class="add">添加新地址</a></span>
								</div>
								<div class="box-inner clear" v-for="(item,index) in shopAddress" :key="index">
									<div class="address-list-item default-item" data-id="765532">
										<div class="name fn-left">
											<div class="name-cell">{{item.name}}</div>
										</div>
										<div class="detail fn-left">
											<div class="detail-cell">{{item.sheng}} {{item.shi}} {{item.xian}} {{item.add}}</div>
										</div>
										<div class="operation fn-right">
											<div class="operation-cell">
												<a class="gray-edit-btn js-edit-address">修改</a>
												<span class="red-del-btn js-del-address" @click="shanChu(index)"> 
                                                    <a>删除</a><em>删除</em> 
                                                </span>
											</div>
										</div>
										<div class="default fn-right" v-show="item.default">  （默认地址）  </div>
										<div class="telephone fn-right">{{item.phone}}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
</template>
<script>
export default {
    computed:{
         shopAddress(){
            console.log(this.$store.state.shopAddress)
            return this.$store.state.shopAddress
        }
    },
    methods:{
        shanChu(index){
            console.log(index)
            this.$store.commit('shanChuAdd',{
                index:index
            })
        }
    }
}
</script>

