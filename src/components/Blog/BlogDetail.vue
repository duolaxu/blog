<template>
  <div id="app">
      <reminder v-if="remind"></reminder>
      <div class="main" :key="item.time" v-for="(item,index) in article">
        <div class="block" >
        <div class="center_1">
          <div class="time">
          <h4>{{swap(item.time)}}</h4>
        </div><br/>
        <div class="title">
          <span @click.stop="send(index)"><strong>{{item.title}}</strong></span>
        </div>
        <div class="tag_s">
          <span>
            文章标签: {{item.tags}}
          </span>
        </div>
        <div class="digest">
          摘要: {{item.digest}}
          <span class="total" @click.stop="send(index)">阅读全文</span>
        </div>
        <div class="line">

        </div>
        <div class="bottom">
          <div class="left">
            <span class="edit_1">posted @ {{item.time}} {{Name}}</span>
          </div>
          <div class="right">
            <span @click.stop="drop(index)" class="drop">删除</span>
          <span to="/edit" @click.stop="change(index)" class="edit">编辑</span>
          </div>
        </div>
        </div>
</div> 
      </div>
  </div>
</template>

<script>
import reminder from "./reminder"
export default {
  name:'blogdetail',
  components:{
    reminder
  },
  inject:["reload"],
  mounted(){
    var storage=window.sessionStorage;
    var _this=this;
    if(JSON.parse(window.localStorage.getItem("article")))
    {
       _this.article=JSON.parse(window.localStorage.getItem("article"));
    }
    else{
      this.$axios.post("/article",window.localStorage.getItem("ID"))
    .then(function(response){
      window.localStorage.setItem("article",JSON.stringify(response.data));
      console.log("response.data = ",response.data);

      let label = new Array();

      for(let i=0;i<response.data.length;i++)
      {
        let judge_tag=true;
        // label.push(response.data[i].tags);
        for(let j=0;j<label.length;j++)
        {
          if(label[j]==response.data[i].tags)
          {
            judge_tag=false;
            break;
          }
        }
        if(judge_tag==true)
        {
          if(response.data[i].tags!=null)
          label.push(response.data[i].tags);
        }
      }

      
      // label.pop();

      // console.log(label);

      window.sessionStorage.setItem("article_tags",JSON.stringify(label));
      _this.article=JSON.parse(window.localStorage.getItem("article"));
      if(_this.article.length==0)
      {
        _this.remind=true;
      }
      else{
        _this.remind=false;
      }
    })
    .catch(function(err){
      console.log(err);
    })
    }
  },
   data(){
      return {
        article:'',
        Name:window.localStorage.getItem("Name"),
        remind:false
      }
    },
    methods:{
      swap(data){
        var time='';
        let flag=0;
        for(let i=0;i<data.length;i++)
        {
          if(data[i]==' ')
          {
            time=time+'日';
            break;
          }
          if(data[i]=='/')
          {
            if(flag==0)
            {
              time=time+'年';
            }
            else if(flag==1)
            {
              time=time+'月';
            }
            flag++;
          }
          else
          time=time+data[i];
        }
        return time;
      },
      change(index){
        window.localStorage.setItem("article_id",index);
        this.$router.push({
          name:'edit',
          params:{
            id_1:window.localStorage.getItem("ID"),
            id_2:window.localStorage.getItem("article_id")
          }
        });
        
      },
      drop(index){
        var _this=this;
        let _article = JSON.parse(window.localStorage.getItem("article"));
        //用户的所有文章信息
        console.log(_article);
        let index_1=_article[index].id;
        //选择删除的文章id
        console.log("index_1 = ",index_1);
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.$axios.post('/delete_essay',{
          id:JSON.parse(window.localStorage.getItem("article"))[index].id
        })
        .then(function(response) {
          
          console.log("_article = ",_article);
          
          _article.splice(index,1);
          window.localStorage.setItem("article",JSON.stringify(_article));
          //这里是将直接在客户端上删除，增强用户体验
         
          window.localStorage.setItem("delete_article",true);
          // console.log(_this.article[index].id);
          let total_article = JSON.parse(window.sessionStorage.getItem("totalArticle"));
          //获取所有用户文章信息

          console.log("total_article = ",total_article);
          console.log("total_article的长度",total_article.length);
          // console.log("index_1 = ",index_1);
          for(let i=0;i<total_article.length;i++)
          {
            // console.log(total_article[i].id);
              if(total_article[i].id==index_1)
              {
                console.log("i = ",i);
                console.log("----------------");
                console.log("total_article = ",total_article);
                console.log("----------------");
                total_article.splice(i,1);
                console.log("----------------");
                console.log("total_article = ",total_article);
                console.log("----------------");
                break;
              }
          }
          window.sessionStorage.setItem("totalArticle",JSON.stringify(total_article));
           _this.reload();
        })
        .catch((err) => {
          console.log(err);
         })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      send(index){
        window.localStorage.setItem("article_id",index);
        window.localStorage.setItem("Check_id",this.article[index].id);
        this.$router.push({
          name:'content',
          params:{
            id_1:window.localStorage.getItem("ID"),
            id_2:window.localStorage.getItem("article_id")
          }
        });
      }
   }
}
</script>
<style scoped>
@media screen and (max-width:420px) {
.main{
  width:90%;
  background-color: white;
  margin:auto; 
  opacity: 0.9;
  margin-top:30px;
  border-radius: 3px;
  position: relative;
}
.drop{
  cursor: pointer;
  color:rgb(160,158,163);
  position: relative;
  top:-5px;
  left:100%;
  display: inline-block;
  font-size:12px;
}
.drop:hover{
  color:red;
} 
.time{
  width:130px;
  margin:auto;
}
.title{
  width:98%;
  margin-left:30px;
}
.title span{
  cursor: pointer;
  font-size:18px;
}
.title span:hover{
  color:red;
}
.tag_s{
  color:rgb(160,158,163);
  font-size: 18px;
  margin-left: 30px;
}
.digest{
  margin-top:10px;
  font-size:14px;
}
.line{
  width:100%;
  height:20px;
  border:0px solid black;
  border-width:0px 0px 1px 0px;
}
.total{
  color:black;
  border:0px solid black;
  border-width:0px 0px 1px 0px;
  cursor: pointer;
}
.total:hover{
  color:red;
  border:0px solid red;
  border-width:0px 0px 1px 0px;
}
#app{
  z-index:10;
}
#span{
  color:rgb(85 26 139);
  cursor: pointer;
  border: 0px solid rgb(85 26 139);
  border-width: 0px 0px 2px 0px;
}
a{
  pointer-events: none;
}
.edit{
  display: inline-block;
  color:rgb(144 147 153);
  text-decoration: none;
  cursor: pointer;
  margin-left: 67%;
  position:relative;
  font-size:12px;
  top:-5px;
}
.edit:hover{
  color:red;
}
.edit_1{
  font-size:12px;
  display: inline-block;
  color:rgb(144 147 153);
  position:relative;
  top:15px;
  left:-54px;
}
.block{
  width: 95%;
  margin: auto;
  background-color: white;
}
.bottom{
  margin:auto;
  display: block;
  width:200px;
  height:50px;
}
}
@media screen and (min-width:421px) {
  #name{
  font-size: 35px;
  height:100px;
  width:200px;
  margin:auto;
  position: relative;
  top:40px;
  left:18px;
  color: white;
}
.main{
  width:900px;
  background-color: white;
  margin:auto; 
  opacity: 0.85;
  margin-top:30px;
  border-radius: 3px;
  border:3px solid rgb(51 51 51);
}
.drop{
  cursor: pointer;
  color:rgb(160,158,163);
  position: relative;
  top:13px;
  left:-10px;
  /* display: inline-block; */
  font-size:14px;
}
.drop:hover{
  color:red;
}
.time{
  width:130px;
  margin:auto;
  
}
.title{
  width:48.5%;
  margin-left:30px;
  display: inline-block;
}
.title span{
  cursor: pointer;
  font-size:18px;
}
.title span:hover{
  color:red;
}
.tag_s{
  display: inline-block;
  width: 39%;
  height: 20px;
  color:rgb(160,158,163);
  font-size: 15px;
}
.digest{
  margin-top:10px;
  font-size:14px;
}
.line{
  width:100%;
  height:20px;
  border:0px solid black;
  border-width:0px 0px 1px 0px;
}
.total{
  color:black;
  border:0px solid black;
  border-width:0px 0px 1px 0px;
  cursor: pointer;
}
.total:hover{
  color:red;
  border:0px solid red;
  border-width:0px 0px 1px 0px;
}
#app{
  z-index:10;
}
#span{
  color:rgb(85 26 139);
  cursor: pointer;
  border: 0px solid rgb(85 26 139);
  border-width: 0px 0px 2px 0px;
}
a{
  pointer-events: none;
}
.right{
  display: inline-block;
  position: relative;
  top:1px;
  width:11%;
  text-align: center;
}
.left{
  width:49%;
  display: inline-block;
  position: relative;
  margin-left: 23.5%;
  text-align: right;
}
.edit{
  color:rgb(144 147 153);
  text-decoration: none;
  cursor: pointer;
  position:relative;
  font-size:13px;
  top:13px;
}
.edit:hover{
  color:red;
}
.edit_1{
  font-size:14px;
  color:rgb(144 147 153);
  position:relative;
  top:15px;
}
.block{
  width: 90%;
  margin: auto;
  background-color: white;
}
.bottom{
  margin:auto;
  display: block;
  width:1000px;
  height:50px;
}
}
</style>