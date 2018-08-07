<template>
    <div >
      <div class="header-wrp ">
        <div class="header-content clearfix all">
          <div class="header-title fll"  @click="$router.push('/')">
            云笔记
          </div>
          <div class="flr">
            <i class="iconfont icon-sousuo " @click="$router.push('/search')"></i>
            <button class="header-btn "  @click="getislogin">写笔记</button>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
    export default {
        methods:{
          getislogin(){
            this.$axios.get('/islogin').then(res=>{
                   if(res.data.code==200){
                     this.$router.push('/Publish')
                   }
                   else{
                     alert('请登录')
                   }
            })

          },

        },
    }
</script>

<style scoped>
  .header-wrp{
    height: 45px;
    background: #398DEE;
  }
  .header-content{
    height: 45px;
    margin: 0 auto;
  }
  .header-title{
    height: 45px;
    color: #fff;
    font-size: 30px;
    font-weight: 400;
    line-height: 45px;
  }
  .flr{
    height: 45px;
    display: table;
  }
  .iconfont{
    padding-left: 10px;
    font-size: 28px;
    color: #fff;
    display: table-cell;
    vertical-align: middle;
  }
  .header-btn{
    display: table-cell;
    vertical-align: middle;
    color: #606266;
    width: 84px;
    height: 40px;
    background: #fff;
    border-color: #fff;
    border-radius: 4px;
  }



</style>

