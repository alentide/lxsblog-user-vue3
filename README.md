# lxsblog-user-vue3

这是我的个人博客。

前端技术栈：vue3，typescript，ant-design-vue。

博客核心功能已完成，虽然还有很多没有完善的地方，代码有点混乱也需要重构。

博客地址： [https://blog.liuxinsong.top](https://blog.liuxinsong.top)

因为是个人博客，目前博客只能管理员可以发文章，未来可能改成用户都可以发文章（可能性不大）。

这个项目是用户端和管理端融合在一起的（懒得拆开了）。

后端项目地址（待上传中）
## 待完成的功能
- [ ] 使用Nuxt3重构。由于Nuxt3官方文档尚不完善，为了避免不必要的开发风险，没有选择Nuxt3。但为了SEO，未来添加新功能时，可能迁移到Nuxt3.
- [ ] ToDoList加番茄闹钟
- [ ] 图片资源管理。暂时还有图片资源管理，每次选择图片都得上传新的。。。
- [ ] 添加数据统计。目前没有统计面板(没想好统计啥)

## 项目界面


## 如何启动？
建议使用vscode编辑器。
### 安装依赖

```sh
npm install
```

除此以外你需要安装[volar插件](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)，

### 开发环境编译

```sh
npm run dev
```

### 打包编译

```sh
npm run build
```
### 单元测试
没有写单元测试。。。（虽然有相关依赖。）
