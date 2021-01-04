<template>
  <div>
      <div id="img_1" class="animate__animated animate__backInUp">
          <img src="../../../picture/home.jpg" alt="图片加载失败">
          <div id="sp_4">
              <div id="name_1"><h1>{{name}}</h1></div><br />
              <div id="word"><strong>你所热爱的东西 有一天会反过来拥抱你</strong></div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    methods:{
        turn(){
            var context = document.getElementById("context");
        }
    },
    data(){
        return {
            name:''
        }
    },
    computed:{
        wide_1(){
            return this.$store.state.wide;
        }
    },
    watch:{
        wide_1:function(a,b){
        var img = document.getElementById("img_1");
        img.style.width=window.innerWidth+'px';
        img.style.height=window.innerHeight+'px';
        this.name = window.localStorage.Name;
        }
    },
    mounted() {
        var img = document.getElementById("img_1");
        img.style.width=window.innerWidth+'px';
        img.style.height=window.innerHeight+'px';
        this.name = window.localStorage.Name;
    },
}

</script>
<style lang="scss" scoped>
@media screen and (max-width:420px) {
#img_1{
    display: inline-block;
    a{
    display: block;
    width:30px;
    height:30px;
    border-radius: 50%;
    background-color: aqua;
    z-index:1000;
    position: relative;
    top:-30px;
    margin: auto;
    left:25px;
}
    img{
    width:100%;
    height:100%;
    display: block;
}
}
#sp_4{
    z-index:100;
    position: absolute;
    top:0px;
    left:0px;
    margin-top: 230px;
    margin-left:36px;
    color: white;
    width:90%;
}
#name_1{
    width: 100%;
    font-size:13px;
    margin-left: -30px;
    margin:auto;
    text-align: center;
    color:white;
}
#word{
    width: 100%;
    font-size:10px;
    margin:auto;
    text-align: center;
    color:white;
    margin-left:-20px;
}
}
@media screen and (min-width:421px) {
    #img_1{
    display: inline-block;
}
#img_1 a{
    display: block;
    width:30px;
    height:30px;
    border-radius: 50%;
    background-color: aqua;
    z-index:1000;
    position: relative;
    top:-4px;
    margin: auto;
}
#img_1 img{
    width:100%;
    height:100%;
    display: block;
}
#sp_4{
    z-index:100;
    position: relative;
    top: -70%;
    color: white;
    width:700px;
    height:auto;
    margin:auto;
}
#name_1{
    width:80%;
    font-size:40px;
    margin:auto;
    margin-top:-200px;
    text-align: center;
    color:white;
    position: relative;
    top:190px;
}
#word{
    font-size: 35px;
    text-align: center;
    margin:auto;
    position: relative;
    top:170px;
}
}
</style>