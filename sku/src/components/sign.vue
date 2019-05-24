<template>
  <div class='s-box'>
    <div class='s-main'>
      <h2>百度AIR智慧零售店后台商品管理系统</h2>
      <j-form :model="form" class='s-form' :rules="rules" ref="form" style="width: 540px; margin-top: 30px;">
        <j-form-item prop="signName">
          <j-input v-model="form.signName" placeholder="请输入用户名"/>
        </j-form-item>
        <j-form-item prop="signPwd">
          <j-input v-model="form.signPwd" placeholder="请输入密码"/>
        </j-form-item>
        <j-form-item>
            <j-button @click="sign" to='' type="primary">登录</j-button>
        </j-form-item>
      </j-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    let validator1 = (val, rule, callback) => {
      return val === 'ceshi';
    };
    let validator2 = (val, rule, callback) => {
      return val === '123456';
    };
    return {
      form: {
        signName: '',
        signPwd: ''
      },
      rules: {
        signName: [
            {required: true, message: '请输入用户名', trigger: 'change'},
            {validator: validator1, message: '用户名错误', trigger: 'change'}
        ],
        signPwd: [
            {required: true, message: '请输入密码', trigger: 'change'},
            {validator: validator2, message: '密码错误', trigger: 'change'}
        ]
      }
    }
  },
  created() {
    if (localStorage.getItem('isSign') == 'true') {
      this.$router.push('/warehousing');
    }
  },
  methods: {
    async sign() {
        let res = await this.$refs.form.validate();
        if (res) {
          localStorage.setItem('username', this.form.signName);
          localStorage.setItem('isSign', true);
          location.reload();
          setTimeOut(() => {
            this.$router.replace('/warehousing');
          }, 1000)
        }
    }
  }
}
</script>
<style scope>
  .s-box{
    width: 100%;
    height: 100%;
  }
  .s-main {
    width: 420px!important;
    margin: 0 auto;
    padding-top: 100px;
  }
  .s-form {
    width: 420px!important;
    margin-top: 80px!important;
  }
  .jimu-form-item-content {
    padding-right: 20px;
    text-align: left;
  }
</style>
