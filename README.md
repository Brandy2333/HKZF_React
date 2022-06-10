# React 好客租房 demo
### 简介 
B站React课程复现demo，https://www.bilibili.com/video/BV1gh411U7JD?p=1
使用React（v18）、React-router-dom(v6)、antd-mobile(v5),函数组件
### 存在bug 
- react-virtualized 右侧索引点击会渲染两次
- Map组件中不能展示HouseItem组件
- React18中会提示一些17的方法18不支持，暂未解决
- 以后变强了再来改吧
- 不太算bug的一点
  - 介绍H5地理位置API时，由于使用了Chromium，不能进行https请求，这个可以设置代理，但是本文没有做，后面百度地图API可以解决
### 一些文档
- React 官方文档： https://zh-hans.reactjs.org/docs/forms.html#controlled-components
- Antd-mobile: https://mobile.ant.design/zh/components/tab-bar 
- React-virtualized:https://github.com/bvaughn/react-virtualized
- React-router的官方文档后来找不到了，参考知乎大佬的文章，对比了一下改动:https://zhuanlan.zhihu.com/p/431389907
### 缩减版目录
- src 结构
  - components 一些公用组件
  - pages 一些页面
  - utils 工具
### 启动方法
在根目录运行 npm start 
### 后端数据
参考课程中的评论的课程附件，需自己将数据录入数据库，并修改保存服务器代码中的链接数据库的账号密码

### 后记
希望能找到实习，再补补基础，回头把bug改了


# 下面的不用看
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
