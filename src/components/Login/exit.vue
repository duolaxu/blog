<template>
  <div id="app">
    <div id="total">
          <div id="top">
              <h3>欢迎来到{{Name}}的博客</h3>
          </div>
          <div id="img">
              <img src="../../picture/登录.svg" alt="图片加载失败">
          </div>
          <div id="center">
              <h5>请先登录</h5>
          </div>
          <div id="bottom">
              <router-link to="/exit" id="span_1"><span :plain="true" @click="open">主页</span></router-link>
              <span id="span_2"></span>
              <router-link to="/exit" id="span_3"><span :plain="true" @click="open">发表博客</span></router-link>
              <span id="span_4"></span>
              <router-link to="/login" id="span_5">登录</router-link>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    components:{

    },
  name:'exit',
  data(){
      return {
          Name:window.localStorage.getItem("Name")
      }
  },
  methods:{
      open(){
        this.$message.error('请先登录! ');
      }
  }
}

</script>
<style scoped>
#app{
  z-index:10;
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
    background-color: rgb(191 196 205);
    border-radius: 50%;
}
img{
    width:40px;
    height:40px;
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
}
</style>