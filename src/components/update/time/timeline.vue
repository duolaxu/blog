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

  </div>
</template>

<script>
export default {
    components:{

    },
    mounted() {
        this.name=window.localStorage.Name;
        var arr = new Array();
        if(window.sessionStorage.article.length!=0)
        {
            let lent = JSON.parse(window.sessionStorage.article).length;
        
        for(let i=0;i<lent;i++)
        {
            let com = {
                content:JSON.parse(window.sessionStorage.article)[i].title,
                timestamp:JSON.parse(window.sessionStorage.article)[i].time
            }
            this.activities.push(com);
        }
        }
    },
      data() {
      return {
        activities: [],
        name:''
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
.eltime{
    width: 200px;
    height:50px;
}
.block{
    margin:auto;
    width:38%;
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
}
</style>