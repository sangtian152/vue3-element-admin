export interface ISettings {
  //标题 （包括初次加载雪花屏的标题 页面的标题 浏览器的标题）
	title:string,
	//token名称
  tokenName: string,
  //token存储位置localStorage sessionStorage cookie
  storage: string,
  // 是否展示设置面板
  showSettings: boolean,
  // 是否展示页签
  tagsView: boolean,
  // 是否固定页面头部
  fixedHeader: boolean,
  //是否显示logo，不显示时设置false，显示时请填写svgIcon图标名称
  sidebarLogo: boolean,
}

// You can customize below settings :)
const settings: ISettings = {
  //标题 （包括初次加载雪花屏的标题 页面的标题 浏览器的标题）
	title: "vue-ts-admin",
  //token名称
  tokenName: "token",
  //token存储位置localStorage sessionStorage cookie
  storage: "localStorage",
  showSettings: true,
  tagsView: true,
  fixedHeader: true,
  sidebarLogo: true,
}

export default settings