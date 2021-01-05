<template>
  <div>
      <div id="total">
          <div class="block">
          <div id="name">
              <h2>
                  {{name}}
              </h2>
          </div>
  <el-timeline>
    <el-timeline-item
    class="eltime"
      v-for="(activity, index) in activities"
      :key="index"
      :timestamp="activity.timestamp"
      >
      <span @click="turnEssay(index)" class="sp">
          {{activity.content}}
      </span>
    </el-timeline-item>
  </el-timeline>
</div>
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
          <div class="tier" :key="index" v-for="(item,index) in article_tag">
          <div class="tier_div">
            <span class="tier_txt">
              {{item}}
            </span>
          </div>
        </div>
        <!-- <div class="tier">
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
        </div> -->
        </div>
      </div>
  </div>
</template>

<script>
export default {
    components:{

    },
    mounted() {
        this.article_tag=JSON.parse(window.sessionStorage.getItem("article_tags"));
        console.log(typeof(this.article_tag));
        this.name=window.localStorage.Name;
        var arr = new Array();
        let lent = JSON.parse(window.localStorage.article).length;
        
        for(let i=0;i<lent;i++)
        {
            let com = {
                content:JSON.parse(window.localStorage.article)[i].title,
                timestamp:JSON.parse(window.localStorage.article)[i].time
            }
            this.activities.push(com);
        }
    },
      data() {
      return {
        activities: [],
        name:'',
        article_tag:''
      };
    },
    methods:{
        turnEssay(index){
            window.localStorage.setItem("article_id",index);
        this.$router.push({
          name:'content',
          params:{
            id_1:window.localStorage.getItem("ID"),
            id_2:window.localStorage.getItem("article_id")
          }
        });
        }
    }
}

</script>
<style scoped>
@media screen and (max-width:420px) {
    #name{
    position: relative;
    top: -50px;
    color:white;
}
.eltime{
    width: 200px;
    height:50px;
}
#total{
    margin:auto;
    width:90%;
    margin-top: 113px;
    position: absolute;
    left:0px;
}
.block{
    position: absolute;
    left:123px;
}
.sp{
    color: rgb(112 182 255);
    cursor: pointer;
    font-size:15px;
}
.sp:hover{
    color:red;
}
}
@media screen and (min-width:421px) {
    #name{
    position: relative;
    top: -50px;
    color:white;
}
#total{
    display: inline-block;
    width:80%;
    margin:auto;
    height: auto;
    /* background-color: red; */
}
.eltime{
    width: 200px;
    height:50px;
}
.block{
    margin:auto;
    width:30%;
    margin-top: 100px;
}
.sp{
    color: rgb(112 182 255);
    cursor: pointer;
    font-size:15px;
}
.sp:hover{
    color:red;
}

#right{
  width: 119px;
  height:auto;
  float: right;
  position: relative;
  right: 25%;
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
  font-size: 18px;
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
  font-size:13px;
}
.tier_div:hover{
  width: 95%;
  height:85%;
  font-size:16px;
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