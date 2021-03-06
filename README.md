# web-project-seed

网站开发种子项目

使用顺序

1. 执行 `npm i` 安装依赖包
2. 执行 `npm start` 启动开发环境

## 版本更新

### 1.5.0-beta1 （2018-08-17）

+ [feat] 引入新的依赖包 little-bee，去除多余依赖
+ [feat] layouts 与 pages 种子项目不再直接提供，而属于约定目录，其中功能将以插件形式提供加载，加载工具待完善
+ [feat] 引入配置文件 bee.config.js，其中将定义路由扫描，插件依赖等信息

### 1.4.2 （2018-07-27）

+ [fix] 解决在 oms 2.0 模式下，在某些条件下无法正常跳转登录页面的问题
+ [fix] 解决在进行多用户登陆登出连续操作下，菜单无法正常更新的问题

### 1.4.1 （2018-07-25）

+ [fix] 修复框架在 oms 2.0 版本下的一系列问题，针对 oms 的版本判断，改用自动判断，暂时不再需要在 init.json 中进行 oms 版本配置

### 1.4.0 （2018-07-18）

+ [feat] 兼容新旧两套 oms，在 init.json 中新增 oms 属性，配置为 '2' 时，代表 oms 服务为老板服务，如果不配置，代表新版 oms 服务

### 1.3.1 （2018-07-13）

+ [feat] 优化菜单获取方式，支持在读取本地配置文件与通过服务获取两种方式之间切换，修改 init.json 当中的 loaded 属性，默认为 false，即使用服务获取方式

### 1.3.0 （2018-07-06）

+ [fix] 修复 yc/http 中的某些异常，yc 依赖包升级
+ [feat] init.json 新增 home 参数，用于指定网站首页，如果不提供，则默认使用 router.js 当中的第一个非根目录的功能作为首页（即 403 页面）
+ [feat] 新增菜单权限控制，菜单由服务数据决定，/public/config/menu.js 的配置即将作废，不再推荐使用。如果需要本地调试，可以通过将 /public/config/menu.js 的内容迁移至 /mock/login.js 当中的 menu 节点来完成过渡

### 1.2.0 （2018-07-05）

+ [feat] 登录对接新版 oms 服务，以及配置相关 mock 数据。如需切换真实 oms，需将 taskServices.js 中的 api 改为 proxyOms，proxyOms 默认查询的为 183 的 oms 服务

### 1.1.0 （2018-07-04）

+ [feat] 目录升级改造，新增针对 router.json 的扫面功能

### 1.0.1 （2018-06-29）

+ [refactor] 将 src/index.js 中的 sysConfig 设置关闭，配置文件读取方法统一使用 utils/sysConfig
+ [feat] src/common/router.js，在 routerData 属性中新增 params 参数，用于携带 menu.js 中的 params 属性

### 1.0.0 （2018-06-22）

+ [refactor] 将 http 请求相关逻辑合并至 yc/http 之中，暂时依赖于 utils/request.js。同时保留 utils/http.js 用于过度，未来会被删除

## 命令说明

```bash
npm i -- 依赖包安装
npm i -D xx -- 安装具体某个依赖包
npm i -D xx@2.0.0 -- 安装具体某个依赖包的具体版本
npm start -- 启动开发环境
npm run build -- 项目打包
npm run site -- 针对 mock 数据生成相关说明页
npm run lint -- 代码格式审查
npm run test -- 代码测试
npm run prettier -- 代码格式自动修复
```

在依赖包包管理方面，支持使用 npm 以及 yarn 两种工具

## 目录说明

```bash
├── mock                     # 本地模拟数据
├── public                   # 静态资源区，build 时会直接 copy 至 dist 目录
|   |── config               # 网站配置文件
|   |   |── init.json        # 配置文件入口
|   |   |── mapcfg.js        # 地图配置
|   |   |── menu.js          # 菜单配置
|   |   └── taskServices.js  # 服务地址配置
|   └── images               # 静态图片存放
|       |── menus            # 菜单图标
│       └── favicon.ico      # Favicon
├── src
│   ├── common               # 应用公用配置，如导航信息
│   ├── components           # 业务通用组件
│   ├── e2e                  # 集成测试用例
│   ├── layouts              # 通用布局
│   │   └──repertory         # 提供多套基本布局
│   ├── models               # dva model
│   ├── routes               # 业务页面入口和常用模板
│   ├── services             # 后台接口服务
│   ├── utils                # 工具库
│   ├── index.ejs            # 网站容器，等价于 index.html
│   ├── index.js             # 应用入口
│   ├── index.less           # 全局样式
│   ├── router.js            # 路由入口
│   └── theme.js             # 主题配置
├── tests                    # 测试工具
├── README.md
└── package.json
```

### layouts

用于网站基本布局开发

### routes

功能模块，例如设备查询-点击查询、设备查询-范围查询等

### models

一个功能组需要对应至少一个 model，用来处理业务逻辑，这其中包含了所有 react-redux、redux-saga 内容。
model 和 model 之间通过 namespace 加以区分（namespace 带有重复检查机制）

### services

服务请求，用来对于服务结果进行处理

### common/router.js

路由地址配置，用于功能的注册

## 知识地图

从上到下，依次依赖

+ [Ant Desing Pro](https://github.com/ant-design/ant-design-pro/blob/master/README.zh-CN.md)
+ [dva](https://github.com/dvajs/dva/blob/master/README_zh-CN.md)
+ [roadhog](https://github.com/sorrycc/roadhog/blob/master/README.md)
+ [create-react-app](https://github.com/facebookincubator/create-react-app/blob/master/README.md)

### 第三方库

+ [fetch](https://github.com/matthew-andrews/isomorphic-fetch)
+ [es6-promise](https://github.com/stefanpenner/es6-promise)

## copyright

Zhongzhi Hongtu Technology Co., Ltd.（ZZHT）Web Project Development Template
