```
your-admin
├─ .env // 默认环境变量（会被覆盖）
├─ .env.development // dev 开发环境
├─ .env.production // production 生产环境
├─ .env.test // test 测试环境
├─ .git
│  └─*
├─ .github
│  └─ workflows
│     └─ dev.yml // Github Action
├─ .gitignore
├─ index.html
├─ LICENSE
├─ package.json
├─ pnpm-lock.yaml
├─ public
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ api // 请求api目录
│  │  └─ baseApi.js
│  ├─ App.vue
│  ├─ assets // 静态资源
│  │  ├─ base.css
│  │  ├─ icons // svg目录
│  │  │  ├─ compass.svg
│  │  │  ├─ db.svg
│  │  │  ├─ down.svg
│  │  │  └─ server.svg
│  │  ├─ images
│  │  │  ├─ 403.png
│  │  │  └─ 404.png
│  │  ├─ main.css
│  │  └─ style.scss
│  ├─ common
│  │  ├─ config.js
│  │  └─ nprogress.js // 进度条插件
│  ├─ components
│  │  ├─ errorPage
│  │  │  ├─ 403.vue
│  │  │  ├─ 404.vue
│  │  │  └─ index.scss
│  │  ├─ HelloWorld.vue
│  │  ├─ layouts // 布局组件
│  │  │  ├─ components
│  │  │  │  ├─ MenuItem.vue
│  │  │  │  └─ MenuTree.vue
│  │  │  └─ LayoutIndex.vue
│  │  ├─ LoginPage.vue
│  │  └─ SvgIcon.vue // svg组件
│  ├─ main.js
│  ├─ router
│  │  ├─ index.js
│  │  └─ modules
│  │     ├─ dynamicRouter.js // 动态路由
│  │     └─ staticRouter.js // 静态路由
│  ├─ stores
│  │  ├─ auth.js // 仓库-鉴权
│  │  └─ counter.js
│  ├─ utils // 工具目录
│  │  ├─ index.js
│  │  └─ request.js // http请求封装
│  └─ views
│     └─ HomeView.vue
├─ svg_script.js // svg处理脚本
└─ vite.config.js

```