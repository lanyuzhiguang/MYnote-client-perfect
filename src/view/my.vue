<template>
  <div>
    <allheader></allheader>
    <div class="container" >
      <div class="title">更改图片</div>
      <div class="shangchuan">
        <label id="btn-wrap">
          <input type="file" name="pic"
                 accept="image/jpeg,image/png" @change="up" id="file-input">
           <img  :src="userimg" v-if="userimg">
           <i class="iconfont icon-jiahao" v-else></i>
        </label>
      </div>
      <button class="btn" @click="changeimg">更改图片</button>
    </div>
  </div>
</template>

<script>
  import allheader from '../components/allheader'
  export default {
    components:{
      allheader,
    },
    data(){
      return{
        userimg:'',
      }
    },
    methods:{
      up($event){
        // console.log($event)
        var file = $event.target.files[0];
        var form =new FormData();
        form.append("pic",file);
        this.$axios.post('/demoupload',form,{headers:{"Content-Type":"multipart/form-data"}}).then(res=>{
          this.userimg='/api'+res.data.data;
          // console.log(this.userimg);
        })
      },
      changeimg(){
        let userimg=this.userimg;
        console.log(userimg)
        if(!userimg){
        alert("请上传图片")

        }
        else{
          this.$axios.post('/changeimg',{userimg}).then(res=>{
            alert(res.data.msg)
          })
        }


      }
  }}
</script>

<style scoped>
  .container{
    margin: 0 auto;
    padding: 100px;
    margin-top: 50px;
    background: #fff;
    width: 300px;
    height: 300px;
  }
  .title{
    font-size: 20px;
    font-weight: 700;
    color:#398DEE;
  }

  #file-input{
    display: none;
  }
  #btn-wrap{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    border-radius: 4px;
    border: 1px solid #398DEE;
    margin-top: 15px;
    margin-left: 15px;
  }
  .icon-jiahao{
    font-size:80px;
    color: #398DEE;
  }
  .shangchuan{
    display: flex;
    flex-wrap: wrap;

  }
  .shangchuan img{
    width: 100px;
    height:100px;
  }
  .btn{
    margin-top: 50px;
    border: 1px solid #398DEE;
    background: #398DEE;
    height: 50px;
    width: 200px;
    border-radius: 4px;
    color: #fff;
    font-size: 20px;
  }
</style>
