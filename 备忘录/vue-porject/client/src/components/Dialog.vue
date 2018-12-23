<template>
    <div class="dialog">
        <el-dialog
            :title="dialog.title"
            :visible.sync='dialog.show'
            :close-on-click-modal='false'
            :close-on-press-escape='false'
            :modal-append-to-body="false"
        >
        <div class="form">
            <el-form
                ref='form'
                :model='formData'
                :rules="form_rules"
                lable-width='120px'
                style="margin:10px;width:auto;"
            >
                <el-form-item label="备注:">
                    <el-input type="textarea" v-model="formData.title"></el-input>
                </el-form-item>
                <el-form-item  class="text_right">
                    <el-button @click="dialog.show = false">取 消</el-button>
                    <el-button type="primary" @click='onSubmit("form")'>提  交</el-button>
                </el-form-item>
            </el-form>
        </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name:'diaolog',
    data(){
        return{
            form_rules:{
                title: [
                    { required: true, message: "备注不能为空！", trigger: "blur" },
                    { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
                ]
            }
        }
    },
    props:{
        dialog:Object,
        formData:Object
    },
    methods:{
        onSubmit(form) {
            this.$refs[form].validate(valid => {
                if (valid) {
                //表单数据验证完成之后，提交数据;
                    const url =this.dialog.option == "add" ? "todo" : `todo/${this.formData.id}`;
                    console.log(url)
                    if (url=="todo") {
                        this.$axios.post(`https://todo.lanternfish.ai/${url}`, this.formData).then(res => {
                            // 操作成功
                            this.$message({
                                message: "保存成功！",
                                type: "success"
                            });
                            //隐藏弹出框
                            this.dialog.show = false;
                            this.$emit("update");
                        });
                    }else{
                        this.$axios.put(`https://todo.lanternfish.ai/${url}`, this.formData).then(res =>{
                             this.$message({
                                message: "保存成功！",
                                type: "success"
                            });
                            //隐藏弹出框
                            this.dialog.show = false;
                            this.$emit("update");
                        })
                    }
                    
                }
            });
        }
    }
}
</script>

