import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    sidebar: {
      collapse: false
    }
  }),
  getters: {
  },
  actions: {
    toggleSideBar(collapse:boolean) {
      this.sidebar.collapse = collapse
    }
  }
})
