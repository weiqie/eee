<template>
  <div class="login">
    <div class="login-box">
      <h2>登录</h2>
      <form autocomplete="off" @submit.prevent="send">
        <div><input placeholder="请输入用户名" type="text" name="user" ref="userInput" /></div>
        <div><input placeholder="请输入密码" type="password" name="password" /></div>
        <div class="login-btn"><input type="submit" value="一键登入" /></div>
      </form>
      <div class="back-index">
        <router-link  to="/">首页>>></router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import Cookie from 'js-cookie'
  export default {
    methods:{
      send(){
        Cookie.set('login-qw','ajuan')
        console.log(this.$route)
        let ref = this.$route.name;
        if(ref){
          this.$router.push({name: 'Car'})
        }else{
          this.$router.push('/')
        }
      }
    }
  }
</script>
<style>
.login .login-box{
    width: 400px;
    margin: 50px auto;
  }
  .login-box h2 {
    font-size: 30px;
    text-align: center;
    margin-bottom: 30px;
  }
  .login input {
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 0;
    box-shadow: 0 1px 3px #666;
    padding: 0 10px;
  }
  .login .login-btn input {
    background:skyblue;
  }
  .back-index {
    padding: 20px 0px;
    line-height: 20px;
    text-align: center;
  }
</style>
