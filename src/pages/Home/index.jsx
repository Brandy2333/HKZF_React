import React, { useState } from 'react'
// 导入路由
import { BrowserRouter as Router, Route, Link, Routes ,Outlet} from 'react-router-dom'
// 导入News组件
// import News from '../News/index.jsx'



// 引入导航栏
import Tab from '../TabBar'
// 引入样式
import './index.css'


export default function Home() {

        return <div className='home'>
           
            {/* <News/> */}
            {/* 渲染News路由 */}
            {/* <Routes>
                <Route path="news/*" element={<News />} />
                <Route path="tab/*" element={<Tab />} />
            </Routes> */}
            {/* TabBar */}
            <Tab />

        </div>
  
}       
