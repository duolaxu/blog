<template>
  <div>
      <div id="context">
          <h1>CONTENT</h1>
      </div>
  </div>
</template>

<script>
export default {

}

</script>
<style lang="scss" scoped>
$high:100px;
$color:red;
#context{
    width:$high;
    height:$high;
    background-color: $color;
    position: relative;
    top:10*$high;
    h1{
    color:$color;
}
}
</style>