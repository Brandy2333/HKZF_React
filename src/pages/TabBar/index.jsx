import React , {useState ,useEffect} from 'react'
import { TabBar } from 'antd-mobile'
// 这些是tabbar的图标
// import {   
//     AppOutline,
//     MessageOutline,
//     MessageFill,
//     UnorderedListOutline,
//     UserOutline,
// } from 'antd-mobile-icons'
// 导入路由
import {
    Route,
    Routes,
    useLocation,
    useNavigate
} from 'react-router-dom'

// 不做废物

import styles from './demo2.css'

// 引入四个页面
import Index from '../Index/index.jsx'
import Message from '../Message/index'
import HouseList from '../HouseList/index'
import PersonalCenter from '../PersonalCenter/index'




const Bottom = () => {

    const tabs = [
        {
            key: '',
            title: '首页',
            icon: <i className='iconfont icon-ind' />, //图标
            selectedIcon: <i className='iconfont icon-ind' />,
            tintColor: '#21b97a',
            barTintColor: 'white',
            path: '/home'


            // badge: Badge.dot,
        },
        {
            key: 'houseList',
            title: '找房',
            icon: <i className='iconfont icon-findHouse' />,
            selectedIcon: <i className='iconfont icon-findHouse' />,
            tintColor: '#21b97a',
            barTintColor: 'white',
            path: '/home/houseList'


        },
        {
            key: 'message',
            title: '资讯',
            icon: <i className='iconfont icon-infom' />,
            selectedIcon: <i className='iconfont icon-infom' />,
            tintColor: '#21b97a',
            barTintColor: 'white',
            path: '/home/message'


        },
        {
            key: 'personalCenter',
            title: '个人中心',
            icon: <i className='iconfont icon-my' />,
            selectedIcon: <i className='iconfont icon-my' />,
            tintColor: '#21b97a',
            barTintColor: 'white',
            path: '/home/personalCenter'

        }
    ]


    const navigate = useNavigate()
    const location = useLocation()
    const { pathname } = location
    const setRouteActive = (value) => {
        navigate(value)  // navigate 不能和history 一样 用push  
    }
    const [activeKey, setActiveKey] = useState(pathname)
    // console.log(activeKey) 
    useEffect(() => {
        function getActiveKey() {
            setActiveKey (pathname)
        }
        getActiveKey();
      },[pathname]);




    return (
        <TabBar
            unselectedTintColor='#949494'
            tintColor='#21b97a'
            barTintColor='white'
            activeKey={pathname} 
            
            onChange={//点击切换
                value => setRouteActive(value)
            }  
        >
            {tabs.map(item => (
                <TabBar.Item 
                    key={item.path} 
                    icon={item.icon} 
                    title={item.title} 
                    selectedIcon = {<i className={`iconfont ${item.icon}`} />}
                    onPress = {()=>{
                        navigate(item.path)
                    }}

                />
            ))}
            
        </TabBar>
    )
}

export default function Tab(){
    return (
        // <Router>  在最外层一个router即可 不可以嵌套

        <div className={styles.app}>
            <div className={styles.body}>
                <Routes>
                    <Route path='' exact element={<Index />}></Route>
                    <Route path='houseList' exact element={<HouseList />}></Route>
                    <Route path='message' exact element={<Message />}></Route>
                    <Route path='personalCenter' exact element={<PersonalCenter />}></Route>
                </Routes>
            </div>
            <div className={styles.bottom}>
                <Bottom />
            </div>
        </div>

        // </Router>
    )
}

