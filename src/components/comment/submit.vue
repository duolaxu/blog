<template>
  <div>
      <div class="comment">
          <textarea id="area">

          </textarea><br />
          <span id="hide" v-if="show">评论不能为空!!!</span>
          <button id="btn" @click="submit">提交评论</button>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            show:false
        }
    },
    inject: ["reload"],
    methods:{
        submit(){
            let _this=this;
            if(JSON.parse(window.localStorage.getItem("status")))
            {
            //判断用户是否登录，这里已登录
            var myDate=new Date();
            var time=myDate.toLocaleString();
            var area = document.getElementById("area");
            if(JSON.parse(window.localStorage.getItem("out")))
            {
                //这里表示的是在首页查看的文章
                var comment={
                content:area.value,
                user_name:window.localStorage.getItem("Name"),
                essay_id:JSON.parse(window.localStorage.getItem("Check_id")),
                time
            }
            }
            else{
                //这里表示的是查看的自己的文章
                 var comment={
                content:area.value,
                user_name:window.localStorage.getItem("Name"),
                essay_id:JSON.parse(window.localStorage.getItem("Check_id")),
                time
            }
            }
            let judge=false;
            for(let i=0;i<area.value.length;i++)
            {
                if(area.value[i].charCodeAt()!=32)
                {
                    judge=true;
                    this.$axios.post("/comment",{
               comment
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
                this.show=true;
            }
            else{
                this.show=false;
                setTimeout(function(){
                    _this.reload();
                },500)
            }
            
            area.value="";
            }
            else{
                this.$message.error({
                    message:"登录之后才能发表评论哟",
                    center:true
                })
            }
            
        }
    }
}

</script>
<style scoped>
@media screen and (max-width:420px) {
    #area{
        display: block;
    border-radius: 10px;
    margin:auto;
    width:100%;
    height:107px;
    background: transparent;
    color:white;
}
#area:focus{
    outline: none;
    border: 1px solid white;
}
#hide{
    color:red;
    font-size:14px;
    z-index:1000;
    position: absolute;
    margin-left: 20px;
}
#btn{
   background-color: rgb(221 221 221);
   width:70px;
   height:30px;
   outline:none;
   border-radius: 3px;
   border:0px;
   font-size:14px;
   margin-left:79%;
   margin-top:-10px;
   cursor: pointer;
}
#btn:hover{
    background-color: transparent;
    color: white;
    border: 1px solid white;
}
}
@media screen and (min-width:421px){
    #area{
    border-radius: 10px;
    margin:auto;
    width:898px;
    height:107px;
    background: transparent;
    color:white;
}
#area:focus{
    outline: none;
    border: 1px solid white;
}
#hide{
    color:red;
    font-size:14px;
    z-index:1000;
    position: absolute;
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
    background-color: transparent;
    color: white;
    border: 1px solid white;
}
}
</style>