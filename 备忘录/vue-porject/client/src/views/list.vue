<template>
    <div class="fillcontain">
        <div>
             <el-form
                 :inline="true"
                 ref="add_data">
                
                <el-form-item class="btnRight">
                    <el-button type="primary" size ="small" icon="view" @click='handleAdd()'>添加</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table_container">
            <el-table
                :data="tableList"
                border
                max-height="450"
                style="width: 100%">
                <el-table-column
                    type="index"
                    label="序号"
                    align='center'
                    width="70">
                </el-table-column>
                <el-table-column
                    prop="title"
                    label="备注"
                    align='center'
                    width="600">
                    <template slot-scope="scope">  
                        <span style="color:#00d053"> {{ scope.row.title }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="operation"
                    align='center'
                    label="操作"
                    fixed="right"
                    width="180">
                    <template slot-scope='scope'>
                        <el-button 
                            type="warning" 
                            icon='edit' 
                            size="small"
                            @click='handleEdit(scope.row)'
                        >编辑</el-button>
                        <el-button 
                            type="danger" 
                            icon='delete' 
                            size="small"
                            @click='handleDelete(scope.row)'
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <Dialog :dialog='dialog' :formData='formData' @update='getUser'></Dialog>
    </div>
</template>
<script>
import Dialog from '../components/Dialog'
export default {
    name:'list',
    components:{
        Dialog
    },
    data(){
        return {
            tableList:[],
             formData:{
                title:''
            },
            dialog:{
                show:false,
                title:'',
                option:'edit'
            }
        }
    },
    created(){
        this.getUser();
    },
    methods:{
        getUser(){
            this.$axios
                .get('https://todo.lanternfish.ai/user/todo')
                .then(res =>{
                    this.tableList = res.data;
                   
                })
                .catch(err =>console.log(err))

        },
        //编辑
        handleEdit(row){
            console.log(row)
            this.dialog={
                show:true,
                title:'修改备忘录',
                option:'edit'
            }
            this.formData={
                title:row.title,
                id:row.id
            }
            console.log(this.formData)
        },
        //删除
        handleDelete(row){
            console.log(row)
            this.$axios.delete(`https://todo.lanternfish.ai/todo/${row.id}`)
            .then(res =>{
                this.$message('删除成功！');
                this.getUser();
            })

        },
        handleAdd(){
           this.dialog={
                show:true,
                title:'添加备忘录',
                option:'add'
            }
             this.formData={
                title:''
            }
        }
    }
}
</script>
<style scoped>
.fillcontain {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
}
</style>

