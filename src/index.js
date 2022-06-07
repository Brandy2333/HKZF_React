import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import TabBar from './pages/TabBar';
// 导入字体 图标库
import './assets/fonts/iconfont.css';

import  'antd-mobile';

import 'react-virtualized/styles.css';
import App from './App';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
    // <TabBar />

    
);
// import { createRoot } from 'react-dom/client';
// const container = document.getElementById('root');
// const root = createRoot(container);
// root.render(<App />);
 

