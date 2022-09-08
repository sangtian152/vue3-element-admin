import { setLocStr, getLocStr, removeLocStr } from './locStr'
import settings from "@/config/settings";
const { tokenName } = settings;
/**
  * @description 存储token
  * @param token
  * @returns {void|*}
  */
 export const setToken = (token: string):void => {
  setLocStr(tokenName, token)
}
/**
* @description 获取token
* @returns {string}
*/
export const getToken = ():string => {
 return getLocStr(tokenName)
}
/**
* @description 清除token
* @returns {void}
*/
export const removeToken = (): void => {
  removeLocStr(tokenName)
}
/**
* @description 获取侧边栏状态
* @returns {string}
*/
const sidebarStatusKey = 'sidebar_status'
export const getSidebarStatus = () => {
 return getLocStr(sidebarStatusKey);
}
/**
* @description 缓存侧边栏状态
* @returns {void}
*/
export const setSidebarStatus = (sidebarStatus: string) => {
  setLocStr(sidebarStatusKey, sidebarStatus)
}
/**
* @description 获取size
* @returns {string}
*/
const sizeKey = 'size'
export const getSize = ():string => {
 return getLocStr(sizeKey);
}
/**
* @description 保存size
* @returns {void}
*/
export const setSize = (size: string): void => {
  setLocStr(sizeKey, size)
}

