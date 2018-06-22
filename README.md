# web-project-seed

网站开发种子项目

使用顺序

1. 执行 `npm i` 安装依赖包
2. 执行 `npm start` 启动开发环境

## 版本更新

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
