<template>
	<div class="login-container">
    <div class="login-main">
      <h3 class="title">用户登录</h3>
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            type="primary"
            style="width:100%;"
            @click="handleLogin(loginFormRef)"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
      <p class="footer">
        <span>用户名：admin</span>
        <span>密码：123456</span>
      </p>
    </div>
	</div>
</template>
<script setup lang="ts">
	import { ref, reactive } from 'vue'
	import { validUsername } from '@/utils/validate'
	import { useUserStore } from '@/stores/user'
  import type { FormInstance, FormRules } from 'element-plus'
	import { useRouter, useRoute } from 'vue-router'
  const route = useRoute()
  const router = useRouter()
  const loginFormRef = ref<FormInstance>()
  const loginForm = reactive({
			username: "admin",
			password: "123456"
		})
  const loading = ref(false)
  const userStore = useUserStore()
  const getOtherQuery = (query: Record<string, string | string[]>) => {
    return Object.keys(query).reduce((acc, cur) => {
    if (cur !== 'redirect') {
      acc[cur] = query[cur]
    }
    return acc
    }, {} as Record<string, string | string[]>)
  }
  const validateUsername = (rule: any, value: string, callback: Function) => {
    if (!validUsername(value)) {
    callback(new Error('请输入正确的用户名'))
    } else {
    callback()
    }
  }

  const validatePassword = (rule: any, value: string, callback: Function) => {
    if (value.length < 6) {
    callback(new Error('密码不小于6位'))
    } else {
    callback()
    }
  }
  const loginRules = reactive<FormRules>({
    username: [{ validator: validateUsername, trigger: 'blur' }],
    password: [{ validator: validatePassword, trigger: 'blur' }]
  })
  let otherQuery = {}
  const	handleLogin = (loginFormRef: FormInstance | undefined) => {
    if (!loginFormRef) return
    let redirect = route.query.redirect as string
    loginFormRef.validate(async(valid: boolean) => {
      if (valid) {
        loading.value = true
        await userStore.login(loginForm)
        router.push({
          path: redirect || '/',
              query: otherQuery
        })
        // Just to simulate the time of the request
        setTimeout(() => {
          loading.value = false
        }, 0.5 * 1000)
      } else {
        return false
      }
    })
  }
</script>
<style lang="scss" scoped>
  .login-container {
    display: flex;
    height: 100%;
    align-items: center;
    background-image: url('@/assets/bg.jpg');
    background-color: #2d3a4b;
    .login-main {
      width: 320px;
      margin: 0 auto;
      padding: 30px;
      background: #fff;
      .title {
        text-align: center;
        margin-bottom: 20px;
      }
      .footer {
        display: flex;
        font-size: 13px;
        justify-content: space-between;
      }
    }
  }
</style>