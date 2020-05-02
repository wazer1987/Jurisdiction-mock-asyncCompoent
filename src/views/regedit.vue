<template>
  <div class="login-container">
      <el-card>
        <div slot="header" class="clearfix" style="text-align:center;">
            <h1 >权限测试</h1>
        </div>
        <el-form ref="form" :rules="rules" :model="form" label-width="100px" label-position="left" >
          <el-form-item label="昵称" prop="nickname">
                <el-input v-model="form.nickname"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="重复密码" prop="repasswprd">
                <el-input v-model="form.repasswprd" type="password"></el-input>
            </el-form-item>
            <el-form-item label="邮箱验证码" prop="emailcode">
                <el-input v-model="form.emailcode" style="width:180px;"></el-input><el-button :disabled="flag" @click="sendEmail"  style="margin-left:23px;width:135px;" type="primary">{{!flag?"发送验邮箱证码":'重新发送' + time +'s'}}</el-button>
            </el-form-item>
            <el-form-item label="图片验证码" prop="imgcode">
                <el-input v-model="form.imgcode" style="width:228px"></el-input>
                <img :src="captcha" alt="" @click="getCaptCha" style="margin-left:10px;">
            </el-form-item>
        </el-form>
        <el-button type="primary" style="width:100%;" @click='regedit'>注册</el-button>
      </el-card>
  </div>
</template>

<script>
import md5 from 'md5'
import { regedit, sendemail } from '@/api/user'
export default {
  data () {
    const email = (rule, value, callback) => {
      var reg = /^([a-zA-Z]|[0-9])(\w|\\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
      if (!reg.test(value)) {
        return callback(new Error('请输入正确的邮箱'))
      } else if (value === '') {
        return callback(new Error('请输入邮箱'))
      }
      callback()
    }
    const repasswprd = (rule, value, callback) => {
      if (value !== this.form.password) {
        return callback(new Error('两次密码输入不一致'))
      } else if (value === '') {
        return callback(new Error('请重复密码'))
      }
      callback()
    }
    return {
      rules: {
        nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        email: [{ required: true, validator: email, trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        repasswprd: [{ required: true, validator: repasswprd, trigger: 'blur' }],
        emailcode: [{ required: true, message: '请输入邮箱验证码', trigger: 'blur' }],
        imgcode: [{ required: true, message: '请输入图片验证码', trigger: 'blur' }]
      },
      form: {
        nickname: '',
        email: '',
        password: '',
        repasswprd: '',
        emailcode: '',
        imgcode: ''
      },
      flag: false,
      timerInterval: null,
      time: 30,
      captcha: '/api/captcha'
    }
  },
  watch: {
    time: function (newval) {
      if (newval <= 0) {
        clearInterval(this.timerInterval)
        this.time = 30
        this.flag = false
      }
    }
  },
  methods: {
    async sendEmail () {
      if (this.form.email === '') {
        this.$message({
          showClose: true,
          message: '邮箱不能为空',
          type: 'error'
        })
        return
      }
      this.flag = true
      this.timerInterval = setInterval(() => {
        --this.time
      }, 1000)
      const data = await sendemail(this.form.email)
      if (data.data.code === 0) {
        this.$message({
          showClose: true,
          message: '发送成功,请查验邮箱',
          type: 'success'
        })
      }
    },
    async getCaptCha () {
      this.captcha = '/api/captcha?_t=' + new Date().getTime()
    },
    regedit () {
      this.$refs.form.validate(async (valid) => {
        if (!valid) { return }
        const obj = {
          nickname: this.form.nickname,
          email: this.form.email,
          password: md5(this.form.password),
          emailcode: this.form.emailcode,
          imgcode: this.form.imgcode
        }
        const { status } = await regedit(obj)
        if (status === 200) {
          this.$notify({
            title: '注册成功',
            message: '去登录',
            type: 'success'
          })
        }
      })
    }
  }
}
</script>

<style>
.login-container{
    width: 480px;
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
</style>
