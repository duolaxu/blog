<template>
  <div>
<div id="menu">
    <el-menu
  :default-active="activeIndex2"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="transparent"
  font-size="20px"
  text-color="#FFFFFF"
  active-text-color="#FFFFFF">
  <el-submenu index="2" id="submenu">
    <template slot="title" id="title">{{name}}</template>
    <el-menu-item index="2-1" @click="turnblog">我的博客</el-menu-item>
    <el-menu-item index="2-2" @click="turncount">账户设置</el-menu-item>
    <el-menu-item index="2-3" @click="turnexit">退出</el-menu-item>
  </el-submenu>
</el-menu>
</div>

  </div>
</template>

<script>
 export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        name:window.localStorage.getItem("Name")
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        
      },
      turnexit(){
          var _this=this;
  this.$confirm('确定要执行退出操作退出？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
             window.localStorage.removeItem("article"),
            window.localStorage.removeItem("ID"),
            window.localStorage.removeItem("article_id");
            window.localStorage.setItem("Name","Doraemon");
            window.localStorage.setItem("main",false);
            window.localStorage.setItem("status",false);
            _this.$store.commit("setLog",JSON.parse(window.localStorage.getItem("status")));
            _this.$router.replace("/exit");
        }).catch(() => {

        });
      },
      turncount(){

      },
      turnblog(){
          this.$router.push("/main");
      }
    }
  }

</script>
<style scoped>
#title{
    border: 0px solid white;
}
#submenu{
    width:129px;
    height:50px;
    background-color: transparent;
    border: 0px solid white;
    font-size:20px;
}
#menu{
    margin-top:-10px;
    width:100px;
    height:50px;
    border: 0px solid white;
    
}
.el-menu-demo{
    width:100px;
    height:50px;
    border: 0px solid white;
}
</style>