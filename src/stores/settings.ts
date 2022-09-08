import { defineStore } from 'pinia'
// import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/config/settings'
import type { ISettings } from '@/config/settings'

type PickSettings = Pick<ISettings, "showSettings" | "tagsView" | "fixedHeader" | "sidebarLogo">
type PartialSettings = Partial<PickSettings>

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings
export const useSettingsStore = defineStore({
  id: 'settings',
  state: () => ({
    // theme: variables.theme,
    settings: {
      showSettings: showSettings,
      tagsView: tagsView,
      fixedHeader: fixedHeader,
      sidebarLogo: sidebarLogo
    }
  }),
  getters: {
  },
  actions: {
    changeSetting(data:PartialSettings) {
      this.settings = Object.assign({}, this.settings, data)
    }
  }
})
