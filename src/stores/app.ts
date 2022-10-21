import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    device: 'desktop',
    sidebar: {
      collapse: false
    }
  }),
  getters: {
  },
  actions: {
    toggleSideBar(collapse:boolean) {
      this.sidebar.collapse = collapse
    },
    toggleDevice(device:string) {
      this.device = device
    },
  }
})
