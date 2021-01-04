<template>
  <div>
      <div id="block">
          <h1 id="name">{{name}}</h1>
          <div id="show" v-if="show">
            <h1>该用户还没有创建任何文章</h1>
          </div>
</div>
<div class="main" :key="item.time" v-for="(item,index) in article">
        <div class="block" >
        <div class="center_1">
          <div class="time">
        </div><br/>
        <div class="title">
          <span @click.stop="send(index)"><strong>{{item.title}}</strong></span>
        </div>
        <div class="digest">
          摘要: {{item.digest}}
          <span class="total" @click.stop="Check(index)">阅读全文</span>
        </div>
        <div class="line">

        </div>
        <div class="bottom">
          <span class="edit_1">posted @ {{item.time}} <span id="sp_name">{{name}}</span></span>
        </div>
        </div>
</div>
      </div>
    <div id="bottom">

    </div>
  </div>
</template>

<script>
export default {
    name:"pre_article",
    components:{

    },
    mounted(){
       this.hide=JSON.parse(window.localStorage.getItem("status"));
        this.article=JSON.parse(window.localStorage.getItem("preArticle"));
        this.name=window.localStorage.getItem("preName");
        if(this.article.length==0)
        {
          this.show=true;
        }
        else{
          this.show=false;
        }
    },
    data(){
        return {
            name:'',
            article:'',
            show:false,
            hide:false
        }
    },
    methods:{
      Check(index){
        window.localStorage.setItem("preID",index);
        window.localStorage.setItem("Check_id",this.article[index].id);
        this.$router.push("/viewArticle");
      },
      send(index)
      {
        window.localStorage.setItem("ArticleId",index);
        this.$router.push("viewArticle");
      }
    }
}

</script>
<style scoped>
@media screen and (max-width:420px) {
  #show{
    width:90%;
  margin:auto;
  margin-top: 20px;
}
#block{
  width:80%;
    margin:auto;
}
h1{
    text-align: center;
}

#sp_name{
  cursor: pointer;
}
#sp_name:hover{
  color: red;
}
#name{
  display:block;
  font-size: 35px;
  height:36px;
  width:200px;
  margin:auto;
  position: relative;
  margin-top:60px;
  left:18px;
  color:white;
}
#h_name{
  color:white;
}
.main{
  width:90%;
  background-color: white;
  margin:auto; 
  opacity: 0.9;
  margin-top:30px;
  border-radius: 3px;
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
  position:relative;
  top:15px;
}
.block{
  width: 90%;
  margin: auto;
  background-color: white;
}
.block h1{
  color:white;
}
.bottom{
  margin:auto;
  display: block;
  height:50px;
}
}
@media screen and (min-width:421px) {
  #show{
  width: 900px;
  margin:auto;
}
#block{
    width:900px;
    margin:auto;
}
h1{
    text-align: center;
}

#sp_name{
  cursor: pointer;
}
#sp_name:hover{
  color: red;
}
#name{
  display:block;
  font-size: 35px;
  height:36px;
  width:200px;
  margin:auto;
  position: relative;
  margin-top:60px;
  left:18px;
  color:white;
}
#h_name{
  color:white;
}
.main{
  width:900px;
  background-color: white;
  margin:auto; 
  opacity: 0.9;
  margin-top:30px;
  border-radius: 3px;
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
.block h1{
  color:white;
}
.bottom{
  margin:auto;
  display: block;
  width:1000px;
  height:50px;
}
}
</style>