<template>
  <div class="ii">
    <div  class="erode">
      中关村中学
    </div>
    <div class="erode1">教学质量评估问卷</div>
    <!--<div>-->
      <!--<img src="../../assets/ee.jpg" style="width: 100px">-->
    <!--</div>-->
    <div class="body">
      <div class="form">
        <group>
          <x-input type="text" v-model="input1" class="input" placeholder="请输入学号"  @on-change="keyDown" :show-clear="false"></x-input>
        </group>
        <group>
          <x-input type="text" v-model="input2" class="input" placeholder="请再一次输入学号"  @on-change="keyDown" :show-clear="false"></x-input>
        </group>
        <!--<div class="exp">-->
        <!--<input type="text" class="exp__input" v-model="input1"  placeholder="学号" required @change="keyDown">-->
        <!--<label class="exp__label"  data-icon="" data-icon-ok="">学号</label>-->
        <!--</div>-->
        <!--<div class="exp">-->
        <!--<input type="text" class="exp__input"   v-model="input2" placeholder="请输入学号" required @change="keyDown">-->
        <!--<label class="exp__label"  data-icon=""  data-icon-ok="">学号</label>-->
        <!--</div>-->
        <div style="margin-top: 20px">
          <x-button class="login-btn" @click.native="Login" :disabled="disabled">登录</x-button>
        </div>
        <alert v-model="visible2" :title="'登录失败'">{{this.message}}</alert>

        <!--<v-loading v-if="show"></v-loading>-->
      </div>
    </div>

  </div>
</template>

<script>
  import { XInput,XButton, Alert} from 'vux'
  import VLoading from '../common/loading'

    export default {
        name: "login",

        components: {
          XInput,
          XButton,
          VLoading,
          Alert

       },
      data() {
          return {
            disabled: true,
            input1: '',
            input2: '',
            // show: false,
            ss: false,
            message: '',
            visible2: false

          }
      },
      methods: {
        Login() {
          var url = 'https://zhongkeruitong.top/taq/login';
          this.$axios.post(url, this.$qs.stringify({
            stu_code: this.input1
          })).then((res) => {
            if (res.data.errno===0) {
              // this.show=true
              this.$router.push('/index')
              console.log(res.data.stuInfo.stuName);
              localStorage.setItem('stuCode', res.data.stuInfo.stuCode);
              localStorage.setItem('stuName',res.data.stuInfo.stuName);
              localStorage.setItem('stuLevel',res.data.stuInfo.stuLevel);
              localStorage.setItem('stuGrade',res.data.stuInfo.stuGrade);
              localStorage.setItem('stuClass',res.data.stuInfo.stuClass)
              // setTimeout(() => {
              //
              //   this.$router.push('/index')
              // }, 1500);
            }else {
              this.message=res.data.errmsg;
              // this.$message.error(res.data.errmsg)
              this.visible2=true;
              // this.$vux.alert.show({
              //   value: true,
              //   title: '温馨提示',
              //   content: 'fef',
              //   hideOnBlur: true,
              //   onShow () {
              //     console.log(res.data.errmsg)
              //   },
              //   // onHide () {
              //   //   console.log('Plugin: I\'m hiding')
              //   // }
              // })
            }
          }).catch((err) => {
            console.log(this.input1)
          })
          // this.show=true
          // localStorage.setItem('stu_code',this.input1);
          // setTimeout(() => {
          //
          //   this.$router.push('/index')
          // }, 1500);


          // if (this.input1===this.input2){
          //   this.$router.push('/index')
          // } else {
          //   alert("两次输入的学号不一样")
          // }
        },
        keyDown() {
          if (this.input1===this.input2 && this.input1 !== '') {
            this.disabled = false;
          } else {
            this.disabled = true;
          }
        },

      }

    }
</script>

<style scoped>
  /** {*/
    /*margin: 0;*/
    /*padding: 0;*/
  /*}*/
  .ii{
    position: absolute;
    width:100%;
    height:100%;
    overflow: auto;
    background-image: url(../../assets/44.jpg);
    background-size: cover;
    background-position: center center;
    box-shadow: 0 0px 3px rgba(0,0,0,.5);

  }

  .title{
    width: 80%;
    /*background-color: pink;*/
    margin: 100px auto;
    font-size: 28px;
    font-weight: bolder;
    text-align: center;
  }
  .body{
    width: 70%;
    height: 200px;
    background-color: rgba(255,255,255,0.3);
    margin: 60px auto;
    padding-top: 10px;
    border-radius: 4px;
  }
  .form{
    width: 80%;
    height: 300px;
    margin: 0 auto;

    /*background-color: rgba(255,255,255,0.5);*/

  }
  .input{
    /*width: 200px;*/
    border: 1px black inset;
    background-color: antiquewhite;
    margin-top: 20px;
    border-radius: 4px;
  }
  .login-btn{
    width: 100%;
    background-color: skyblue;
  }
  .exp {
    display: flex;
    flex-direction: column-reverse;
    width: 100%;
    margin-bottom: 30px;
    position: relative;
    flex-wrap: wrap;
  }

  .exp__label {
    transition: 0.3s;
    margin-bottom: 5px;
  }

  .exp__label:before {
    content: attr(data-icon);
    font-weight: normal;
    font-family: "Ionicons";
    font-size: 24px;
    position: absolute;
    left: 0;
    transform: rotateY(90deg);
    bottom: 0;
    height: 52px;
    background: transparent;
    color: #000;
    transform-origin: left;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color .3s 0s ease, transform .3s 0s ease;
    width: 42px;
  }

  .exp__input {
    border: 1px solid #ddd;
    /*padding: 30px 10px;*/
    width: 100%;
    /*height: 52px;*/
    transition: 0.3s;
    font-weight: normal;
    box-sizing: border-box;
    font-family: "Work Sans", sans-serif;
    outline: none;
    background-color: white;

    /*margin-top: 20px;*/
  }

  .exp__input:focus {
    padding-left: 42px;
    border-color: #bbb;
  }

  .exp__input:focus + label:before {
    transform: rotateY(0deg);
  }

  .exp__input:valid {
    padding-left: 42px;
    border-color: green;
  }

  .exp__input:valid + label {
    color: green;
  }

  .exp__input:valid + label:before {
    transform: rotateY(0deg);
    color: green;
    font-size: 34px;
    content: attr(data-icon-ok);
  }

  .exp-title {
    text-align: center;
    font-size: 22px;
    margin-bottom: 30px;
    font-weight: normal;
  }

  .exp-title span {
    display: inline-block;
    padding: 5px;
    font-size: 22px;
    background: #feffd4;
  }
  .bevel{font-family:cursive;color:rgba(40,80,120,.9);
    width: 80%;
    /*background-color: pink;*/
    margin: 100px auto;
    font-size: 28px;
    font-weight: bolder;
    text-align: center;
    text-shadow:-1px -1px 1px #000,0 -1px 1px #000,
    1px -1px 1px #000,1px 0 1px #000,1px 1px 1px #000,
    0 1px 1px #000,-1px 1px 1px #000,-1px 0 1px #000,0 0 4px #000}
  .bevel,.bevel:after{-webkit-filter:url(#light2);filter:url(#light2)}
  .bevel:after{content:"";text-shadow:none;opacity:1}
  .erode{
    width: 80%;
    /*background-color: pink;*/
    margin: 0 auto;
    padding-top: 100px;
    /*margin-top: 100px;*/
    /*margin-left: 40px;*/

    font-size: 28px;
    text-align: center;
    color:whitesmoke; }
  .erode:after{content:'';color:#fff;text-shadow:0 0 1px #fff;-webkit-filter:url(#erode2);filter:url(#erode2)}
  .erode1{
    width: 80%;
    /*background-color: pink;*/
    margin: 20px auto;
    font-size: 28px;
    text-align: center;
    color:whitesmoke; }
  .erode1:after{content:'';color:#fff;text-shadow:0 0 1px #fff;-webkit-filter:url(#erode2);filter:url(#erode2)}
</style>
