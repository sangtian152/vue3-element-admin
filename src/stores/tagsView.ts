import { defineStore } from 'pinia'
import type { RouteLocationNormalized, _RouteTagsView, RouteRecordName } from 'vue-router'
export const useTagsStore = defineStore({
  id: 'tagsView',
  state: () => ({
    visitedViews: <_RouteTagsView[]>[],
    cachedViews: <RouteRecordName[]>[]
  }),
  actions: {
    addView(view:_RouteTagsView) {
      this.addVisitedView(view)
      this.addCachedView(view)
    },
    addVisitedView(view:_RouteTagsView) {
      if (this.visitedViews.some(v => v.path === view.path)) return
      this.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta?.title || 'no-name'
        })
      )
    },
    addCachedView(view:_RouteTagsView) {
      if (!view.name || this.cachedViews.includes(view.name)) return
      if (!view.meta?.noCache) {
        this.cachedViews.push(view.name)
      }
    },
    delView(view:_RouteTagsView) {
      return new Promise(resolve => {
        this.delVisitedView(view)
        this.delCachedView(view)
        resolve([...this.visitedViews])
      })
    },
    delVisitedView(view:_RouteTagsView) {
      return new Promise(resolve => {
        for (const [i, v] of this.visitedViews.entries()) {
          if (v.path === view.path) {
            this.visitedViews.splice(i, 1)
            break
          }
        }
        resolve([...this.visitedViews])
      })
    },
    delCachedView(view:_RouteTagsView) {
      return new Promise(resolve => {
        const index = view.name ? this.cachedViews.indexOf(view.name) : -1
        index > -1 && this.cachedViews.splice(index, 1)
        resolve([...this.cachedViews])
      })
    },
  
    delOthersViews(view:_RouteTagsView) {
      return new Promise(resolve => {
        this.delOthersVisitedViews(view)
        this.delOthersVisitedViews(view)
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews]
        })
      })
    },
    delOthersVisitedViews(view:_RouteTagsView) {
      return new Promise(resolve => {
        this.visitedViews = this.visitedViews.filter(v => {
          return v.meta?.affix || v.path === view.path
        })
        resolve([...this.visitedViews])
      })
    },
    delOthersCachedViews(view:_RouteTagsView) {
      return new Promise(resolve => {
        const index = view.name ? this.cachedViews.indexOf(view.name) : -1
        if (index > -1) {
          this.cachedViews = this.cachedViews.slice(index, index + 1)
        } else {
          // if index = -1, there is no cached tags
          this.cachedViews = []
        }
        resolve([...this.cachedViews])
      })
    },
  
    delAllViews() {
      return new Promise(resolve => {
        this.delAllVisitedViews()
        this.delAllCachedViews()
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews]
        })
      })
    },
    delAllVisitedViews() {
      return new Promise(resolve => {
        // keep affix tags
        const affixTags = this.visitedViews.filter(tag => tag.meta?.affix)
        this.visitedViews = affixTags
        resolve([...this.visitedViews])
      })
    },
    delAllCachedViews() {
      return new Promise(resolve => {
        this.cachedViews = []
        resolve([...this.cachedViews])
      })
    },
  
    updateVisitedView(view:_RouteTagsView) {
      for (let v of this.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view)
          break
        }
      }
    }
  }
})
