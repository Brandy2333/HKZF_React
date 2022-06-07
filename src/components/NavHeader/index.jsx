import React, { useState, useEffect ,useRef } from 'react'
import { AutoCenter, NavBar, Space, Toast } from 'antd-mobile'
import { useNavigate , useParams} from 'react-router-dom'
import './index.scss'

export default function NavHeader( { children } ) {
    
  const navigate = useNavigate()
// 返回数据
return (

      <NavBar
        // onBack={back} 
        icon={<i className="iconfont icon-back " />}
        onBack={() => navigate(-1)}
      >
        {children}
      </NavBar>

  );
}
// 返回值为组件
//  useParams(NavHeader)