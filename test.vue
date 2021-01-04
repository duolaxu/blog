<template>
  <div>
      <div id="mavon">
          <mavon-editor
          id="editor"
          ref=md
         @imgAdd="$imgAdd"
         @imgDel="$imgDel">

          </mavon-editor>
      </div>
  </div>
</template>

<script>
export default {
    methods:{
        // 绑定@imgAdd event
        $imgAdd(pos, file){
            let _this=this;
            // 第一步.将图片上传到服务器.
            console.log(file);
           var formdata = new FormData();
           formdata.append('imgFile', file);
           console.log(formdata);
           this.$axios.post("/upload",formdata)
           .then((response) => {
            console.log(_this.$refs.md.$img2Url(pos,response.data.url));
           })
        },
        $imgDel(pos,$file){

        }

    }
}

</script>
<style scoped>
#mavon{
    width:800px;
    height:500px;
    margin:auto;
    margin-top:50px;
}
#editor{
    width:100%;
    height:100%;
}
</style>