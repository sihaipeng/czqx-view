<template>
  <div>
    <el-form :model="loginForm" ref="loginForm">
      <el-form-item prop="name" label="用户名">
        <el-input type="text" v-model="loginForm.username"></el-input>
      </el-form-item>

      <el-form-item prop="password" label="密码">
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>

      <!--<el-form-item prop="verifyCode" label="验证码">-->
        <!--<el-input type="text" v-model="loginForm.verifyCode"></el-input>-->
      <!--</el-form-item>-->
    </el-form>
    <div>
      <el-button @click="doLogin()">登陆</el-button>
      <!--<el-button @click="changeVerifyCode()">更换验证码</el-button>-->
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        loginForm :{
          username:'',
          password:'',
          verifyCode:''
        }
      }
    },
    methods:{
      doLogin(){
        this.$refs.loginForm.validate(valid =>{
          if (valid){
            let params = Object.assign({},this.loginForm);
            this.$post("/sys/login",params).then(res =>{
              console.log(res)
            })
          }
        })
      }
    },
    mounted(){

    }
  }
</script>
