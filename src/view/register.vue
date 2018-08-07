<template>
    <div>
      <allheader></allheader>
      <div class="register-content">
        <div class="redister-title">
          新用户注册
        </div>
            <div><input type="text" v-model="username" placeholder="用户名"   class="registerinput"> </div>

        <div><input type="text" v-model="email" placeholder="邮箱" class="registerinput">
        </div>
        <div><input type="password" v-model="pwd" placeholder="密码" class="registerinput">
        </div>
        <div> <button class="registerbtn" @click="handlegister">注册</button></div>
      </div>
    </div>
</template>

<script>
  import allheader from '../components/allheader'
  export default {
    components: {
      allheader
    },
    data() {
      return {
        username: '',
        pwd: "",
        email: '',
      }
    },
    methods: {
      handlegister() {
        console.log(!(!this.username.trim()))
        console.log(!(!this.pwd.trim()))
        console.log(!(!this.email.trim()))
        if (!(!this.username.trim())&&!(!this.pwd.trim())&&!(!this.email.trim())) {
          console.log(this.username.trim())
          let params = {
          username: this.username,
          pwd: this.pwd,
          email: this.email,
        };
          this.$axios.post('/register',params).then(res=>{
            if (res.data.code ==200){
              console.log(res.data)
              alert('注册成功')
              this.$router.push('/')
            }
            else {
              console.log(res.data.msg)

              alert(res.data.msg)
            }
          })
        }
        else {
          alert('用户信息不能为空')
        }
      },
    },
  }
</script>

<style scoped>
  .register-content{
    padding-top: 30px;
    width: 714px;
    height: 406px;
    margin: 100px auto;
    background: #fff;
    text-align: center;
  }
  .redister-title{
    font-size: 30px;
    color: #000;
    font-weight: 700;
  }
  .registerinput{
    margin-top: 30px;
    width: 380px;
    height: 45px;
    padding:0 10px;
    font-size: 18px;
  }
  .registerbtn{
    padding: 10px;
    margin: 30px;
    width: 400px;
    height: 45px;
    background: #398DEE;
    border: 1px solid #398DEE;
    border-radius: 4px;
    color: #fff;
    font-size: 16px;
  }
</style>
