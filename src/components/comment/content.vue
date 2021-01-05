<template>
  <div class="app">
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
import comment from "./comment"
import onsub from "./submit"
export default {
    name:'contart',
    components:{
        comment,
        onsub
    },
    inject:["reload"],
    methods:{
        swap_time(){
            var index=window.localStorage.getItem("article_id");
            var data = JSON.parse(window.localStorage.getItem("article"))[index].time;
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
    data(){
        return {
            time:'',
            name:'',
            count:Number,
            tag:''
        }
    },
    mounted(){
        var index=window.localStorage.getItem("article_id");
        var _this=this;
        this.time = JSON.parse(window.localStorage.getItem("article"))[index].time;
        this.name = window.localStorage.Name;
        this.$axios.post("/getcomment",{
          id:JSON.parse(window.localStorage.getItem("article"))[index].id
        })
        .then(function(response){
          _this.$store.commit("setComment",response.data);
        })
        var content=document.getElementById("content");
        var title=document.getElementById("title");
        var digest=document.getElementById("digest");
        var markDownIt=require("markdown-it");
        var md=new markDownIt();
        var reault = md.render(JSON.parse(window.localStorage.getItem("article"))[index].content);
        this.tag = JSON.parse(window.localStorage.getItem("article"))[index].tags;
        content.innerHTML=reault;
        this.count=this.wordCount(reault);
        title.innerHTML="<h1>"+JSON.parse(window.localStorage.getItem("article"))[index].title+"</h1>";
        digest.innerText="摘要: "+JSON.parse(window.localStorage.getItem("article"))[index].digest;
    }
}

</script>
<style scoped>
@media screen and (max-width:420px) {
    #name{
    width: 130px;
    height:75px;
    margin: auto;
    font-size: 30px;
    position: relative;
    top:20px;
    margin-top:30px;
    color:white;
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
    width:100%;
    height:30px;
    border: 0px solid black;
    border-width:0px 0px 1px 0px;
}
#bottom_2{
    width:100%;
    height:50px;
}
.edit_1{
    font-size:14px;
    color:rgb(160,158,163);
    margin-left: 20px;
    display:block;
    position:relative;
    top:15px;
    left:-3px;
}
#total{
    width:90%;
    margin:auto;
    background-color: rgb(250 250 250);
    border-radius: 3px;
    opacity: 0.95;
    margin-top: 70px;
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
    width:100%;
    height:40px;
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
    width: 130px;
    height:80px;
    margin: auto;
    font-size: 30px;
    position: relative;
    top:20px;
    color:white;
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
}
.edit_1{
    font-size:14px;
    color:rgb(160,158,163);
    margin-left: 550px;
    display:block;
    position:relative;
    top:15px;
    left:-3px;
}
#total{
    width:900px;
    margin:auto;
    background-color: rgb(250 250 250);
    border-radius: 3px;
    opacity: 0.95;
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