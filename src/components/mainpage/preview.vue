<template>
  <div>
    <div class="main" :key="item.time" v-for="(item,index) in article[currentPage-1]">
        <div class="block" >
        <div class="center_1">
        <div class="title">
          <span @click.stop="Check(index)"><strong>{{item.title}}</strong></span>
        </div>
        <!-- <div class="tag_s">
          <span>
            文章标签: {{item.tags}}
          </span>
        </div> -->
        <div class="digest">
          摘要: {{item.digest}}
          <span class="total" @click.stop="Check(index)">阅读全文</span>
        </div>
        <div class="line">

        </div>
        <div class="bottom">
          <span class="edit_1">posted @ {{item.time}} <span id="sp_name" @click.stop="turn_name(item.name)">
            {{item.name}}
            <!-- 这里的跳转可以通过获得名称，与person表相对比，获得用户id，进行数据库查询 -->
            <!-- 或者直接通过数组查询的方法，匹配所有与用户名相同的文章并返回 -->
            <!-- {{person[item.user_id-1]}} -->
            <!-- {{item.user_id}} -->
            <!-- {{person[item.user_id-1].name}} -->
            </span></span>
        </div>
        </div>
</div>
      </div>
    <div id="bottom">

    </div>
    
    <div id="divide">
      <el-pagination
  background
  layout="prev, pager, next"
  :pager-count="5"
  :page-count="lent"
  @current-change="turn_page"
  :current-page.sync="currentPage">
</el-pagination>
    </div>

  </div>
</template>

<script>
export default {
    name:'preview',
    inject:['reload'],
    mounted(){
      // alert("重加载");
        let _this = this;

        this.person=JSON.parse(window.localStorage.person);

        if(window.localStorage.turn_page==true){

          _this.currentPage=parseInt(window.localStorage.article_page);
          window.localStorage.setItem("turn_page",false);

        }else{
          window.localStorage.setItem("turn_page",false);
          if(!JSON.parse(window.sessionStorage.getItem("totalArticle"))){
          window.localStorage.setItem("delete_article",false);
           _this.$axios.get("/essay")
      .then(function(response){
        window.localStorage.setItem("article_page",1);
        // console.log("response.data.length = ",response.data.length);
        // _this.article = response.data;
        console.log("response.data = ",response.data);
        let timer=0;
        let arr=[];
        for(let i=0;i<response.data.length;i++){
          if(timer==8||i==response.data.length-1){
            if(timer==8&&i==response.data.length-1){
              _this.article.push(arr);
              arr=[response.data[i]];
              _this.article.push(arr);
            }
            else if(timer==8){
              _this.article.push(arr);
              arr=[response.data[i]];
              timer=0;
            }else if(i==response.data.length-1){
              arr.push(response.data[i]);
              _this.article.push(arr);
            }
          }else{
            arr.push(response.data[i]);
            timer++;
          }
        }
        let article_index=_this.article[_this.article.length-1].id;
        _this.$store.commit("setArticle_id",article_index);
        window.sessionStorage.setItem("totalArticle",JSON.stringify(response.data));
        window.localStorage.setItem("article_length",response.data.length);
        if(window.localStorage.article_length%8==0)
        {
          _this.lent=window.localStorage.article_length/8;
        }
        else{
          _this.lent=parseInt(window.localStorage.article_length/8)+1;
        }
      })
      .catch((err) => {
        console.log(err);
      })
        }
      else{
        _this.article_length=JSON.parse(window.sessionStorage.totalArticle).length;
        _this.currentPage=parseInt(window.localStorage.article_page);
        // console.log("_this.article_length = ",_this.article_length);
        if(_this.article_length%8==0)
        {
          _this.lent=_this.article_length/8;
        }
        else{
          _this.lent=parseInt(_this.article_length/8)+1;
        }
        let response=JSON.parse(window.sessionStorage.getItem("totalArticle"));
        _this.person=JSON.parse(window.localStorage.getItem("person"));
        let timer=0;
        let arr=[];
        for(let i=0;i<response.length;i++){
          if(timer==8||i==response.length-1){
            if(timer==8&&i==response.length-1){
              _this.article.push(arr);
              arr=[response[i]];
              _this.article.push(arr);
            }
            else if(timer==8){
              _this.article.push(arr);
              arr=[response[i]];
              timer=1;
            }
            else if(i==response.length-1){
              arr.push(response[i]);
              _this.article.push(arr);
            }
          }else{
            arr.push(response[i]);
            timer++;
          }
        }
        // console.log("_this.article = ",_this.article);
        // console.log("this.person = ",this.person[0].name);
      }
        }
    },
    data(){
      return {
        article:new Array(),
        person:'',
        name:'',
        lent:100,
        article_length:16,
        currentPage:parseInt(window.localStorage.article_page)
      }
    },
    methods:{
      turn_page(){
        // console.log("this.currentPage = ",this.currentPage);
        window.localStorage.setItem("article_page",this.currentPage);
        window.localStorage.setItem("turn_page",true);
        this.reload();
      },
      turn_name(index){
        let _this=this;
        // console.log("index = ",index);
        this.$axios.post("/turnArticle",{
          name:index
        })
        .then(function(response){
          window.localStorage.setItem("preArticle",JSON.stringify(response.data));
          window.localStorage.setItem("preName",index);
          _this.$router.push("/preArticle");
        })
        .catch((err) => {
          console.log(err);
        })
        // var _this=this;
        // this.$axios.post("/turnArticle",{
        //   name:JSON.parse(window.localStorage.getItem("person"))[index].name
        // })
        // .then(function(response){
        //   window.localStorage.setItem("preArticle",JSON.stringify(response.data));
        //   window.localStorage.setItem("preName",JSON.parse(window.localStorage.getItem("leavenote"))[index].name);
        //   _this.$router.push("/preArticle");
        // })
        // .catch((err) => {
        //   console.log(err);
        // })
      },
      Check(index){
        // alert(index);
        window.localStorage.setItem("ArticleId",8*(this.currentPage-1)+index);
        // console.log("8*this.currentPage+index = ",8*(this.currentPage-1)+index);
        // 首页的文章顺序ID
        window.localStorage.setItem("Check_id",this.article[this.currentPage-1][index].id);
        // console.log("this.article[this.currentPage-1][index].id = ",this.article[this.currentPage-1][index].id);
        // 所查看的数据库文章ID
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
  #divide{
    width:20%;
    position:relative;
    left:10%;
    margin-top:10px;
    margin-bottom:10px;
  }
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
  #divide{
    width:20%;
    margin:auto;
    text-align: center;
    margin-top:20px;
    margin-bottom:20px;
  }
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