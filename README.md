# HKZF_React
## 好客租房APP
### 介绍
B站React上手demo ，教程链接 https://www.bilibili.com/video/BV1gh411U7JD?p=1
使用React(v18),React-router(v6),Antd-mobile(v6),React-virtualized 完成
组件使用函数组件，并使用了Hooks
存在bug：
  -  React-virtualized 渲染城市列表时点击高亮会渲染两次，
  -  Map页面获取小区房源数据后，不能将组件渲染在地图中

### 相关资料
- React官方文档：https://zh-hans.reactjs.org/docs/getting-started.html
- React-router(v6)的一些改动，参考了知乎大佬的文章：https://zhuanlan.zhihu.com/p/431389907
- Antd-mobile(v6)官方文档：https://mobile.ant.design/zh/components/tab-bar
- React-virtualized ： https://github.com/bvaughn/react-virtualized

### 有用的目录
- hkzf_v1  后端数据 进去后按照教程配置数据库即可，npm run serve 启动
- hkzf-mobile 前端，npm run serve 启动