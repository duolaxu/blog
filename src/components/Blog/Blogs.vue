<template>
  <div id="app">
      <div id="create">
        文章创建
      </div>
      
<div id="form">

  <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
  <div id="top">
    <div id="ipt">
    <el-form-item label="标题" prop="title">
    <el-input v-model="form.title" placeholder="文章标题"></el-input>
  </el-form-item>
  </div>
  <div id="pass">
    <el-form-item label="摘要" prop="digest">
    <el-input v-model="form.digest" placeholder="文章摘要"></el-input>
  </el-form-item>
  </div>
  </div>
  <div id="editor">
    <mavon-editor
    id="mavon"
    v-model="form.doc"
    ref=md
    @change="change"
    @update="update"
    @imgAdd="$imgAdd"
    @imgDel="$imgDel"
    ></mavon-editor>
  </div>
    <div id="btn">
      <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
  </el-form-item>
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
  name:'blogs',
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
  },
  methods:{
        $imgAdd(pos, file){
          //   let _this=this;
          //  var formdata = new FormData();
          
          //  let Files=this.$refs.file_id.files[0];
          //   let formData = new window.FormData(); 
          //   formData.append("file", Files);
          //   //  formdata.append('imgFile', file);
          //  this.$axios.post("/upload",formdata)
          //  .then((response) => {
             
          //  })
          // console.log("----------");
          let formData = new window.FormData(); 
            let _this=this;
            formData.append("file", file);
            //  formdata.append('imgFile', file);
           this.$axios.post("/upload",formData)
           .then((response) => {
            _this.$refs.md.$img2Url(pos,response.data.url);

            // console.log("_this.$ref.md = ",_this.$refs.md);

           })

            // formData.append('name', window.localStorage.getItem("Name"));
            // this.$axios.post("/change_head",formData)
            // .then(function(response){
            //     let img_head_1=document.getElementById("head_img_1");
            //     let img_head_2=document.getElementById("head_img_2");
            //     window.localStorage.setItem("url_head",response.data.url);
            //     if(img_head_1)
            //     {
            //         img_head_1.src=response.data.url;
            //     }
            //     if(img_head_2)
            //     {
            //         img_head_2.src=response.data.url;
            //     }
            // })
        },
        $imgDel(pos,$file){

        },
    update(markdown,html){

    },
    change(markdown, html) {

        },
      onSubmit() {
        window.localStorage.setItem("main",false);
        var editor=document.getElementById("mavon");
        var myDate=new Date();
        this.form.time=myDate.toLocaleString();
        var _this=this;
        var article=document.getElementById("article");
        let send = 0;

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
    this.$axios.post('/output',this.form)
    .then(function(response) {

      // console.log("response.data = ",response.data.essay_id);

      // form:{
      //       title:'',
      //       digest:'',
      //       doc:'',
      //       time:'',
      //       id:window.localStorage.getItem("ID")
      //     },

      let form_1={
        id:response.data.essay_id,
        title:_this.form.title,
        digest:_this.form.digest,
        content:_this.form.doc,
        tags:null,
        time:_this.form.time,  
        user_id:window.localStorage.ID,
        name:_this.form.name
      }

      let article=JSON.parse(window.sessionStorage.article);

      article.push(form_1);

      window.sessionStorage.setItem("article",JSON.stringify(article));

      let total_article=JSON.parse(window.sessionStorage.totalArticle);

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
  #mavon{
    width:100%;
    height:100%;
  }
  #create{
  font-size: 30px;
  height:100px;
  width:200px;
  margin:auto;
  position: relative;
  top:50px;
  left:50px;
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
  width:95%;
  height:400px;
  position: relative;
}
#btn{
  width:270px;
  margin:auto;
  text-align: center;
  position:relative;
  left:-50px;
  top:15px;
}
#form{
  width:100%;
  height:80%;
  margin: auto;
  opacity: 0.9; 
}
#top{
  width:100%;
}
#ipt,#pass{
  width:90%;
   height:60px;
   margin-left:-20px;
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
  height:100px;
  width:200px;
  margin:auto;
  position: relative;
  top:30px;
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
  width:270px;
  margin:auto;
  text-align: center;
  position:relative;
  left:-50px;
  top:15px;
}
#form{
  width:50%;
  height:50%;
  margin: auto;
  opacity: 0.9; 
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