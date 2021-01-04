<template>
  <div id="app">
      <div id="create">
        文章创建
      </div>



<div id="form">

  <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
  <div id="tags">
    <el-form-item label="标签" id="ipt_1" prop="tags">
    <el-input v-model="form.tags" placeholder="文章标签"></el-input>
  </el-form-item>
</div>
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
    @change="change"
    @update="update"
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
            tags:'',
            id:window.localStorage.getItem("ID")
          },
      rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          digest:[
            { required: true, message: '请写下你的摘要', trigger: 'blur' }
          ],
          tags: [
            { required: true, message: '请写下你的文章标签', trigger: 'blur' }
          ]
        }
    }
  },
  mounted(){
  },
  methods:{
        $imgAdd(pos, file){
            let _this=this;
           var formdata = new FormData();
           formdata.append('imgFile', file);
           this.$axios.post("/upload",formdata)
           .then((response) => {
             
           })
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
          let _this=this;
    this.$axios.post('/output',this.form)
    .then(function(response) {
          let _article = JSON.parse(window.localStorage.getItem("article"));
          _this.form.id=_this.$store.state.max_article_id+1;
          _this.$store.commit("setArticle_id",_this.form.id);
          _article.push(_this.form);
          let article_all = JSON.parse(window.sessionStorage.getItem("totalArticle"));
          article_all.push(_this.form);
          window.sessionStorage.setItem("totalArticle",JSON.stringify(article_all));
          window.localStorage.setItem("article",JSON.stringify(_article));
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
    #tags{
    width:90%;
    position: relative;
    left: -5%;
    text-align: center;
  }
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
  #tags{
    width: 340px;
    height: 100px;
    position: absolute;
    left: 61%;
    text-align: center;
  }
  #tags_txt{
    color:white;
    font-size: 20px;
  }
  #ipt_1{
    width: 100%;
    height: 40px;
    /* background-color: red; */
  }
  #ipt_1 input{
    outline: none;
    border: 0px solid white;
    width: 100%;
    height: 100%;
  }
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
  /* margin:auto; */
  text-align: center;
  position:relative;
  /* left:25px; */
  left: 33%;
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
  position: relative;
  left: -14%;
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