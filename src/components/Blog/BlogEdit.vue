<template>
  <div id="app">
      <div id="create">
        文章修改
      </div>
      
<div id="form">

  <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
  <div id="top">
    <div id="ipt">
    <el-form-item label="标题" prop="title">
    <el-input v-model="form.title"></el-input>
  </el-form-item>
  </div>
  <div id="pass">
    <el-form-item label="摘要" prop="digest">
    <el-input v-model="form.digest"></el-input>
  </el-form-item>
  </div>
  </div>
  <div id="editor">
    <mavon-editor
    id="mavon"
    v-model="form.doc"
    ref=md
    @imgAdd="$imgAdd"
    @imgDel="$imgDel">
    </mavon-editor>
  </div>
    <div id="btn">
    <div class="btn_submit">
      <el-form-item>
    <el-button type="primary" @click="onSubmit">保存修改</el-button>
  </el-form-item>
    </div>
  </div>
</el-form> 
</div>

<div id="article">
</div>
  </div>
</template>
<script>
import {mavonEditor} from "mavon-editor"
export default {
  name:'Edit',
  components:{

  },
  data(){
    return {
      form:{
            title:'',
            digest:'',
            doc:'',
            time:'',
            id:window.localStorage.getItem("ID"),
            article:window.localStorage.getItem("article_id"),
            name:window.localStorage.Name
          },
      rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          digest:[
            { required: true, message: '请写下你的摘要', trigger: 'blur' }
          ]
        }
    }
  },
  mounted(){
    var index=window.localStorage.getItem("article_id");
    this.form.title=JSON.parse(window.sessionStorage.getItem("article"))[index].title;
    this.form.digest=JSON.parse(window.sessionStorage.getItem("article"))[index].digest;
    this.form.doc=JSON.parse(window.sessionStorage.getItem("article"))[index].content;
    this.form.id=JSON.parse(window.sessionStorage.getItem("article"))[index].id;
  },
  methods:{
        $imgAdd(pos, file){

            let formData = new window.FormData(); 
            let _this=this;
            formData.append("file", file);
            //  formdata.append('imgFile', file);
           this.$axios.post("/upload",formData)
           .then((response) => {
            _this.$refs.md.$img2Url(pos,response.data.url);

            // console.log("_this.$ref.md = ",_this.$refs.md);

           })
            
        },
        $imgDel(pos,$file){

        },
      onSubmit() {
        window.localStorage.setItem("main",false);
        var myDate=new Date();
        this.form.time=myDate.toLocaleString();
        // console.log("TIME = ",this.form.time);
        var _this=this;

        let send=0;

        for(let i=0;i<this.form.title.length;i++)
            {
                if(this.form.title[i].charCodeAt()!=32)
                {
                    send++;
            break;
                }
            }
        for(let i=0;i<this.form.digest.length;i++)
            {
                if(this.form.digest[i].charCodeAt()!=32)
                {
                    send++;
            break;
                }
            }
            if(send==2)
        {
          this.$axios.post('/update_essay',this.form)
    .then(function(response) {
      // let 


      // alert("00000");
      // console.log("JSON.parse(window.localStorage.article)[_this.form.article].id = ",JSON.parse(window.sessionStorage.article)[_this.form.article].id);

      let index_0=JSON.parse(window.sessionStorage.article)[_this.form.article].id;

      console.log("_this.form.date = ",_this.form.time);

      let form_1={
        id:index_0,
        title:_this.form.title,
        digest:_this.form.digest,
        content:_this.form.doc,
        tags:null,
        time:_this.form.time,
        user_id:window.localStorage.ID,
        name:_this.form.name
      }

      let article=JSON.parse(window.sessionStorage.article);

      article.splice(_this.form.article,1);
      article.push(form_1);

      window.sessionStorage.setItem("article",JSON.stringify(article));

      let total_article=JSON.parse(window.sessionStorage.totalArticle);

      for(let i=0;i<total_article.length;i++){
        if(total_article[i].id==index_0){
          index_0=i;
          break;
        }
      }

      total_article.splice(index_0,1);

      total_article.push(form_1);

      window.sessionStorage.setItem("totalArticle",JSON.stringify(total_article));






      _this.$router.push("/main")
    })
    .catch(function(error) {
        console.log(error);
    });
        }
        else{
          this.$message.error({
                    message:"标题和摘要不能为空",
                    center:true
                })
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  }
}

</script>
<style scoped>
@media screen and (max-width:420px) {
  #create{
  font-size: 30px;
  height:100px;
  width:200px;
  margin:auto;
  position: relative;
  top:50px;
  left:70px;
}
#app{
  z-index:10;
}
#create{
  color:white;
  text-decoration: none;
}
#article{
  width:1000px;
  margin: auto;
  text-align:center;
}
#editor{
  margin:auto;
  width:90%;
  position: relative;
}
#btn{
  width: 100%;
}
.btn_submit{
  width:270px;
  margin:auto;
  text-align: center;
  position:relative;
  left:-50px;
  top:15px;
}
#form{
  width:100%;
  height:100%;
}
#top{
  width:100%;
}
#ipt,#pass{
  width:90%;
  height:60px;
}
 .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    text-align:center;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
}
@media screen and (min-width:421px) {
  #create{
  font-size: 30px;
  height:80px;
  width:200px;
  margin:auto;
  position: relative;
  top:20px;
  left:70px;
}
#app{
  z-index:10;
}
#create{
  color:white;
  text-decoration: none;
}
#article{
  width:1000px;
  margin: auto;
  text-align:center;
}
#editor{
  margin:auto;
  width:800px;
  position: relative;
}
#btn{
  width: 100%;
}
.btn_submit{
  width:270px;
  margin:auto;
  text-align: center;
  position:relative;
  left:-50px;
  top:15px;
}
#form{
  width:100%;
  height:100%;
}
#top{
  width:100%;
}
#ipt,#pass{
  width:500px;
  height:60px;
  margin:auto;
}
 .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    text-align:center;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
}
</style>