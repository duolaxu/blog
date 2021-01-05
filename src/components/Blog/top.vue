<template>
  <div id="app">
      <div id="total">
          <div id="top">
              <h3>欢迎来到{{Name}}的博客</h3>
          </div>
          <div id="img">
              <img src="../../picture/blog.webp" alt="图片加载失败">
          </div>
          <div id="center">
              <h5>{{Name}}</h5>
          </div>
          <div id="bottom">
              <router-link to="/" id="span_1">主页</router-link>
              <span id="span_2"></span>
              <router-link :to="{name:'blogs',params:{id:ID}}" id="span_3">发表文章</router-link>
              <span id="span_4"></span>
              <span id="span_5" @click="Click">退出</span>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name:'top',
    data(){
        return {
            ID:window.localStorage.getItem("ID"),
            Name:window.localStorage.getItem("Name")
        }
    },
    methods:{
        Click(){
            window.localStorage.removeItem("article");
            window.localStorage.removeItem("ID");
            window.localStorage.removeItem("article_id");
            window.localStorage.setItem("Name","Doraemon");
            window.localStorage.setItem("main",false);
            window.localStorage.setItem("status",false);
            this.$store.commit("setLog",JSON.parse(window.localStorage.getItem("status")));
            this.$router.replace("/exit");

        }
    }
}

</script>
<style scoped>
#app{
  z-index:10;
  background: rgba(0,0,0,0);
}
#total{
    width:300px;
    height:200px;
    text-align:center;
    margin:auto;
}
#top{
    position:relative;
    top:15px;
}
#img{
    width:50px;
    height:50px;
    margin:auto;
    position:relative;
    top:25px;
}
img{
    width:50px;
    height:50px;
    border-radius: 50%;
    margin:auto;

}
#center{
    position:relative;
    top:28px;
}
#bottom{
    position:relative;
    top:35px;
    width:150px;
    height:20px;
    margin:auto;
    font-size:14px;
}
#span_1{
    text-decoration: none;
    color: rgb(117 120 125);
    display: inline-block;
    position: relative;
    left:-10px;
}
#span_2{
    display: inline-block;
    width: 1px;
    height:15px;
    background-color: rgb(212 212 212);
    position: relative;
    left:-5px;
    top:2px;
}
#span_3{
    color:rgb(115 96 191);
    display: inline-block;
    text-decoration: none;
}
#span_4{
    display: inline-block;
    width: 1.5px;
    height:15px;
    background-color: rgb(212 212 212);
    position: relative;
    left:5px;
    top:2px;
}
#span_5{
    color:red;
    display: inline-block;
    position: relative;
    left:10px;
    text-decoration: none;
    cursor: pointer;
}
</style>