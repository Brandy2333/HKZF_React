import React, { useState } from 'react'
// 导入路由
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
// 导入News组件



// 引入导航栏
import Tab from '../TabBar'
// 引入样式
import './index.css'



export default class Cat extends React.Component {
    render() {
        return 
        
            <div id="container">
                <div id="list" style="left: -600px;">
                    <img src="img/5.jpg" alt="1"/>
                    <img src="img/1.jpg" alt="1"/>
                    <img src="img/2.jpg" alt="2"/>
                    <img src="img/3.jpg" alt="3"/>
                    <img src="img/4.jpg" alt="4"/>
                    <img src="img/5.jpg" alt="5"/>
                    <img src="img/1.jpg" alt="5"/>
                </div>
                <div id="buttons">
                    <span index="1" class="on"></span>
                    <span index="2"></span>
                    <span index="3"></span>
                    <span index="4"></span>
                    <span index="5"></span>
                </div>
                <a href="javascript:;" id="prev" class="arrow">&lt;</a>
                <a href="javascript:;" id="next" class="arrow">&gt;</a>
            </div>
    }
}       
