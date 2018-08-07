<template>
<div>
  <allheader></allheader>
  <div class="detailcontent">
    <div class="titlecontent">
      <div class="title">{{detail.publictitle}}</div>
      <span class="author">作者:</span>
      <span class="myname">{{detail.username}}</span>
      <span class="time">{{detail.createdAt|time}}</span>
    </div>
    <div class="content">
      {{detail.content}}
    </div>
  </div>

  <div class="reply clearfix">
  <div class="reply-title">
    回复
  </div>
  <div class="reply-content">

    <textarea name="" id="" cols="30" rows="10" v-model="replycontent">

    </textarea>
    <div><button class="reply-btn flr" @click="upreplay">提交</button></div>
  </div>
  </div>
  <div class="getreply">
    <div class="replyall">热门评论</div>
    <div class="getreply-item clearfix" v-for="item in replyarr">
      <div class="replyfll fll">
        <img :src=item.replyimg >
      </div>
      <div class="replyflr flr">
        <div class="replyname">{{item.replyname}}</div>
        <div class="replycontainer">
       {{item.replycontent}}
        </div>
      </div>
    </div>
  </div>

</div>
</template>
<script>
  import allheader from '../components/allheader'
  export default {
    components:{
      allheader
    },
    data(){
      return{
        detail:{},
        replycontent:'',
        replyarr:[],
      }
    },
    methods:{
      getcontent(){
        let id =this.$route.query.id
        this.$axios.get(`/detailone/${id}`).then(res=>{
          this.detail=res.data.data;
        })
      },
      upreplay(){
        let essayid=this.detail._id;
        let replycontent=this.replycontent;
        let allreply={
          essayid,
          replycontent,
        }
        this.$axios.post('/reply',allreply).then(res=>{
          if(res.data.code==200){
            alert(res.data.msg)
          }
        })

      },
      getreply(){
        let id =this.$route.query.id
        this.$axios.get(`/getreply/${id} `).then(res=>{
          if (res.data.code==200){
            this.replyarr=res.data.data;
            this.getreply();
          }
        })
      }
    },
    mounted(){
      this.getcontent();
      this.getreply();
    },
    filters: {
      time: function (value) {
        let d = new Date(value)
        return (d.getFullYear()) + '-'
          + (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-'
          + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate())+"   "
          +(d.getHours())+':'
          +( d.getMinutes()+ 1 >9 ? d.getMinutes() + 1 : '0'+d.getMinutes())+':'
          +( d.getSeconds())
      }
    }
  }
</script>

<style scoped>
  .detailcontent{

    width: 700px;
    margin: 0 auto;
    margin-top: 50px;
    background: #fff;
    padding: 40px 20px;
    text-align: center;
  }
.title{
  margin: 0 auto;
  text-align: center;
  font-size: 40px;
  color: #000;
  font-weight: 400;
  padding-bottom: 10px;
}
  .author,.time{
    font-size: 14px;
    color: #ccc;
  }
  .myname{
    color: red;
    font-size: 14px;
    padding-right: 20px;
  }
  .content{
    text-align: left;
    margin-top: 50px;
    font-size: 18px;
  }
  .reply{
    width: 700px;
    margin: 0 auto;
    margin-top: 50px;

  }
  .reply-title{
    font-size: 20px;
    font-weight: 700;
    color: #398DEE;
    margin-bottom: 20px;
  }
  textarea{
    width: 700px;
    height: 150px;
  }
  .reply-btn{
    color: #fff;
    line-height: 50px;
    margin-top: 20px;
    border-radius: 4px;
    border: 1px solid #398DEE;
    background: #398DEE;
    width: 80px;
    height: 50px;
    font-size: 20px;
    font-weight: 700;
  }
  .getreply{
    width: 700px;
    margin: 0 auto;
    background: #fff;
    padding: 40px 20px;
    margin-top: 20px;
  }
  .replyall{
    color: #398DEE;
    font-size: 20px;
    font-weight: 700;
  }
  .getreply-item{
    margin-top: 10px;
  }
  .replyfll img{
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
  .replyflr{
    height: 70px;
    width: 600px;
  }
  .replyname{
    font-size: 18px;
    font-weight: 400;
    color: #398DEE;
    height: 35px;
    line-height: 35px;
  }
  .replycontainer{
    height: 35px;
    line-height: 35px;
    color: #fff;
    background: #398DEE;
    border-radius: 8px;
    padding-left: 10px;

  }
</style>
