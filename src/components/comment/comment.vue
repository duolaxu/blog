<template>
  <div>
      <div id="comment">
          <div id="inset">
              <div :key="item.t" v-for="(item,index) in $store.state.comment">
              <div class="comt">
                  <span class="name">
                      <a class="floor_1" href="#area">#第{{index+1}}楼</a>&nbsp;&nbsp;&nbsp;&nbsp;
                  {{item.time}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span class="name_1" @click="pre_article(index)">{{item.user_name}}</span><br />
              </span>
              <span class="txt">
                  {{item.content}}
              </span>
              </div>
          </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'comment',
    methods:{
        pre_article(index){
        
        var _this=this;
        this.$axios.post("/turnArticle",{
          name:_this.$store.state.comment[index].user_name
        })
        .then(function(response){
          window.localStorage.setItem("preArticle",JSON.stringify(response.data));
          window.localStorage.setItem("preName",_this.$store.state.comment[index].user_name);
          _this.$router.push("/preArticle");
        })
        .catch((err) => {
          console.log(err);
        })
      }
    }
}

</script>
<style scoped>
@media screen and (max-width:420px) {
    .comt{
        width:300px;
        height:60px;
        position: relative;
        top:13px;
    }
    .name_1{
        cursor: pointer;
    }
    .name_1:hover{
        color:red;
    }
    .floor_1{
        cursor: pointer;
        color:black;
        text-decoration: none;
    }
    .floor_1:hover{
        color:red;
    }
    .txt{
        margin-top:5px;
    }
    #comment{
    margin:auto;
    margin-top:15px;
    background-color: white;
    opacity: 0.8;
    border-radius: 10px;
    width:90%;
    height: auto;
    overflow: hidden;
    word-wrap: break-word;
    word-break:break-all;
    text-overflow: ellipsis;
     box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
#inset{
    width:90%;
    margin-left: 10px;
}
}
@media screen and (min-width:421px) {
    .comt{
        width:300px;
        height:60px;
        position: relative;
        top:13px;
    }
    .name_1{
        cursor: pointer;
    }
    .name_1:hover{
        color:red;
    }
    .floor_1{
        cursor: pointer;
        color:black;
        text-decoration: none;
    }
    .floor_1:hover{
        color:red;
    }
    .txt{
        position: relative;
        top:5px;
        left: 10px;
    }
    #inset{
        width:90%;
        margin-left: 10px;
        font-size:14px;
    }
    #comment{
    margin:auto;
    margin-top:15px;
    background-color: white;
    opacity: 0.8;
    border-radius: 10px;
    width:900px;
    height: auto;
    overflow: hidden;
    word-wrap: break-word;
    word-break:break-all;
    text-overflow: ellipsis;
     box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
}
</style>