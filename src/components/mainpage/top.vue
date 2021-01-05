<template>
  <div>
      <div id="bar">
          <div class="flex" id="flex_1" @click="home_page"><span class="sp">首页</span></div>
          <div class="flex" id="flex_2" @click="turn_to"><span class="sp">留言墙</span></div>
          <div class="flex" id="flex_3" @click="login"><span class="sp">登录</span></div>
          <div class="flex" id="flex_4" @click="regist"><span class="sp">注册</span></div>
      </div>
  </div>
</template>

<script>
export default {
    mounted(){
        var bar=document.getElementById("bar");
    },
    methods:{
        turn_to(){
            if(window.location.pathname!="/leavnote")
            this.$router.push("/leavenote");
        },
        regist(){
            if(window.location.pathname!="/regist")
            this.$router.push("/regist");
        },
        login(){
            if(window.location.pathname!="/login")
            this.$router.push("/login");

        },
        home_page(){
            if(window.location.pathname!="/")
            this.$router.push("/");
        }
    }
}

</script>
<style scoped>
#bar{
    height:50px;
    width:100%;
    background-color: rgb(204,204,255);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    opacity:0.7 ;
}
.flex{
    width:10%;
    height:100%;
    color:rgb(255 255 204);
    text-align: center;
    cursor: pointer;
}
.sp{
    display: block;
    margin-top:11px;
    transition:font-size 0.3s;
}
#flex_1:hover{
    background-color: #6699CC;
    box-shadow: 6px 5px 15px white;
    font-size:19px;
    color: white;
}
#flex_2:hover{
    background-color: #6699CC;
    box-shadow: 6px 5px 15px white;
    font-size:19px;
    color: white;
}
#flex_3:hover{
    background-color: #6699CC;
    box-shadow: 6px 5px 15px white;
    font-size:19px;
    color: white;
}
#flex_4:hover{
    background-color: #6699CC;
    box-shadow: -10px 5px 15px white;
    font-size:19px;
    color: white;
}
</style>