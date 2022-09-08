import { defineStore } from 'pinia'
import { randomString } from '@/utils'
import { login } from '@/api/user'
import { setToken, getToken, removeToken } from '@/utils/auth'
export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    token: getToken(),
    avatar: '',
    roles: []
  }),
  getters: {
  },
  actions: {
    async getUserInfo() {
      return true
    },
    async login(userInfo: {username: string, password: string}) {
      const { username, password } = userInfo
      if (username && password) {
        const res = await login(userInfo)
        if (res.token) {
          this.token = res.token
          setToken(res.token)
          return true
        }
      }
      return false
    },
    async logout() {
      if (this.token === '') {
        throw Error('Logout: token is undefined!')
      }
      this.token = ''
      removeToken()
      return true
    },
    resetToken() {
      // this.avatar = avatar
    }
  }
})
