<template>
  <div id="app">
     <div id="form_1">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="请输入昵称" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="请输入密码" prop="password">
    <el-input v-model="ruleForm.password" show-password></el-input>
  </el-form-item>
   <el-form-item label="请确认密码" prop="password_1">
    <el-input v-model="ruleForm.password_1" show-password id="ipt" @blur="blur"></el-input>
  </el-form-item>
  <div id="hide"></div>
</el-form>
     </div>
     <div id="btn">
         <input type="button" @click="onSubmit" value="注册">
     </div>
  </div>
</template>

<script>
export default {
  components:{

  },
data() {
      return {
        ruleForm: {
          name: '',
          password:"",
          password_1:""
        },
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 4, max: 8, message: '长度在 4 到 8 个字符', trigger: 'blur' }
          ],
         password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' }
          ],
          password_1: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 0, max: 100, message: '', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
        blur(){
            var ipt=document.getElementById("ipt");
            if(this.ruleForm.password==this.ruleForm.password_1)
            {

            }
            else{
                var hide=document.getElementById("hide");
                hide.innerText="两次输入密码不一致";
            }
        },
      onSubmit(){
          var _this=this;
    if(this.ruleForm.password==this.ruleForm.password_1&&this.ruleForm.password.length>=8)
    {
        this.$axios.post('/insert',this.ruleForm)
    .then(function(response) {
     setTimeout(function(){
         _this.$router.push('/login');
     },500);
    })
    .catch(function(error) {
        console.log(error);
    });
    }
      }
    }
}

</script>
<style scoped>
@media screen and (max-width:420px) {
  #app{
  z-index:10;
}
#form_1{
    width: 90%;
    height: 90px;
    margin: auto;
    margin-top: 45%;
}
#btn{
  width:50px;
  margin:auto;
  margin-top: 25%;
  position: relative;
  left: 25px;
}
#btn input{
  background-color: transparent;
  outline: none;
  border: 1px outset white;
  color:white;
  width: 70px;
  height: 30px;
  border-radius: 5px;
}
#hide{
  position: relative;
  left: 100px;
  top: -20px;
  font-size: 14px;
  color: rgb(245,108,108);
}
}
@media screen and (min-width:421px) {
  #app{
  z-index:10;
}
#form_1{
    width: 600px;
    height: 130px;
    margin: auto;
    margin-top: 11%;
}
#btn{
  width:50px;
  margin:auto;
  margin-top: 60px;
  position: relative;
  left: 25px;
}
#btn input{
  background-color: transparent;
  outline: none;
  border: 1px outset white;
  color:white;
  width: 70px;
  height: 30px;
  border-radius: 5px;
}
#hide{
  position: relative;
  left: 100px;
  top: -20px;
  font-size: 14px;
  color: rgb(245,108,108);
}
}
</style>