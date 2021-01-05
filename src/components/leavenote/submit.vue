<template>
  <div>
      <div class="comment">
          <textarea id="area">
              
          </textarea><br />
          <span id="hide" v-if="show">评论不能为空!!!</span>
          <button id="btn" @click="submit">发表留言</button>
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
            if(JSON.parse(window.localStorage.getItem("status")))
            {
            var myDate=new Date();
            var time=myDate.toLocaleString();
            var area = document.getElementById("area");
            var comment={
                content:area.value,
                user_name:window.localStorage.getItem("Name")
            }
            let judge=false;
            for(let i=0;i<area.value.length;i++)
            {
                if(area.value[i].charCodeAt()!=32)
                {
                window.localStorage.setItem("submit",true);
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
                
                this.show=true;
            }
            else{
                this.show=false;
                let _this=this;
                setTimeout(function(){
                    _this.reload();
                },300)
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
#area{
    border-radius: 10px;
    margin:auto;
    width:898px;
    height:108px;
    background-color: transparent;
}
#area:focus{
    outline: none;
    border: 1px solid white;
    color:white;
}
#hide{
    color:red;
    font-size:14px;
    z-index:1000;
    position: absolute;
}
#btn{
   width:70px;
   height:30px;
   outline:none;
   border-radius: 3px;
   border:0px;
   font-size:14px;
   margin-left:820px;
   margin-top:10px;
   cursor: pointer;
   color:black;
}
#btn:hover{
    color:white;
    background-color: rgb(41 60 58);
    border: 0.5px solid white;
}
</style>