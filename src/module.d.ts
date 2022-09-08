import type { _RouteRecordBase } from 'vue-router'
import * as axios from 'axios'
declare module 'vue-router' {
  interface _RouteRecordBase {
    hidden?: boolean,
    noShowingChildren?: boolean
  }
  interface _RouteTagsView extends Partial<RouteLocationNormalized> {
    fullPath: string;
  }
  type _RouteRecordPartial = Partial<_RouteRecordBase>
}

declare module 'axios' {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>
  }
}
