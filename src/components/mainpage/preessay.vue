<template>

  <div>
      <div id="name">
          <div class="name">
              <h1>{{name}}</h1>
          </div>
      </div>
      <div id="total">
          <div id="main">
          <div id="title">
          </div><br />
          <div id="other">
              <div id="time_2">{{swap_time()}}</div>
              <div id="count_2">字符统计: {{count}}字</div> 
              <div id="tag_2">
                  文章标签: {{tag}}
              </div>
          </div>
          <div id="digest">

          </div>
          <br />

          <div id="content" class="markdown-body">

          </div>
          <div id="bottom_1">

          </div>
           <div id="bottom_2">
               <span class="edit_1">posted @ {{time}} {{name}}</span>
          </div>
      </div>
      </div>
      <comment></comment>
      <div id="onsub">
          <onsub class="onsub"></onsub>
      </div>
  </div>
</template>

<script>
import comment from "../comment/comment"
import onsub from "../comment/submit"
export default {
    name:'contart',
    data(){
        return {
            show:false,
            name:'',
            time:'',
            count:'',
            tag:''
        }
    },
    methods:{
        swap_time(){
            var index=window.localStorage.getItem("ArticleId");
            var data = JSON.parse(window.sessionStorage.getItem("totalArticle"))[index].time;
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
        wordCount(data) {
  const pattern = /[a-zA-Z0-9_\u0392-\u03c9\u0410-\u04F9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g;
  const m = data.match(pattern);
  let count = 0;
  if (m === null) return count;
  for (let i = 0; i < m.length; i++) {
    if (m[i].charCodeAt(0) >= 0x4E00) {
      count += m[i].length;
    } else {
      count += 1;
    }
  }
  return count;
}
    },
    components:{
        comment,
        onsub
    },
    inject:["reload"],
    mounted(){
        this.show=JSON.parse(window.localStorage.getItem("status"));
        var index=window.localStorage.getItem("ArticleId");
        this.name=JSON.parse(window.localStorage.getItem("person"))[index].name;
        this.time=JSON.parse(window.sessionStorage.getItem("totalArticle"))[index].time;
        var _this=this;
        this.$axios.post("/getcomment",{
          id:JSON.parse(window.sessionStorage.getItem("totalArticle"))[index].id
        })
        .then(function(response){
          _this.$store.commit("setComment",response.data);
        })
        var content=document.getElementById("content");
        var title=document.getElementById("title");
        var digest=document.getElementById("digest");
        var markDownIt=require("markdown-it");
        var md=new markDownIt();
        this.tag=JSON.parse(window.sessionStorage.getItem("totalArticle"))[index].tags;
        var reault = md.render(JSON.parse(window.sessionStorage.getItem("totalArticle"))[index].content);
        this.count=this.wordCount(reault);
        this.time=JSON.parse(window.sessionStorage.getItem("totalArticle"))[index].time;
        content.innerHTML=reault;
        title.innerHTML="<h1>"+JSON.parse(window.sessionStorage.getItem("totalArticle"))[index].title+"</h1>";
        digest.innerText="摘要: "+JSON.parse(window.sessionStorage.getItem("totalArticle"))[index].digest;
    }
}

</script>
<style scoped>
@media screen and (max-width:420px) {
    #name{
    width:50%;
    margin:auto;
    height:60px;
    color:white;
    text-align: center;
}
#other{
    font-size: 15px;
    color:rgb(113,127,140);
    margin-left:10%;
    position:relative;
    top:-10px;
}
#time_2{
    position: relative;
    top: -10px;
}
#count_2{
    position: relative;
    top:-6px;
}
#tag_2{
    position: relative;
    top:0px;
}
#onsub{
    width:90%;
    margin:auto;
}
.onsub{
    margin-top:20px;
}
.comment{
    width:900px;
    height:200px;
    margin: auto;
    border-radius: 5px;
    margin-top:20px;
}
#bottom_1{
    width:900px;
    height:30px;
    border: 0px solid black;
    border-width:0px 0px 1px 0px;
}
#bottom_2{
    width:100%;
    height:50px;
    margin-left:-3px;
}
.edit_1{
    font-size:14px;
    color:rgb(160,158,163);
    margin-left:5%;
    display:block;
    position:relative;
    top:15px;
}
#total{
    width:90%;
    margin:auto;
    background-color: white;
    border-radius: 3px;
}
#main{
    background-color: white;
    border-radius: 10px;
    width:95%;
    height: auto;
    overflow: hidden;
    word-wrap: break-word;
    word-break:break-all;
    text-overflow: ellipsis;
    margin: auto;
}
#title{
    text-align: center;
    width: auto;
    height: auto;
}
#digest{
    text-indent: 30px;
    width: auto;
    height: auto;
}
#content{
    text-indent: 30px;
}
}
@media screen and (min-width:421px) {
    #name{
    width:300px;
    margin:auto;
    height:60px;
    color:white;
    text-align:center;
}
#other{
    font-size: 15px;
    color:rgb(113,127,140);
    margin-left: 100px;
    position:relative;
}
#time_2{
    position: relative;
    top: -10px;
    display: inline-block;
}
#count_2{
    position: relative;
    top:-10px;
    margin-left: 20px;
    display: inline-block;
}
#tag_2{
    position: relative;
    margin-left: 20px;
    top:-10px;
    display: inline-block;
}
#onsub{
    width:900px;
    margin:auto;
}
.onsub{
    margin-top:20px;
}
.comment{
    width:900px;
    height:200px;
    margin: auto;
    border-radius: 5px;
    margin-top:20px;
}
#bottom_1{
    width:900px;
    height:30px;
    border: 0px solid black;
    border-width:0px 0px 1px 0px;
}
#bottom_2{
    width:900px;
    height:50px;
    margin-left:-3px;
}
.edit_1{
    font-size:14px;
    color:rgb(160,158,163);
    margin-left: 550px;
    display:block;
    position:relative;
    top:15px;
}
#total{
    width:900px;
    margin:auto;
    background-color: white;
    border-radius: 3px;
}
#main{
    background-color: white;
    border-radius: 10px;
    width:95%;
    height: auto;
    overflow: hidden;
    word-wrap: break-word;
    word-break:break-all;
    text-overflow: ellipsis;
    margin: auto;
}
#title{
    text-align: center;
    width: auto;
    height: auto;
}
#digest{
    text-indent: 30px;
    width: auto;
    height: auto;
}
#content{
    text-indent: 30px;
}
}
</style>