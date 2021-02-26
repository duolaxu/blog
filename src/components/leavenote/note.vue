<template>
  <div>
    <div id="total">
<div class="title"><h1>留言墙</h1></div>
<div class="content">
      <div id="main">
        <div class="number">
          留言总数: {{count}}条
        </div>
        <div class="note" :key="item.id" v-for="(item,index) in article">
          <div class="line_1">
            <div class="left">
              <a href="#area" class="line_word_1">#第{{index}}楼</a>&nbsp;
            <span class="time">{{item.time}}</span>&nbsp;&nbsp;<br />
            <span class="name" @click="turn_name(index)">用户: {{item.name}}&nbsp;</span>&nbsp;
            </div>
            <div class="right">
              <a href="#area" class="line_word_2" @click="answer(index)">回复</a>
            <span class="line_word_2" @click="drop(index)">删除</span>
            </div>
          </div>
          
          
          <span class="txt">留言内容: {{item.content}}</span>
        </div>
      </div>
      
    </div>
    </div>

    <div id="onsub">
      <div class="comment">
          <textarea id="area">
              
          </textarea><br />
          <span id="hide" v-if="hide">评论不能为空!!!</span>
          <button id="btn" @click="submit">发表留言</button>
      </div>
  </div>
    
  </div>
</template>

<script>
export default {
    name:'note',
    components:{

    },
    inject:["reload"],
    mounted(){
        if(JSON.parse(window.localStorage.getItem("leavenote")))
        {
        this.article=JSON.parse(window.localStorage.getItem("leavenote"));
        this.count=JSON.parse(window.localStorage.getItem("leavenote")).length;
        window.localStorage.setItem("submit",false);
        }
        else{
          var _this=this;
          this.$axios.get("/getnote")
      .then(function(response){
        window.localStorage.setItem("leavenote",JSON.stringify(response.data));
        _this.article=JSON.parse(window.localStorage.getItem("leavenote"));
        _this.count=JSON.parse(window.localStorage.getItem("leavenote")).length;
        window.localStorage.setItem("submit",false);
      })
      .catch((err) => {
        console.log(err);
      })
        }
   
    },
    data(){
      return {
        article:'',
        count:Number,
        show:Boolean,
        hide:false
      }
    },
    methods:{
      submit(){
            if(JSON.parse(window.localStorage.getItem("status")))
            {
            var myDate=new Date();
            var time=myDate.toLocaleString();
            var area = document.getElementById("area");
            let judge=false;
            for(let i=0;i<area.value.length;i++)
            {
                if(area.value[i].charCodeAt()!=32)
                {
                window.localStorage.setItem("submit",true);
                let note=JSON.parse(window.localStorage.getItem("leavenote"));
                note.push({
                  id:note.length+1,
                  time,
                content:area.value,
                name:window.localStorage.getItem("Name")
            })
            window.localStorage.setItem("leavenote",JSON.stringify(note));
                judge=true;
                this.$axios.post("/note",{
                content:area.value,
                name:window.localStorage.getItem("Name"),
                time
            })
            .then(function(response){

            })
            .catch((err) => {
                console.log(err);
            })
            break;
                }
            }
            if(judge==false)
            {
              this.hide=true;
            }
            else{
                this.hide=false;
                this.reload();
            }
            area.value="";
            }
            else{
              let bar=document.getElementById("bar");
              bar.style.zIndex='2';
              setTimeout(function(){
                let bar=document.getElementById("bar");
                bar.style.zIndex='1001';
              },100)
                this.$message.error({
                    message:"登录之后才能发表评论哟",
                    center:true
                })
            }
            
        },
      answer(index){
        var area = document.getElementById("area");
        area.value=`@${JSON.parse(window.localStorage.getItem("leavenote"))[index].name}`;
      },
      
      turn_name(index){
        
        var _this=this;
        this.$axios.post("/turnArticle",{
          name:JSON.parse(window.localStorage.getItem("leavenote"))[index].name
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


       drop(index){
        let _this=this;
        this.$confirm('是否删除该评论?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          _this.$axios.post('/delete_note',{
          id:_this.article[index].id
        })
        .then(function(response) {
          let note = JSON.parse(window.localStorage.getItem("leavenote"));
           note.splice(index,1);
           window.localStorage.setItem("leavenote",JSON.stringify(note));
           _this.reload();
        })
        .catch((err) => {
          console.log(err);
         })

         window.localStorage.setItem("submit",true);

        }).catch(() => {        
        });
      },
    }
}

</script>
<style scoped>
@media screen and (max-width:420px) {

#total{
  margin-top:50px;
  z-index:0;
}

#area{
    border-radius: 10px;
    margin:auto;
    width:90%;
    height:100px;
    margin-left:15px;
    background: transparent;
    color:white;
}
#area:focus{
    outline: none;
    border:1px solid white;
}
#hide{
    color:red;
    font-size:14px;
    z-index:1000;
}
#btn{
   background-color: rgb(221 221 221);
   width:70px;
   height:30px;
   outline:none;
   border-radius: 3px;
   border:0px;
   font-size:14px;
   margin-left:75%;
   margin-top:10px;
   cursor: pointer;
}
#btn:hover{
    background: transparent;
    border: 1px solid white;
    color:white;
}

  #onsub{
  margin: auto;
  margin-top: 20px;
  color:white;
}
.title{
  width:100px;
  height:45px;
  margin:auto;
  color:white;
}
.content{
  font-size: 11px;
  width: 90%;
  height:auto;
  margin:auto;
  background-color: white;
  border-radius: 5px;
  opacity:0.8;
}
#main{
  width:90%;
  margin:auto;
  height: auto;
    overflow: hidden;
    word-wrap: break-word;
    word-break:break-all;
    text-overflow: ellipsis;
}
.number{
  width:100%;
  height:30px;
  border:0px solid black;
  border-width: 0px 0px 1px 0px;
}
.name{
  cursor: pointer;
}
.name:hover{
  color:red;
}
.txt{
  margin-top:5px;
  display:block;
}
.note{
  height:80px;
}
.line_word_1{
  text-decoration: none;
  color: black;
}
.line_word_2{
  text-decoration: none;
  color: black;
  margin-left:30%;
}
.line_word_1:hover{
  color: red;
  cursor: pointer;
}
.line_word_2:hover{
  color: red;
  cursor: pointer;
}
.left{
  display: inline-block;
  width: 50%;
}
.right{
  display: inline-block;
  width:50%;
}
}
@media screen and (min-width:421px) {

#total{
  margin-top:50px;
}
  #onsub{
  width:900px;
  margin: auto;
  margin-top: 20px;
  color:white;
}
.onsub{
  margin-top: 20px;
}
#sub{
  width:898px;
  height:108px;
  background-color: aqua;
}


#area{
    border-radius: 10px;
    margin:auto;
    width:898px;
    height:108px;
    background: transparent;
    color:white;
}
#area:focus{
    outline: none;
    border:1px solid white;
}
#hide{
    color:red;
    font-size:14px;
    z-index:1000;
}
#btn{
   background-color: rgb(221 221 221);
   width:70px;
   height:30px;
   outline:none;
   border-radius: 3px;
   border:0px;
   font-size:14px;
   margin-left:829px;
   margin-top:10px;
   cursor: pointer;
}
#btn:hover{
    color:white;
    border: 1px solid white;
    background: transparent;
}

.title{
  width:100px;
  height:45px;
  margin:auto;
  color:white;
}
.content{
  width:898px;
  height:auto;
  margin:auto;
  background-color: white;
  border-radius: 5px;
  opacity:0.8;
}
#main{
  width:90%;
  margin:auto;
  height: auto;
    overflow: hidden;
    word-wrap: break-word;
    word-break:break-all;
    text-overflow: ellipsis;
}
.number{
  width:100%;
  height:30px;
  border:0px solid black;
  border-width: 0px 0px 1px 0px;
}
.name{
  font-size: 14px;
  cursor: pointer;
}
.name:hover{
  color:red;
}
.time{
  font-size: 14px;
}
.txt{
  font-size:14px;
  margin-left:15px;
  display:block;
}
.note{
  height:70px;
}
.line_word_1{
  font-size: 14px;
  text-decoration: none;
  color: black;
}
.line_word_2{
  font-size: 14px;
  text-decoration: none;
  color: black;
  margin-left: 100px;
}
.line_word_1:hover{
  color: red;
  cursor: pointer;
}
.line_word_2:hover{
  color: red;
  cursor: pointer;
}
.left{
  display: inline-block;
  width: 50%;
}
.right{
  display: inline-block;
  width:50%;
}
}
</style>