<template>
  <div>
      <preview id="pre"></preview>
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
      // if()
      // this.show=JSON.parse(window.localStorage.status);
      // var _this = this;
      if(!JSON.parse(window.localStorage.getItem("leavenote"))){
        // console.log("timer_1");
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
}
@media screen and (min-width:421px) {
  #pre{
    margin-top: 80px;
}
}
</style>