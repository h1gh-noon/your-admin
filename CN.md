# Vue 3 + Vite (whithout typescript)

[bootstrap-vue-next](https://bootstrap-vue-next.github.io/bootstrap-vue-next/) axios router pinia

**svg支持颜色修改 (css指定color属性)**
svg图标处理脚本 svg_script.js

## [在线Demo](https://h1gh-noon.github.io/your-admin/)

[查看Demo✈️](https://h1gh-noon.github.io/your-admin/)

## 快速开始

```shell
# clone项目
git clone https://github.com/h1gh-noon/your-admin.git

# 进入项目目录
cd your-admin

# 安装依赖
pnpm i
# or
npm i

# **启动
pnpm run dev
# or
npm run dev
```

启动完成 [http://localhost:5173](http://localhost:5173/)

## 编译

```shell
# 测试环境打包
pnpm run build-test

# 生产环境打包
pnpm run build
```

- .env  默认环境变量（会被覆盖）
- .env.development  开发环境dev 
- .env.test 测试环境test
- .env.production 生产环境production 

VITE_BASE_URL 打包之后的url前缀 （与nginx配置对应） 

VITE_BASE_API 请求接口的url前缀

VITE_CLOSE_DEV=true 关闭调试，会去除console、debugger、sourcemap源码，默认不写VITE_CLOSE_DEV为false（**不能VITE_CLOSE_DEV=false**因为.env配置的是字符串类型"false"）

**加载的环境变量也会通过 `import.meta.env` 以字符串形式暴露给客户端源码。为了防止意外地将一些环境变量泄漏到客户端，只有以 `VITE_` 为前缀的变量才会暴露给经过 vite 处理的代码。**[详见vite文档✈](https://cn.vitejs.dev/guide/env-and-mode.html#env-files)

## nginx配置

### gzip压缩
```
    gzip on;
    gzip_min_length 1k;
    gzip_comp_level 5;
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript;
    gzip_static on;
    gzip_vary on;
    gzip_buffers 2 4k;
    gzip_http_version 1.1;
```
### vue配置 （指定二级目录）
```
root  html; # nginx的web跟目录 打包之后的文件应该放在 html/youradmin 目录下
location ^~/youradmin/ { # youradmin替换成与环境变量VITE_BASE_URL对应的路径
    index  index.html index.htm;
    try_files $uri $uri/ /youradmin/index.html; # youradmin替换成与环境变量VITE_BASE_URL对应的路径
}
```
## 详细信息
### 目录
[查看目录详情✈](https://github.com/h1gh-noon/your-admin/blob/dev/ProjectTree.md)

### git分支
- master 稳定分支（暂时还没有，目前处于开发状态）
- dev 开发分支


## License

[MIT](https://github.com/h1gh-noon/your-admin/blob/dev/LICENSE)

Copyright (c) 2023 h1gh-noon
