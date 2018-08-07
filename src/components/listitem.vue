<template>
    <div>
      <div class="list-item">
        <div class="item-title clearfix">
          <div class="title-fll fll">
            <img src="./assets/one.jpg" >
          </div>
          <div class="title-flr flr">
            <div class="titleflr-top">
              <span class="topfll">笔记丸子</span>|
              <span class="topflr">浅谈Vue.js</span>
            </div>
            <div class="titleflr-buttom clearfix">
              <span class="buttom-shuju fll">浏览：45</span>
              <span class="buttom-shuju fll" >回复：78</span>
              <span class="buttom-shuju fll">分类：类库框架</span>
            </div>
          </div>

        </div>
        <div class="item-content">
          中新网客户端北京7月29日电 (李章洪)你提意见了吗？28日，《个人所得税法修正案(草案)》向社会征求意见结束。中国人大网显示，草案征集意见超过13万条，关注度远高于同期征求意见的其他三部法律草案。 大伙都提了哪些意见？草案自公布以来，大众的讨论一直在持续，争论的焦点都有哪些？中新网对此进行了采访和梳理。 图为截至28日16时左右，中国人大网法律草案征求意见管理系统显示的《个人所得税法修正案
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "listitem"
    }
</script>

<style scoped>
  .item-content{
    background: #fff;
  }
  .list-item{
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
  .item-content{
    margin-top: 10px;
    font-size: 16px;
    color: #000;
  }



</style>
