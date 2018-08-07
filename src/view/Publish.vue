<template>
  <div>
    <allheader></allheader>
    <div class="Publish-content">
      <div class="title">
        标题
      </div>
      <input type="text" placeholder="请输入笔记标题" class="input-one" v-model="publictitle">
      <div class="title">
        内容
      </div>
        <!--<textarea name="" id="" cols="30" rows="10"  placeholder="请输入笔记内容" class="input-two">-->
        <!--</textarea>-->
       <!--<div class="input-two" data-gramm="true" contenteditable="false" data-placeholder="请输入笔记内容"></div>-->

      <!--<div class="input-two" contenteditable placeholder="请输入笔记内容">-->
      <!--</div>-->
      <quillEditor  v-model="content"
                    :options="editorOption"
                    @change="onEditorChange"></quillEditor>
      <div class="label clearfix">
        <span class="fll label-title">标签：</span>
        <div class="ladblsearch flr">
            <el-checkbox-group v-model="searcharr">
              <el-checkbox-button v-for="label in labels" :label="label" :key="label._id">{{label}}</el-checkbox-button>
            </el-checkbox-group>
        </div>
      </div>
      <button class="pbtn" @click="uparticle">发布</button>
    </div>

  </div>

</template>
<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import { quillEditor } from 'vue-quill-editor'
  import allheader from '../components/allheader'
  export default {
    components:{
      allheader,
      quillEditor,
    },
    data(){
      return{
        labels :['css',
          'html', 'JS', 'ES6', "JQ",
          "elmentUI","mintUI","vue"],
        searcharr:[],
        publictitle:"",
        contentText:"",
        content:"",
        editorOption:{
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'font': [] }],
              [{ 'align': [] }],
              ['clean'],
              ['link', 'image'],
            ],
          },},
      }

    },
    methods:{
      uparticle(){
       let publictitle=this.publictitle;
       let contentText= this.contentText;
       let content=this.content;
       let searcharr =this.searcharr;
        let param={
          publictitle,
          contentText,
          content,
          searcharr
        };
       this.$axios.post('/article',param).then(res=>{
               if(res.data.code==200){
                 alert("成功发表笔记")
                 this.publictitle="";
                  this.content="";
                  this.searcharr=[];
               }
               else{
                 alert(res.data.msg)
               }
       })

      },
      onEditorChange({ quill, html, text }) {
        this.contentText = text.substring(0,200)+'...';
        this.content=text
      },

    },

  }
</script>

<style >
  .Publish-content{
    margin: 40px auto;
    width: 1130px;
    padding: 20px;
    background: #fff;
    height: 800px;
    padding-bottom: 40px;
  }
.title{
  color: #000;
  font-size: 16px;
  font-weight: 700;
  text-align: left;
  margin-bottom: 20px;
  margin-top: 10px;
}
  .input-one{
    width: 1130px;
    height: 40px;
    color: #ccc;
    font-size: 14px;
    border: 1px solid #ccc;
    padding-left: 10px;

  }
  input::placeholder{
    color: #bbb;
  }
  div:empty:before{
    content: attr(placeholder);
    color:#bbb;
  }
  div:focus:before{
    content:none;
  }
  /*textarea::placeholder{   !* Mozilla Firefox 19+ *!*/
    /*color:red;*/
  /*}*/
  .label{
    margin-top: 10px;
  }
  .label-title{
    color: #409EFF;
    font-weight: 900;
    font-size: 18px;
    width: 80px;
  }
  .ladblsearch{
    width: 1050px;
    padding-left: 0;
  }
  .pbtn{
    width: 80px;
    height: 50px;
    background: #409EFF;
    border: 1px solid #409EFF;
    border-radius: 4px;
    color: #fff;
    font-size: 16px;
  }
  .ql-container {
   min-height: 300px;
  }
  .el-checkbox-button{
    margin-left: 10px;
    border:1px solid #409EFF ;
    border-radius: 4px;
  }
  .el-checkbox-button__inner{
    border:1px solid #409EFF ;
    border-radius: 4px;
  }



</style>
