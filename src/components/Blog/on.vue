<template>
  <div>
      <div id="bar">
          <div class="flex" id="flex_1" @click="home_page"><span class="sp">首页</span></div>
          <div class="flex" id="flex_2" @click="turn_to"><span class="sp">留言墙</span></div>
          <div class="flex" id="flex_3">
              <span class="sp" v-if="!log"  @click="login">登录</span>
          </div>
          <div class="flex" id="flex_4" @click="regist"><span class="sp">个人中心</span></div>
      </div>
  </div>
</template>

<script>
import ontop from "./ontop"
export default {
    components:{
        ontop
    },
    mounted(){

    },
    inject:["reload"],
    data(){
        return {
            log:this.$store.state.log
        }
    },
    watch:{
  log(val,oldVal){
      alert("被监听");
    this.reload();
  },
    deep:true
  },
    methods:{
        swap(){

        },
        up() {
          this.reload();  
        },
        turn_to(){
            if(window.location.pathname!="/leavenote")
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
        detail(){
            this.$router.push({
            name:'detail',
            params:{
              id:window.localStorage.getItem("ID")
            }
          });
        },
        home_page(){
            if(window.location.pathname!="/chief")
            this.$router.push("/chief");
        }
    }
}

</script>
<style scoped>
@media screen and (max-width:420px) {
    #bar{
    height:50px;
    width:100%;
    background-color: rgb(51 51 51);
    position: fixed;
    top:0px;
    left:0px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    z-index: 1001;
}
.flex{
    width:25%;
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
    background-color:rgb(45 58 75);
    box-shadow: 1px 1px 3px white;
    font-size:19px;
    color: white;
}
#flex_2:hover{
    background-color:rgb(45 58 75);
    box-shadow: 1px 1px 3px white;
    font-size:19px;
    color: white;
}
#flex_3:hover{
    background-color: rgb(45 58 75);
    box-shadow: 1px 1px 3px white;
    font-size:19px;
    color: white;
}
#flex_4:hover{
    background-color: rgb(45 58 75);
    box-shadow: -1px 1px 3px white;
    font-size:19px;
    color: white;
}
}
@media screen and (min-width:421px) {
    #bar{
    height:50px;
    width:100%;
    background-color: rgb(51 51 51);
    position: fixed;
    top:0px;
    left:0px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    z-index: 1001;
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
    background-color:rgb(45 58 75);
    box-shadow: 1px 1px 3px white;
    font-size:19px;
    color: white;
}
#flex_2:hover{
    background-color:rgb(45 58 75);
    box-shadow: 1px 1px 3px white;
    font-size:19px;
    color: white;
}
#flex_3:hover{
    background-color: rgb(45 58 75);
    box-shadow: 1px 1px 3px white;
    font-size:19px;
    color: white;
}
#flex_4:hover{
    background-color: rgb(45 58 75);
    box-shadow: -1px 1px 3px white;
    font-size:19px;
    color: white;
}
}
</style>