# 麦云分享虚拟资源站

使用到的技术栈：vue3.0 + vue-router + vuex + element-plus + ES6 + vite + typescript4.0 + pnpm

[效果演示](https://maiyunshare.gitee.io/portal/#/resource/home)

## 说明

> 基于 vue3 + vite 的 spa 项目，后期会采用 nuxt 重构。欢迎更多开发者加入项目开发，一起贡献和维护。

> 如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！ ^\_^

> 或者您可以 "follow" 一下，我会不断开源更多的有趣的项目

> 如有问题请直接在 Issues 中提，或者您发现问题并有非常好的解决方案，欢迎 PR 👍

> 开发环境 pnpm 6.35.1 nodejs 14.21.1

## 功能

- 系统说明
- 登录/注册
- 密码修改
- 个人主页
- 权限验证
- 收藏/点赞
- 资源查询
- 在线下单
- 个人支付
- 邮箱订单信息推送
- 表单校验、提交
- 401，404 重定向页面
- 响应式布局

## 开发

```bash
# 克隆到本地
git clone https://github.com/jschentt/resource-shoppe.git

# 进入文件夹
cd resource-shoppe

# 安装依赖
pnpm install

# 开启本地服务器localhost:3000
pnpm start

# 发布环境
pnpm build
```

浏览器访问 http://localhost:3000/

## 关于图标

```
    本项目使用了两套图标系统，具体使用方法参照以下官方链接:
    1.https://element-plus.org/zh-CN/component/icon.html
    2.https://www.viterc.cn/en/vite-plugin-svg-icons.html
```

## 目录结构

```shell
├── main.ts 入口文件
├── App.vue 全局组件入口
├── api 封装api接口，按模块划分为不同的文件
    ├── auth 权限认证
        ├── index.ts
    ├── ...
├── assets 静态资源文件
├── components 通用组件封装
├── config 全局配置文件
├── enums 枚举值
├── hooks 代替mixin,全局hooks文件
├── interfaces 封装ts接口
├── layout 布局文件
    ├── footer 页脚
    ├── header 页头
    ├── ...
├── plugins 插件
    ├── elementPlus按需引入
    ├── configs 引入全局配置
    ├── globalMethods 引入全局方法
    ├── ...
├── router 封装页面路由，按模块划分为不同的文件
    ├── modules 按模块划分为不同的文件
        ├── shared.ts 示例
    ├── router-guards.ts 路由守卫
    ├── ...
├── store 全局状态管理
     ├── modules 按模块划分为不同的文件
        ├── user 用户状态管理
        ├── ...
    ├── index.ts 全局状态入口
├── styles 全局样式文件
├── libs 工具函数，类库封装
    ├── http \ axios axios接口请求封装，设置拦截器
    ├── Storage 缓存相关方法
    ├── ...
├── views 各个页面

```

## 状态管理

目前只有用户信息、菜单权限、用户积分相关状态使用 vuex 存储在全局，其它数据都由每个业务页面自己管理。

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2024 Bruce Chen
