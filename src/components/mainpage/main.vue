<template>
  <div>
      <div id="left">
        <preview id="pre"></preview>
      </div>
      <div id="right">
        <div id="right_tag">
          <div id="tag">
            <div id="tag_txt">
              <!-- Tags -->
              文章标签: 
            </div>
          </div>
          </div>
        <div id="right_cnt">
          <div class="tier">
          <div class="tier_div">
            <span class="tier_txt">
              HTML
            </span>
          </div>
        </div>
        <div class="tier">
          <div class="tier_div">
            <span class="tier_txt">
              CSS
            </span>
          </div>
        </div>
        <div class="tier">
          <div class="tier_div">
            <span class="tier_txt">
              JavaScript
            </span>
          </div>
        </div>
        <div class="tier">
          <div class="tier_div">
            <span class="tier_txt">
              Vue
            </span>
          </div>
        </div>
        <div class="tier">
          <div class="tier_div">
             <span class="tier_txt">
              node
            </span>
          </div>
        </div>
        <div class="tier">
          <div class="tier_div">
            <span class="tier_txt">
              mysql
            </span>
          </div>
        </div>
        </div>
      </div>
  </div>
</template>

<script>
import preview from "./preview"
export default {
    name:'chief',
    components:{
        preview
    },
    mounted(){
      this.show=JSON.parse(window.localStorage.status);
      var _this = this;
      if(!JSON.parse(window.localStorage.getItem("leavenote"))){
        this.$axios.get("/getnote")
      .then(function(response){
        window.localStorage.setItem("leavenote",JSON.stringify(response.data));
      })
      .catch((err) => {
        console.log(err);
      })
      }
    },
    data(){
      return {
        show:Boolean
      }
    }
}

</script>
<style scoped>
@media screen and (max-width:420px) {
  #pre{
    margin-top: 80px;
}

#left{
  width:80%;
  height:auto;
  display: inline-block;
}
#right{
  width:19.5%;
  height:auto;
  float: right;
  margin-top: 80px;
}
#right_tag{
  height: 60px;
  width:100%;
  position: relative;
  right:5px;
}
#tag{
  width:100%;
  height:90%;
  border-radius: 3px;

  text-align: center;
  font-size: 14px;
  background-color: white;
  margin:auto;
}
#tag_txt{
  position: relative;
  top:14px;
}
#right_cnt{
  font-size:12px;
  position: relative;
  right:5px;
  background-color: white;
  border-radius: 3px;
}
.tier{
  height: 60px;
  text-align: center;
}
.tier_div{
  height:80%;
  margin-top: 5px;
  display:inline-block;
  width:90%;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 2px 2px 2px rgb(160,158,163);
}
.tier_div:hover{
  width: 95%;
  height:85%;
  font-size:20px;
  box-shadow: 2px 3px 4px rgb(160,158,163);
  transition: 0.4;
}
.tier_txt{
  display: inline-block;
  margin-top: 15px;
}
}
@media screen and (min-width:421px) {
  #pre{
    margin-top: 80px;
}
#left{
  width:90%;
  height:auto;
  display: inline-block;
}
#right{
  width: 119px;
  /* width:9.5%; */
  height:auto;
  float: right;
  margin-top: 80px;
}
#right_tag{
  height: 60px;
  width:100%;
  position: relative;
  right:15px;
}
#tag{
  width:100%;
  height:90%;
  border-radius: 3px;

  text-align: center;
  font-size: 20px;
  background-color: white;
  margin:auto;
}
#tag_txt{
  position: relative;
  top:14px;
}
#right_cnt{
  position: relative;
  right:15px;
  background-color: white;
  border-radius: 3px;
}
.tier{
  height: 60px;
  text-align: center;
}
.tier_div{
  height:80%;
  margin-top: 5px;
  display:inline-block;
  width:90%;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 2px 2px 2px rgb(160,158,163);
}
.tier_div:hover{
  width: 95%;
  height:85%;
  font-size:20px;
  box-shadow: 2px 3px 4px rgb(160,158,163);
  color: rgb(51 51 51);
  transition: 0.4s;
}
.tier_txt{
  display: inline-block;
  margin-top: 15px;
}
}
</style>