<template>
  <div>
    <allheader></allheader>
    <div class="search all ">
      <div class="search-wrap">
        <input type="text"
               placeholder="请输入关键字...."
               v-model="title"
                @keyup.enter="getsearch">
        <button @click="getsearch">搜索 </button>
      </div>
      <div class="search-content">
      <div class="list-item" v-for="item in itemarr" :key="item._id"
           @click="$router.push({path:'/Detail',query:{id:item._id}})">
        <div class="item-title clearfix">
          <div class="title-fll fll">
            <img :src=item.userimg >
          </div>
          <div class="title-flr flr">
            <div class="titleflr-top">
              <span class="topfll">{{item.username}}</span>|
              <span class="topflr">{{item.publictitle}}</span>
            </div>
            <div class="titleflr-buttom clearfix">
              <span class="buttom-shuju fll">浏览：{{item.looknums}}</span>
              <span class="buttom-shuju fll" >回复：{{item.commontnumsid.length}}</span>
              <span class="buttom-shuju fll" >分类：</span>
              <span v-for="searcha in item.searcharr"
                    class="classify ">{{searcha}}</span>
            </div>
          </div>

        </div>
        <div class="item-content">
          {{item.contentText}}
        </div>
      </div>

      </div>
    </div>
  </div>

</template>

<script>
  import allheader from '../components/allheader'
      export default {
        name: "search",
      components:{
        allheader
      },
        data(){
          return{
            itemarr:[],
            title:'',
          }
        },
        methods:{
          getarticle(){
            this.$axios.get('/articleitem').then(res=>{
              let itemarr=res.data.data
              this.itemarr=itemarr;
              console.log(this.itemarr)

            })
          },
          getsearch(){
            let title =this.title;
            this.$axios.get('/search',{params:{title}}).then(res=>{
                   if(res.data.code==200){
                       this.itemarr=res.data.data;
                   }
                   else{
                     alert('没有相关数据')
                   }
            })
          },
        },
        mounted(){
          this.getarticle();
        },
    }

</script>

<style scoped>
  .search{
    margin: 0 auto;
  }
  .search-wrap{
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .search-wrap input{
    background: #fff;
    border: none;
    border-radius: 4px;
    width: 1058px;
    height: 50px;
    margin: 0;
    color: #ccc;
    font-size: 16px;
    padding-left: 20px;
  }
  .search-wrap button{
    width:87px;
    height: 50px;
    background: #398DEE;
    /*border: 1px solid #398DEE;*/
    border: none;
    color: #fff;
    margin: 0;
    padding: 0;
  }
  .search-content{
    width: 1130px;
    padding: 20px;
    background: #fff;
    min-height: 500px;
  }
  .list-item{
    cursor: pointer;
    margin-bottom: 20px;
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
    width: 1000px;


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
