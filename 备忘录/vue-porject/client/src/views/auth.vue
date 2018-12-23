<template>
    <div class="auth">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">备忘录</span>
                <el-form :model="auth" :rules="rules" ref="authForm" label-width="90px" class="authFrom">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="auth.username" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type='password' v-model="auth.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type='primary' class="submit_btn" @click="submitForm('authForm')">登录</el-button>
                    </el-form-item>
                    <div class="tiparea">
                        <p>还没有账号？ 现在<router-link to='/user'>注册</router-link></p>
                    </div>
                </el-form>
            </div>
        </section>
    </div>
</template>
<script>
import jwt_decode from 'jwt-decode'
export default {
    name:'auth',
    data(){
        return {
            auth:{
                username:'',
                password:''
            },
            rules:{
               username:[
                    { required: true, message: "用户名不能为空", trigger: "blur" },
                    { min: 5, max: 12, message: "长度在 5 到 12 个字符", trigger: "blur" }
               ],
               password:[
                    { required: true, message: "密码不能为空", trigger: "blur" },
                    { min: 8, max: 20, message: "长度在 8 到 20 个字符", trigger: "blur" }
               ]
            }
        }
    },
    methods:{
        submitForm(formName){
            this.$refs[formName].validate(valid => {
                if (valid) {
                this.$axios
                    .post("https://todo.lanternfish.ai/auth", this.auth)
                    .then(res => {
                      //token
                      //console.log(res)
                        const {token} =res.data;
                        localStorage.setItem("eleToken",'JWT '+token)
                      //解析token
                        const decoded=jwt_decode(token);                        
                        //存储到vuex中
                        this.$store.dispatch("setIsAutnenticated",!this.isEmpty(decoded));
                        this.$store.dispatch("setUser",decoded)
                        this.$router.push("/index");
                    });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        isEmpty(value) {
            return (
                value === undefined ||
                value === null ||
                (typeof value === "object" && Object.keys(value).length === 0) ||
                (typeof value === "string" && value.trim().length === 0)
            );
        }
    }
}
</script>
<style scoped>
.auth {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 20%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.authFrom {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
</style>


