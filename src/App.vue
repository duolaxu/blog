<template>
  <body id="body">
    <div id="app">
      <top v-if="!show" id="top_0"></top>
      <sidebar v-if="show" id="side_0"></sidebar>
      <router-view v-if="isRouterAlive"></router-view>
      <div id="particle">
  <vue-particles
      class="login-bg"
      color="#39AFFD"
      :particleOpacity="0.7"
      :particlesNumber="100"
      shapeType="circle"
      :particleSize="4"
      linesColor="#8DD1FE"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="false"
      hoverMode="grab"
      :clickEffect="false"
      clickMode="push"
      >
      </vue-particles>
</div>
  </div>
  </body>
</template>

<script>

import sidebar from "./components/update/sidebar/sidebar"
import top from "./components/Blog/on"
export default {
  name: 'App',
  components: {
    sidebar,
    top
  },
  computed:{
    wide_x(){
      return this.$store.state.wide;
    },
    judge_status(){
      return this.$store.state.log;
    }
  },
  watch:{
    wide_x:function(a,b){
       var particle = document.getElementById("particle");
      particle.style.width=window.innerWidth+'px';
    },
    judge_status:function(a,b){
      this.show=a;
    }
  },
  mounted(){
    // console.log(JSON.parse(window.localStorage.totalArticle));
     var particle = document.getElementById("particle");
      particle.style.height=window.innerHeight+'px';
      particle.style.width=window.innerWidth+'px';

      let _this = this;
        // window.onresize = () =>{
        //     return(() => {
        //         window.screenWidth = document.body.clientWidth;
        //         _this.$store.state.wide = window.screenWidth;
        //     })()
        // }


      function timeout(fn, time) {
                let setTime = null;
                return function() {
                    if (setTime) {
                        clearTimeout(setTime);
                    }
                    setTime = setTimeout(fn, time);
                }
            }

            function action() {
              // console.log("防抖节流");
                window.screenWidth = document.body.clientWidth;
                _this.$store.state.wide = window.screenWidth;
            }
            window.addEventListener("resize", timeout(action, 500));




  },
  provide(){
    return{
      reload: this.reload
    };
  },
  data(){
    return{
      fe:File,
      isRouterAlive:true,
      wide:'',
      show:JSON.parse(window.localStorage.getItem("status")),
     audio: {
        name: '东西（Cover：林俊呈）',
        artist: '纳豆',
        url: 'https://music.163.com/outchain/player?type=2&id=65312&auto=1&height=66',
        cover: 'https://p1.music.126.net/5zs7IvmLv7KahY3BFzUmrg==/109951163635241613.jpg?param=300y300', // prettier-ignore
        lrc: 'https://cdn.moefe.org/music/lrc/thing.lrc',
      },
    };
},
methods:{
  upload(){
    var formdata=new FormData(document.getElementById("advForm"));
    this.$axios.post("/upload",formdata)
    .then(function(response){
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    })
  },
reload(){
  this.isRouterAlive=false;
  this.$nextTick(function(){
    this.isRouterAlive=true;
  })
}
}
}
</script>

<style>
body{
  background-size: 100% 100%;
  background-attachment: fixed;
  top: 0px;
  left: 0px;
}
#body{
  position:relative;
  width:100%;
  height:100%;
}
#app{
  display: fixed;
  top:0px;
  left:0px;
  z-index:0;
  width:100%;
  height:100%;
}
#side{
  z-index:10000;
}
</style>
<style scoped>
#particle{
  position: fixed;
  top:0px;
  left:0px;
  z-index:-10;
}
.login-bg{
   width: 100%;
    height: 100%;
    background-color: rgb(45 58 75);
}
</style>
<style scoped>
</style>
