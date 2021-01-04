<template>
  <div>
    <div class="main" :key="item.time" v-for="(item,index) in article">
        <div class="block" >
        <div class="center_1">
        <div class="title">
          <span @click.stop="Check(index)"><strong>{{item.title}}</strong></span>
        </div>
        <div class="tag_s">
          <span>
            文章标签: {{item.tags}}
          </span>
        </div>
        <div class="digest">
          摘要: {{item.digest}}
          <span class="total" @click.stop="Check(index)">阅读全文</span>
        </div>
        <div class="line">

        </div>
        <div class="bottom">
          <span class="edit_1">posted @ {{item.time}} <span id="sp_name" @click.stop="turn_name(index)">
            <!-- {{item.id}} -->
            <!-- {{person[item.user_id-1]}} -->
            <!-- {{person[index].name}} -->
            </span></span>
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
    name:'preview',
    inject:['reload'],
    mounted(){
        let _this = this;
        if(!JSON.parse(window.sessionStorage.getItem("totalArticle"))){
          window.localStorage.setItem("delete_article",false);
           _this.$axios.get("/essay")
      .then(function(response){
        console.log(response.data);
        _this.article = response.data;
        let article_index=_this.article[_this.article.length-1].id;
        _this.$store.commit("setArticle_id",article_index);
        window.sessionStorage.setItem("totalArticle",JSON.stringify(response.data));
      })
      .catch((err) => {
        console.log(err);
      })
        }
      else{
        this.article=JSON.parse(window.sessionStorage.getItem("totalArticle"));
        this.person=JSON.parse(window.localStorage.getItem("person"));
        console.log("this.person = ",this.person[0].name);
      }
    },
    data(){
      return {
        article:'',
        person:''
      }
    },
    methods:{
      turn_name(index){
        var _this=this;
        this.$axios.post("/turnArticle",{
          name:JSON.parse(window.localStorage.getItem("person"))[index].name
        })
        .then(function(response){
          window.localStorage.setItem("preArticle",JSON.stringify(response.data));
          window.localStorage.setItem("preName",JSON.parse(window.localStorage.getItem("leavenote"))[index].name);
          _this.$router.push("/preArticle");
        })
        .catch((err) => {
          console.log(err);
        })
      },
      Check(index){
        window.localStorage.setItem("ArticleId",index);
        window.localStorage.setItem("Check_id",this.article[index].id);
        this.$router.push({
          name:'preessay',
          params:{
            id:window.localStorage.getItem("ArticleId")
          }
        });
      }
    }
}

</script>
<style scoped>
@media screen and (max-width:420px) {
  #sp_name{
  cursor: pointer;
}
#sp_name:hover{
  color: red;
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
  width:90%;
  background-color: white;
  margin:auto; 
  opacity: 0.90;
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
  width:100%;
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
  color:rgb(160,158,163);
  font-size: 18px;
  margin-left: 30px;
}
.digest{
  margin-top:10px;
  font-size:12px;
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
  font-size:12px;
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
  font-size:12px;
  display: inline-block;
  color:rgb(144 147 153);
  position:relative;
  top:15px;
  left:45px;
}
.block{
  width: 90%;
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
  #sp_name{
  cursor: pointer;
}
#sp_name:hover{
  color: red;
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
  opacity: 0.90;
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
  width:49%;
  /* width:200px; */
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
  /* background-color: red; */
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
</style>