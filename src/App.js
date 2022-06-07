import React, { useState } from 'react'
import { Button ,Badge, TabBar} from 'antd-mobile'

import { BrowserRouter as Router ,Route,Link,Routes,Navigate} from 'react-router-dom'
// 导入首页和城市选择
import Home from './pages/Home/index'
import CityList from './pages/CityList/index'
import Map from './pages/Map/index'




export default function App() {
  return (
    <Router >
      <div className="App">
        {/* 配置导航菜单 */}
        {/* <ul>
          <li>
              <Link to='home'>首页</Link>
          </li>
          <li>
              <Link to='citylist'>城市选择</Link>
          </li>
        </ul> */}
        

        {/* 配置路由 */}
        <Routes>
        {/* 要嵌套的路由这里一定要写/*  为了告诉这个路由后续会跟着其它路径 */}
        {/* 主页重定向 */}
          <Route  path="/"  exact element={<Navigate to = '/home'/>}> </Route>  
          
          <Route path="home/*" exact element={<Home/>} ></Route>
          <Route path="citylist/*" element={<CityList/>}></Route>
          <Route path="map/*" element={<Map/>}></Route>

        </Routes>
      </div> 
    </Router>
  );
}


