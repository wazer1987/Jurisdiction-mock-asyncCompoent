<template>
  <div class="login-container">
      <el-card>
        <div slot="header" class="clearfix" style="text-align:center;">
            <h1 >权限测试登录</h1>
        </div>
        <el-form ref="form" :rules="rules" :model="form" label-width="100px" label-position="left" >
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" type="password"></el-input>
            </el-form-item>
        </el-form>
        <el-button type="primary" style="width:100%;" @click='login'>登录</el-button>
      </el-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import md5 from 'md5'
// import { login } from '@/api/user'
// import { setToken } from '@/utils/localstore'
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

    return {
      rules: {
        email: [{ required: true, validator: email, trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      form: {
        email: '1052101962@qq.com',
        password: '12345678'
      }

    }
  },

  methods: {
    ...mapActions(['loginActions']),
    login () {
      this.$refs.form.validate(async (valid) => {
        if (!valid) { return }
        const obj = {
          email: this.form.email,
          password: md5(this.form.password)
        }
        const code = await this.loginActions(obj)
        if (code === 0) {
          this.$router.push({ path: '/' })
        } else {
          this.$message({
            showClose: true,
            message: '账户密码或错误',
            type: 'error'
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
