<template>
<div>
  <allheader></allheader>
    <div class="home-content all">
     <div class="home-contentone clearfix">
      <div class="slides fll">
        <template>
          <el-carousel height="340px">
            <el-carousel-item  v-for="imgs in  viewpaper" :key="imgs._id">
              <img :src=imgs  class="slidesimg">
            </el-carousel-item>
          </el-carousel>
        </template>
      </div>
      <div class="home-login flr">
        <!--登陆前-->
        <div class="home-login-content" v-if="! usermsg.username">
          <input type="text" v-model="email" placeholder="邮箱" class="logininput">
          <input type="text" v-model="pwd" placeholder="密码" class="registerinput">
          <div><button class="loginbtn" @click="getlogin()">登录</button></div>
      <div><button class="registerbtn"  @click="$router.push('/register')">注册</button></div>
           <div class="fonts">
             <p class="pone">this.noted is pretend bility</p>
             <br>
             <p class="ptwo">IT牛人都在用的笔记</p>
           </div>
        </div>
       <!--登陆后-->
        <div class="home-login-content" v-else>
         <div class="login-after">
               <img  :src="usermsg.userimg">
         </div>
          <div class="login-name">
                   {{usermsg.username}}
          </div>
          <div class="login-email">
                 {{usermsg.email}}
          </div>
          <div>
            <button class="loginbtn" @click="$router.push('/my')">修改个人信息</button></div>
          <button class="loginbtn" @click="outlogin()">退出登录</button></div>

        </div>
        <!---->
      </div>
      <div class="home-contenttwo">
        <div class="home-contenttwo-item"
             v-for="items in itemarr" :key="items._id"
             @click="$router.push({path:'/Detail',query:{id:items._id}})">
          <div class="item-title clearfix">
            <div class="title-fll fll">
              <img :src=items.userimg >
            </div>
            <div class="title-flr flr" >
              <div class="titleflr-top">
                <span class="topfll">{{items.username}}</span>|
                <span class="topflr">{{items.publictitle}}</span>
              </div>
              <div class="titleflr-buttom clearfix">
                <span class="buttom-shuju fll">浏览：{{items.looknums}}</span>
                <span class="buttom-shuju fll" >回复：{{items.commontnumsid.length}}</span>
                <span class="buttom-shuju fll" >分类：</span>
                <span v-for="searcha in items.searcharr"
                      class="classify ">{{searcha}}</span>
              </div>
            </div>
          </div>
          <div class="item-content">
            {{items.contentText}}
          </div>
        </div>
      </div>
      </div>

    </div>

</template>
<script>
  import cookies from 'js-cookie'
  import allheader from './components/allheader'
    export default {
      name: "Home",
      components: {
        allheader,
      },
      data() {
        return {
           email: "",
           pwd: "",
           usermsg:{
            username: "",
            email: "",
             userimg:'',
          },

          itemarr:[],
          viewpaper:[],
        }
      },
      methods:{
        getlogin(){
          let param={
            email:this.email,
            pwd:this.pwd,
          };
          this.$axios.post('/login',param).then(res=>{
            if(res.data.code==200){
              let usermsg=res.data.usermsg;
              console.log(usermsg.username)
              cookies.set('username', usermsg.username, { expires: 14 });
              cookies.set('email', usermsg.email, { expires: 14 });
              cookies.set('userimg', usermsg.userimg, { expires: 14 });
              alert(res.data.msg)
              this. getusermsg();

            }
            else{
              alert(res.data.msg)
            }
          });
        },
        getusermsg(){
          let username= cookies.get('username');
          let email=cookies.get('email');
          let userimg=cookies.get('userimg');
          if(username && email){
            this.usermsg.username=username;
            this.usermsg.email=email;
            this.usermsg.userimg=userimg;
          }
        },
        outlogin(){
          this.usermsg.username="";
          this.usermsg.email="";
          this.usermsg.userimg="";
          cookies.remove('username');
          cookies.remove('email');
          cookies.remove('userimg');
            this.$axios.delete('/outlogin').then(res=>{
              // console.log(res.data)
              alert(res.data.msg)
            })
          },
         getarticle(){
          this.$axios.get('/articleitem').then(res=>{
            let itemarr=res.data.data;
            this.itemarr=itemarr;
          })
        },
          getimg(){
          this.$axios.get('/getimg').then(res=>{
            let oldimg=this.usermsg.userimg;
            let userimg=res.data.userimg;
            if(userimg===oldimg){
            }
            else{
              cookies.set('userimg',userimg);
              this.usermsg.userimg=cookies.get('userimg');
            }
          })},
        getviewpaper(){
          this.$axios.get('/getviewpaper').then(res=>{
           this.viewpaper=res.data.data.viewpaper
            console.log( this.viewpaper)

          })
        },
  },
mounted(){
     this.getusermsg();
     this.getarticle();
      this.getimg();
      this.getviewpaper();
      },
    }

</script>
<style scoped>
.home-content{
  margin: 0 auto;
}
.home-contentone{
  margin: 50px 0;
  height: 340px;
}
.slides{
  width: 750px;
}
.slidesimg{
    width: 750px;
    height: 340px;
  }
.home-login{
    padding: 20px;
  background: #fff;
  }
.home-login-content{
    text-align: center;
    padding-top: 10px;
    width: 300px;
    height: 292px;
    background: #fff;
  }
.logininput,.registerinput{
    width: 300px;
    height: 40px;
    margin-bottom: 10px;
    padding-left: 10px;
    font-size: 16px;
    color: #ccc;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
.loginbtn{
    width: 300px;
    height: 40px;
    margin-bottom: 15px;
    background: #398DEE;
    border: 1px solid #398DEE;
    color: #fff;
  }
.registerbtn{
  width: 300px;
  height: 40px;
  margin-bottom: 10px;
  color:#398DEE;
  border: 1px solid #398DEE;
  background: #fff;
}
.fonts{
  margin-top: 20px;
}
.pone{
    color: #ccc;
    font-size: 14px;
  }
.ptwo{
    color:#ccc;
    font-size: 18px;
  }
.login-after img{
  width: 70px;
  height:70px;
}
.login-name,.login-email{
  height: 40px;
  line-height: 40px;
  font-weight: 400;
  font-size: 18px;
  text-align: center;
}
.home-contenttwo{
  padding: 20px;
  width: 710px;
  background: #fff;

  }
.home-contenttwo-item{
  margin-bottom: 20px;
  cursor:pointer ;
}
.item-title{
  height: 80px;
}
  .title-fll img{
    width: 70px;
    height: 70px;
  }
  .title-flr{
    height: 80px;
  }
  .topfll{
    font-size: 16px;
    color: #398DEE;
    font-weight: 700;
  }
  .topflr{
    font-weight: 700;
    color: #000;
    font-size: 18px;
  }
  .titleflr-buttom{
    height: 30px;
    margin-top: 10px;
    background: #bbb;
    border: 1px solid #bbb;
    border-radius: 4px;
    width: 620px;
  }
.buttom-shuju{
  color: #000;
  padding-left: 20px;
  height: 30px;
  line-height: 30px;
}
.classify{
  margin-left: 10px;
  line-height: 30px;
}
.item-content{
  margin-top: 10px;
  font-size: 16px;
  color: #000;
}


</style>
