<template>
  <div>
      <top v-if="show"></top>
      <detail></detail>
  </div>
</template>

<script>
import top from "./top"
import detail from "../../Blog/BlogDetail"
export default {
    components:{
        top,
        detail
    },
    mounted() {
        this.show=JSON.parse(window.localStorage.status);
    },
    data(){
        return {
            show:Boolean
        }
    }
}

</script>
<style lang="scss" scoped>
$top:0px;
@media screen and (max-width:420px) {
    #detail{
    margin-top: $top;
}

}
@media screen and (min-width:421px) {
    #detail{
    margin-top: $top;
}

}
</style>