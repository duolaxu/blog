<template>
  <div>
      <on v-show="hide"></on>
          <div id="side" @resize="change">
              <div id="sidebar_1" v-if="!device">
          <div id="img">
              <div class="img">
                  <img src="" id="head_img_1" alt="">
              </div>
          </div>
          <div id="home_page" class="avg" @click="turn_home">
              <div class="sp">
                  首页
              </div>
          </div>
          <div id="wall" class="avg" @click="turn_wall">
              <div class="sp">
                  留言墙
              </div>
          </div>
          <div id="resource" class="avg" @click="turn_resource">
              <div class="sp">
                  个人博客
              </div>
          </div>
          <div id="catalog" class="avg" @click="turn_blog">
              <div class="sp">
                  博客列表
              </div>
          </div>
          <div id="link" class="avg" @click="write_article">
              <div class="sp">
                  发表文章
              </div>
          </div>
          <div id="about" class="avg" >
              <div class="sp">
                  修改头像
                  <input type="file" ref="file_id" id="img_head" @change="GetFile">
              </div>
          </div>
          <div id="exit" class="avg" @click="exit">
              <div class="sp">
                  退出
              </div>
          </div>
          <div id="hide" @click="slow">
          <div class="sp_1">
              <i id="icon_i_1" class="iconfont icon-yincanganniu2x">
              </i>
              <i id="icon_i_2" class="iconfont icon-anniu">
              </i>
          </div>
      </div>
      </div>
      <div id="sidebar_2" v-if="device">
          <div id="img">
              <div class="img">
                  <img src="" alt="" id="head_img_2" @click="show_img">
              </div>
          </div>
          <div id="home_page" class="avg" @click="turn_home">
              <div class="sp">
                  首页
              </div>
          </div>
          <div id="wall" class="avg" @click="turn_wall">
              <div class="sp">
                  留言墙
              </div>
          </div>
          <div id="about" class="avg" @click="turn_resource">
              <div class="sp">
                  个人博客
              </div>
          </div>
          <div id="sect" class="sp sect_sp">
          <div id="down">
              <div id="mine">
                  我的
              </div>
          </div>
          <div id="opt">
            <div class="opt" @click="turn_blog">
              <div class="sp_item">
                  博客列表
              </div>
          </div>
          <div class="opt" @click="write_article">
              <div class="sp_item">
                  发表文章
              </div>
          </div>
          <div class="opt">
              <div class="sp_item">
                  修改头像
                  <input type="file" ref="file_id" id="img_head" @change="GetFile">
              </div>
          </div>
          <div class="opt" @click="exit">
              <div class="sp_item">
                  退出
              </div>
          </div>
          </div>
          
      </div>
          <div id="hide" @click="slow">
          <div class="sp_1">
              
          </div>
      </div>
      </div>
          </div>
      
      
  </div>
</template>

<script>
import on from "../../Blog/on"
export default {
    components:{
        on
    },
    computed:{
        wide_X(){
            return this.$store.state.wide;
        }
    },
    watch:{
        wide_X:function(c,d){
         
            if(c<405)
            {
                    let head_img_2 = document.getElementById("head_img_2");
                    this.device=true;
                    let sidebar_2 = document.getElementById("sidebar_2");
                    if(sidebar_2)
                    {
                        sidebar_2.style.height = 43 + 'px';
                        sidebar_2.style.backgroundColor="rgb(51 51 51)";
                        head_img_2.src=window.localStorage.getItem("url_head");
                    }
            }
            else if(c>=405){
                this.device=false;
                    let sidebar_1 = document.getElementById("sidebar_1");
                    let sidebar_2 = document.getElementById("sidebar_2");
                    let head_img_2 = document.getElementById("head_img_2");
                    let head_img_1 = document.getElementById("head_img_1");
                    if(sidebar_2)
                    {
                        setTimeout(function(){
                            let head_img_1 = document.getElementById("head_img_1");
                            let sidebar_1 = document.getElementById("sidebar_1");
                            sidebar_1.style.height = window.innerHeight + 'px';
                            head_img_1.src = window.localStorage.getItem("url_head");
                        },10)
                    }
                    else if(sidebar_1)
                    {
                        sidebar_1.style.height = window.innerHeight + 'px';
                        sidebar_1.style.backgroundColor="rgb(51 51 51)";
                        head_img_1.src = window.localStorage.getItem("url_head");
                    }
            }
        }
    },
    mounted() {
         
        let side = document.getElementById("side");
        let sidebar_1 = document.getElementById("sidebar_1");
        let sidebar_2 = document.getElementById("sidebar_2");
        if(window.innerWidth>420)
        {
            this.device=false;
            sidebar_1.style.height = window.innerHeight + 'px';
        }
        else{
            this.device=true;
        }
        setTimeout(function(){
            let head_img_1=document.getElementById("head_img_1");
         let head_img_2=document.getElementById("head_img_2");
         this.url=window.localStorage.getItem("url_head");
         if(head_img_1)
         {
             head_img_1.src=this.url;
         }
        if(head_img_2){
            head_img_2.src=this.url;
         }
        },10)
    },
    data(){
        return {
            show:true,
            hide:false,
            ID:window.localStorage.getItem("ID"),
            prevent:false,
            device:false,
            screenWidth:'',
            file:'',
            url:''
        }
    },
    reload:["injected"],
    methods: {
        show_img(){
            let head_img=document.getElementById("head_img_2");
            head_img.src=window.localStorage.getItem("url_head");
        },
        turn_home(){
            if(window.location.pathname!="/chief")
            this.$router.push("/chief");
        },
        change(){
           
        },
        write_article(){
            let _this = this;
                this.$router.push(
                    {
                        name:'blogs',
          params:{
            id:_this.ID
          }
                    }
                )
        },
        turn_blog(){
             if(window.location.pathname!="/line")
            this.$router.push("/line");
        },
        turn_resource(){
             if(window.location.pathname!="/main")
            this.$router.push("/main");
        },
        GetFile(){
            let Files=this.$refs.file_id.files[0];
            let formData = new window.FormData(); 
            formData.append("file", Files);
            formData.append('name', window.localStorage.getItem("Name"));
            this.$axios.post("/change_head",formData)
            .then(function(response){
                let img_head_1=document.getElementById("head_img_1");
                let img_head_2=document.getElementById("head_img_2");
                window.localStorage.setItem("url_head",response.data.url);
                if(img_head_1)
                {
                    img_head_1.src=response.data.url;
                }
                if(img_head_2)
                {
                    img_head_2.src=response.data.url;
                }
            })
        },
        turn_wall(){
             if(window.location.pathname!="/leavenote")
            this.$router.push("/leavenote");
        },
        exit(){
             let _this=this;
  this.$confirm('确定要执行退出操作退出？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
             window.localStorage.removeItem("article"),
            window.localStorage.removeItem("ID"),
            window.localStorage.removeItem("article_id");
            window.localStorage.removeItem("preID");

            window.localStorage.setItem("Name","Doraemon");
            window.localStorage.setItem("main",false);
            window.localStorage.setItem("status",false);
            _this.$store.commit("setLog",JSON.parse(window.localStorage.getItem("status")));
            if(window.location.pathname=='/chief')
            {
                
            }
            else{
                _this.$router.replace("/chief");
            }
        }).catch(() => {        
        });
        },
        slow(){
            this.show=!this.show;
            let side = document.getElementById("sidebar_1");
            let line=side.style.marginLeft;
            let icon_1=document.getElementById("icon_i_1");
            let icon_2=document.getElementById("icon_i_2");
            if(!this.show)
            {
                let lent;
                if(line==false)
                {
                    lent = 0;
                    icon_1.style.display="none";
                    icon_2.style.display="block";
                }
                else{
                    icon_1.style.display="none";
                    icon_2.style.display="block";
                     lent=parseInt(side.style.marginLeft);
                }
            side.style.marginLeft=lent+'px';
            let add=0;
               let interval = setInterval(function(){
                    add++;
                    lent=lent-add;
                side.style.marginLeft=lent+'px';
                if(lent=='-66')
                {
                    clearInterval(interval);
                }
            },20)
            }
            else{
                icon_1.style.display="block";
                    icon_2.style.display="none";
                  let lent=parseInt(side.style.marginLeft);
            side.style.marginLeft=lent+'px';
            let add=0;
                let interval = setInterval(function(){
                    add++;
                    lent=lent+add;
                side.style.marginLeft=lent+'px';
                if(lent=='0')
                {
                    clearInterval(interval);
                }
            },10)
            }
        }
    },
}

</script>
<style scoped>
@media screen and (max-width:420px) {
    #img_head{
    width:100%;
    height:40px;
    opacity: 0;
    position: relative;
    top:-30px;
    cursor: pointer;
}
#img_head:hover{
    cursor: pointer;
}
#sect{
    width:70px;
    height:30px;
    position: relative;
}
#down:hover{
    color:white;
    background-color: rgb(61 60 60);
}
#down{
    height:43px;
    width:100%;
    position: relative;
    top:-10px;
}
#mine{
    position: relative;
    top:10px;
}
#opt{
    width:70px;
    height:0;
    transition:1s;
    position: absolute;
    top: 27px;
    margin-top:6px;
    overflow: hidden;
}
.sp_item{
    width:100%;
    display: block;
    padding-top: 10px;
}
.opt{
    height:40px;
}
.opt:hover{
    color:white;
    background-color: rgb(61 60 60);
    cursor: pointer;
}
#sect:hover #opt{
    height:160px;
    background-color: rgb(51 51 51);
}
#hide{
    display: none;
}
.sp_1{
    margin-left:9px;
    margin-top: 14px;
}
#sidebar_2{
    display: flex;
    z-index:1001;
    justify-content: space-between;
    height:43px;
    width:100%;
    background-color: rgb(51 51 51);
    color: rgb(167 167 167);
    position: fixed;
    left: 0px;
    top: 0px;
}
.avg{
    height:100%;
    width:21.5%;
    cursor: pointer;
}
.avg:hover{
    background-color: rgb(61 60 60);
    color:white;
}
.sp{
    width: 100%;
    text-align: center;
    font-size: 14px;
    position: relative;
    top: 10px;
}
#img{
    width: 15%;
    height:100%;
    
}
#img img{
    width:80%;
    height:115%;
    cursor: pointer;
    margin: auto;
    display: block;
}
.img{
    width:70%;
    height:50%;
    margin: auto;
    position: relative;
    top: 10px;
    
}
#span_3{
    text-decoration: none;
    color: rgb(167 167 167);
}
}
@media screen and (min-width:420px) {
    #hide{
    width: 10px;
    height:10px;
    border-radius: 50%;
    display: inline-block;
    font-size: 14px;
    position: relative;
    top: -425px;
    left: 70px;
    cursor: pointer;
}

.sp_1{
    margin-left:0px;
    margin-top: 0px;
}
#icon_i_1{
    font-size: 25px;
}
#icon_i_2{
    font-size: 25px;
    display: none;
}
#sidebar_1{
    z-index:1001;
    display: inline-block;
    height:100%;
    width:65px;
    background-color: rgb(51 51 51);
    color: rgb(167 167 167);
    position: fixed;
    left: 0px;
    top: 0px;
}
.avg{
    height:50px;
    width:100%;
    cursor: pointer;
}
.avg:hover{
    background-color: rgb(61 60 60);
    color:white;
}
.sp{
    width: 100%;
    text-align: center;
    font-size: 14px;
    position: relative;
    top: 16px;
}
#img_head{
    width:100%;
    height:40px;
    opacity: 0;
    position: relative;
    top:-30px;
    cursor: pointer;
}
#img_head:hover{
    cursor: pointer;
}
#img{
    width: 100%;
    height:80px;
}
#img img{
    width:100%;
    height:100%;
    cursor: pointer;
    margin: auto;
    display: block;
}
.img{
    width:70%;
    height:50%;
    margin: auto;
    position: relative;
    top: 20px;
}
#span_3{
    text-decoration: none;
    color: rgb(167 167 167);
}
}
</style>