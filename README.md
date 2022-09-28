
# 简介

[vue3-element-admin](https://sangtian152.github.io/vue3-element-admin/) 是一个基于 `vue3.x` 和 `element-plus` 的后台管理系统模板。内置用户登录/登出，动态路由，权限校验，用户管理等典型的业务模型。

部分逻辑参考了 [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin/) ，这是一个基于 `Vue` 和 `ElementUI` 的优秀的后台管理系统模板，向大佬致敬！ 

- [在线预览](https://sangtian152.github.io/vue3-element-admin/)

# 技术栈
  - vue v3.2.37
  - vue-router v4.1.3
  - pinia v2.0.17
  - element-plus v2.2.15
  - axios v0.27.2
  - 其他依赖
    - vue3-tree-org `组织架构图` [github地址](https://github.com/sangtian152/vue3-tree-org) [gitee地址](https://gitee.com/sangtian152/vue3-tree-org)
    - @sangtian152/html2pdf  `html生成pdf`  [github地址](https://github.com/sangtian152/html2pdf) [gitee地址](https://gitee.com/sangtian152/html2pdf)
    - @sangtian152/watermark `图片加水印` [github地址](https://github.com/sangtian152/watermark) [gitee地址](https://gitee.com/sangtian152/watermark)

```tip
html2pdf和watermark，也是自己造的轮子，在这里给自己宣传一下，哈哈。

纯js实现，不依赖其他框架，不管你是react还是Vue亦或是Angular，都可以放心使用
```

# 功能

```bash
- 登录 / 注销

- 权限验证
  - 页面权限
  - 路由权限

- 全局功能
  - 动态侧边栏（支持多级路由嵌套）
  - 动态面包屑
  - 本地/后端 mock 数据
  - Screenfull全屏
  - 自适应收缩侧边栏

- 错误页面
  - 404

```

# 目录结构

```bash
├─ public                     # 静态资源
│   ├─ mock                   # 模拟数据
│   └─ favicon.ico            # favicon图标
├─ src                        # 项目源代码
│   ├─ api                    # 所有请求
│   ├─ assets                 # 图片 字体等静态资源
│   ├─ components             # 全局公用组件
│   ├─ config                 # 全局配置
│   │   ├─ permission.ts      # 权限管理
│   │   └─ settings.ts        # 基础配置
│   ├─ layout                 # 布局
│   ├─ router                 # 路由
│   ├─ stores                 # 全局 store管理
│   ├─ styles                 # 全局样式
│   ├─ utils                  # 全局公用方法
│   ├─ views                  # views 所有页面
│   ├─ App.jsx                # 入口页面
│   ├─ defaultSettings.js     # 全局默认配置
│   └─index.jsx               # 源码入口
├── .env.development          # 开发环境变量配置
├── .env.production           # 生产环境变量配置
├── index.html                # html模板
├── vite.config.ts            # vite自定义配置
└── package.json              # package.json
```

# 安装

```shell
# 克隆项目
git clone https://github.com/sangtian152/vue3-element-admin.git

# 进入项目目录
cd vue3-element-admin

# 安装依赖
npm install

# 切换淘宝源，解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

启动完成后会自动打开浏览器访问 [http://127.0.0.1:5173/vue3-element-admin/](http://127.0.0.1:5173/vue3-element-admin/)


# 鼓励作者

开源不易，如果对你有用，请给个star！
