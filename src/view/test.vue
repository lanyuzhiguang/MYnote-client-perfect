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
      <quillEditor  v-model="content" :options="editorOption" @click="onEditorChange"></quillEditor>
      <div class="label clearfix">
        <span class="fll label-title">标签：</span>
        <div class="ladblsearch flr">
          <!--<el-button>css</el-button>-->
          <!--<el-checkbox-group v-model="label" class="fll" size="small">-->
          <!--<el-checkbox-button v-for="label in labels" :label="label" :key="label._id">{{label.name}}</el-checkbox-button>-->
          <!--</el-checkbox-group>-->
        </div>
      </div>
      <button class="pbtn" @click="uparticle">发布</button>
    </div>

  </div>

</template>
<script>
  import 'quill/dist/quill.snow.css'
  import {quillEditor, Quill} from 'vue-quill-editor'
  import { ImageExtend, QuillWatch} from 'quill-image-extend-module'
  import allheader from '../components/allheader'
  let action = process.env.NODE_ENV == 'development'? '/api/upload': '/upload'
  let basePicPath = process.env.NODE_ENV == 'development'? '/api' : ''
  Quill.register('modules/ImageExtend',ImageExtend);
  export default {
    components:{
      allheader,
      quillEditor,
    },
    data(){
      return{
        publictitle:'',
        contentText:"",
        content:"",
        editorOption:{
          modules: {
            ImageExtend: {
              size: 2,
              loading: true,
              name: 'pic',
              action,
              response: (res) => {
                if(res.code == 401){
                  alert('上传的图片格式不符合要求')
                  return
                }
                return basePicPath + res.data.path
              },
              sizeError (err) {
                alert('图片大小超出限制')
              }
            },
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
              ['link', 'image']
            ],
            handlers: {
              'image': function () {
                QuillWatch.emit(this.quill.id)
              }
            }
          },},
      }

    },
    methods:{
      onEditorChange({ quill, html, text }) {
        console.log('editor change!', quill, html, text)
        this.contentText = text.substring(0,200)+'.....'
      },
      // getLabels () {
      //   this.$axios.get('/categories').then(res => {
      //     this.labels = res.data.data;
      //   })
      // },

      uparticle(){
        let param={};
        console.log(publictitle)
        param.publictitle= publictitle;
        param.contentText= contentText;
        param.content= content;
        this.$axios.post('/article',param).then(res=>{
          if(code==200){
            alert("成功发表笔记")
          }
          else{
            alert(res.data.msg)
          }
        })


      }

    },
  }
</script>

<style scoped>
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
  .ql-container{
    min-height: 500px;
  }


</style>
