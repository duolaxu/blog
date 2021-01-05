<template>
  <div id="app">
    <div id="total">
      <div id="form">
  <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
  <div id="ipt">
    <el-form-item label="用户名" prop="username">
    <el-input prefix-icon="el-icon-user-solid" @blur="remember" v-model="form.username"></el-input>
  </el-form-item>
  </div>
  <div id="pass">
    <el-form-item label="密码"  prop="password">
    <el-input prefix-icon="el-icon-lock" id="ipt_1" v-model="form.password" show-password @blur="Hide"></el-input>
  </el-form-item>
  </div>
    <div id="btn">
    <el-form-item>
    <el-button type="primary" @click="onSbmit" class="dl"><span>登录</span></el-button>
    <el-button @click="reset" class="dl" id="re"><span>重置</span></el-button>
    <div id="judge"></div>
  </el-form-item>
  <router-link to="./regist" id="regist">立即注册</router-link>
  </div>
</el-form>
 <el-checkbox id="box" v-model="checked">记住密码</el-checkbox>
</div>
    </div>
  </div>
</template>

<script>
  export default {
    name:'login',
    components:{
      
    },
    beforeDestroy(){
      var app=document.getElementById("app");
    },
    mounted(){
      if(JSON.parse(window.localStorage.getItem("status")))
      {
        this.$router.replace("/chief");
      }
      this.$axios.get("/login")
      .then(function(response){
        console.log(response.data);
        window.localStorage.setItem("person",JSON.stringify(response.data));
      })
      .catch((err) => {
        console.log(err);
      })
    },
     data() {
      return {
        Judge:JSON.parse(window.localStorage.getItem("status")),
        color:'red',
        rout:'/blogs',
        form: {
          username: '',
          password: ''
        },
        checked:false,
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 0, max: 100, message: '', trigger: 'blur' }
          ],
          password:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 0, max: 100, message: '', trigger: 'blur' }
          ]
        }
      };
    },
    inject:["reload"],
    methods: {
      Hide(){
          var ipt_1=document.getElementById("ipt_1");
          var judge=document.getElementById("judge");
          if(ipt_1.value=="")
          judge.innerText="";
      },
      reset(){
        this.form.username="";
        this.form.password="";
      },
      remember(){
        var storage=window.localStorage;
        if(!storage.lent)
        {

        }
        else{
          
           for(let i=1;i<=storage.lent;i++)
        {
          var Form=JSON.parse(storage.getItem("form_"+`${i}`));
          if(this.form.username==Form.username)
          {
            this.form.password=Form.password;
            break;
          }
        }
        }
      },
      onSbmit() {
        var storage = window.localStorage;
        var _this=this;
        var name_1=this.form.username;
        var password=this.form.password;
        var username = this.form.username;
        var password = this.form.password;
        this.$axios.post('/cookie',{
          username,
          password
        })
        .then(function(response) {
        var tsc=false;
        if(response.data==tsc)
        {
          var judge=document.getElementById("judge");
          judge.innerText="用户名或密码错误";
        }
        else{
          _this.Judge=true;
          window.localStorage.setItem("status",true);
          _this.$store.commit("setLog",JSON.parse(window.localStorage.getItem("status")));
          window.localStorage.setItem("ID",response.data[0].id);
          window.localStorage.setItem("Name",_this.form.username);
          window.localStorage.setItem("url_head",response.data[0].url);
          _this.$router.push("/main");
        window.sessionStorage.setItem("name",_this.form.username);
        if(_this.checked)
        {
          var storage=window.localStorage;
          if(!storage.lent)
          {
            alert("freg");
            storage.setItem("lent",1);
            storage.setItem("form_"+storage.lent,JSON.stringify(_this.form));
          }
          else{
          var flag=0;
          for(let i=1;i<=storage.lent;i++)
          {
            if(JSON.parse(storage.getItem("form_"+`${i}`)).username==_this.form.username)
            {
              flag=1;
              break;
            }
          }
          if(flag==0)
            {
            var id=storage.lent;
            id++;
            storage.setItem("lent",id);
            storage.setItem("form_"+storage.lent,JSON.stringify(_this.form));
            }
          }
          
        }
        }
    })
    .catch(function(error) {
        console.log(error);
    });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style>
#app{
  z-index:10;
}
*{
  padding:0px;
  margin:0px;
}
</style>
<style scoped>
@media screen and (max-width:420px) {
#on{
  position: absolute;
  top:0px;
  left:0px;
  width: 100%;
}
#judge{
  font-size: 14px;
  color: rgb(248 108 108);
  position: absolute;
  left: -112px;
  top: -30px;
}
#regist{
  text-decoration: none;
  color:rgb(152 177 253);
  font-size:14px;
  position: relative;
  left:70%;
  top:-15px;
}
#regist:hover{
  color:red;
}
#box{
  position: relative;
  top: -33px;
  left: 29%;
  color:rgb(152 177 253);
}
#router{
  text-decoration: none;
  color:white;
}
#btn{
  margin-left:14%;
}
#re{
  position: relative;
  left:22px;
}
.dl{
  width: 10px;
  height:30px;
}
.dl span{
  display: inline-block;
  position:relative;
  left: -13px;
  top:-5px;
}
#form{
  position: absolute;
  margin:auto;
  width:100%;
  top:35%;
}
#ipt,#pass{
   width:90%;
   height:60px;
}
 .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    text-align:center;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
}
@media screen and (min-width:421px) {
  #box{
  position: relative;
  top: -65px;
  left: 100px;
  color:rgb(152 177 253);
}
  #on{
  position: absolute;
  top:0px;
  left:0px;
  width: 100%;
}
#judge{
  font-size: 14px;
  color: rgb(248 108 108);
  position: absolute;
  left: -112px;
  top: -30px;
}
#regist{
  text-decoration: none;
  color:rgb(152 177 253);
  font-size:14px;
  position: relative;
  left:333px;
  top: -43px;
}
#regist:hover{
  color:red;
}

#router{
  text-decoration: none;
  color:white;
}
#btn{
  margin-left:113px;
}
#form{
  position: absolute;
  width:590px;
  left: 30%;
  margin-left: -15px;
  top:35%;
}
#ipt,#pass{
  width:85%;
  height:60px;
}
 .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    text-align:center;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
}
</style>