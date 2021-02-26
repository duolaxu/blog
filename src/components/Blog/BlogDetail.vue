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
        <div class="digest">
          摘要: {{item.digest}}
          <span class="total" @click.stop="send(index)">阅读全文</span>
        </div>
        <div class="line">

        </div>
        <div class="bottom">
          <span class="edit_1">posted @ {{item.time}} {{Name}}</span>
          <span @click.stop="drop(index)" class="drop">删除</span>
          <span to="/edit" @click.stop="change(index)" class="edit">编辑</span>
        </div>
        </div>
</div> 
      </div>
      <div id="bottom_0"></div>
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
    if(!window.sessionStorage.article){
      var _this=this;
      this.$axios.post("/article",window.localStorage.getItem("ID"))
    .then(function(response){
      window.sessionStorage.setItem("article",JSON.stringify(response.data))
      _this.article=JSON.parse(window.sessionStorage.getItem("article"));
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
    }else{
      this.article=JSON.parse(window.sessionStorage.getItem("article"));
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
        // console.log("data = ",data);
        var time='';
        let flag=0;
        for(let i=0;i<data.length;i++)
        {
          if(data[i]==' ')
          {
            time=time+'日';
            break;
          }else if(data[i]=='上'||data[i]=='下'){
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
        // console.log("time = ",time);  
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
        let _this=this;
        // console.log("article = ",JSON.parse(window.sessionStorage.getItem("article"))[index].id);
        this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            // alert("index = ",index);

          _this.$axios.post('/delete_essay',{
          id:JSON.parse(window.sessionStorage.getItem("article"))[index].id
        })
        .then(function(response) {


          let article=JSON.parse(window.sessionStorage.article);

      let index_id=JSON.parse(window.sessionStorage.getItem("article"))[index].id;

      article.splice(index,1);

      window.sessionStorage.setItem("article",JSON.stringify(article));

      let total_article=JSON.parse(window.sessionStorage.totalArticle);

      let index_article;

      for(let i=0;i<total_article.length;i++){
        if(total_article[i].id==index_id){
          index_article=i;
          break;
        }
      }
      total_article.splice(index_article,1);
      // total_article.pop();

      window.sessionStorage.setItem("totalArticle",JSON.stringify(total_article));

      _this.reload();
        })
        .catch((err) => {
          console.log(err);
         })
         _this.reload();
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          // alert("已取消删除");
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      send(index){
        window.localStorage.setItem("article_id",index);
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
  #bottom_0{
    width:1px;
    height:30px;
  }
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
  /* position: relative; */
  /* top:-5px; */
  /* left:100%; */
  /* left: */
  /* left:100px; */
  /* top:-6px; */
  /* margin-left:100%; */
  width:30px;
  position: absolute;
  left: 80%;
  /* top:-5px; */
  bottom:15px;
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
  margin-left: 75%;
  position:relative;
  font-size:12px;
  top:-6px;
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
  #bottom_0{
    width:1px;
    height:30px;
  }
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
  top:15px;
  left:10px;
  display: inline-block;
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
  width:200px;
  margin-left:30px;
}
.title span{
  cursor: pointer;
  font-size:18px;
}
.title span:hover{
  color:red;
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
  margin-left: 775px;
  position:relative;
  font-size:14px;
  top:-6px;
}
.edit:hover{
  color:red;
}
.edit_1{
  font-size:14px;
  display: inline-block;
  color:rgb(144 147 153);
  margin-left: 425px;
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
</stylescs>