<template>
  <div id="app">
      <div id="create">
        文章修改
      </div>
      
<div id="form">

  <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
  <div id="tags">
    <el-form-item label="标签" @input="monitor_ipt" id="ipt_1" prop="tags">
    <el-input v-model="form.tags" placeholder="文章标签"></el-input>
  </el-form-item>
</div>
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
            tags:'',
            id:window.localStorage.getItem("ID"),
            article:window.localStorage.getItem("article_id")
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
    let index=window.localStorage.getItem("article_id");
    this.form.title=JSON.parse(window.localStorage.getItem("article"))[index].title;
    this.form.digest=JSON.parse(window.localStorage.getItem("article"))[index].digest;
    this.form.doc=JSON.parse(window.localStorage.getItem("article"))[index].content;
    this.form.id=JSON.parse(window.localStorage.getItem("article"))[index].id;
    this.form.tags=JSON.parse(window.localStorage.getItem("article"))[index].tags;
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
        monitor_ipt(){
          var ipt_1=document.getElementById("ipt_1");
        },
      onSubmit() {
        window.localStorage.setItem("main",false);
        var myDate=new Date();
        this.form.time=myDate.toLocaleString();
        let _this=this;

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
      let index=window.localStorage.getItem("article_id");
      let Article=JSON.parse(window.localStorage.getItem("article"));
     console.log(Article[index]);
     let _form={
       content:_this.form.doc,
       digest:_this.form.digest,
       title:_this.form.title,
       time:_this.form.time,
       tags:_this.form.tags,
       id:_this.form.id
     }
     Article[index]=_form;
     window.localStorage.setItem("article",JSON.stringify(Article));
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