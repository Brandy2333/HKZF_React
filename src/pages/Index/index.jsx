import React ,{useState , useEffect} from 'react'
import { Swiper , Grid} from 'antd-mobile'

import axios from 'axios'
import  './index.scss'

// 导入路由
import {
  Route,
  Routes,
  useLocation,
  useNavigate
} from 'react-router-dom'

// 导入导航菜单图片
import Nav1 from '../../assets/images/nav-1.png'
import Nav2 from '../../assets/images/nav-2.png'
import Nav3 from '../../assets/images/nav-3.png'
import Nav4 from '../../assets/images/nav-4.png'

// 导入获取当前城市的方法
import {getCurrentCity} from '../../utils'


 
// 轮播图
const MySwiper = () =>{
  const [swipers, setSwipers] = useState([]);
  // const [isSwiperLoaded , setIsSwiperLoaded] = useState(false)
  

  useEffect(() => {
    async function getSwipers() {
      let res = await axios.get('http://localhost:8080/home/swiper')
      res = res.data.body

      setSwipers (res)

    }
   getSwipers()
  }, [swipers.length]); 
  // 这个参数的作用： useEffect会比较这个对象有没有变化，如果变化，才执行useEffect 但是这里直接比较swipers会认为不一样，原因未明
// length从0到3 ，做到只加载一次

  const items = swipers.map(item => (
    <Swiper.Item key={item.id}>
      <div className='content' >
        <a
          href='https://www.baidu.com'
          style={{
          display : 'inline-block',
          width : '100%',
          }}
        >
        <img
          src={`http://localhost:8080${item.imgSrc}`}
          alt = '图片跑路了'
          style={{width:'100%',verticalAlign:'top'}}
          >
        </img>
        </a>

      </div>
    </Swiper.Item>
  ))
  
  return (
    <Swiper 
      autoplay
      loop
      autoplayInterval={5000} 
  >
    {items}
  </Swiper>
  )
}

// 搜索框
const MySearch = () =>{
  const navigate = useNavigate()
  const [curCityName , setCurCityName] = useState('北京')
  
// 获取地理位置信息
    // h5 API chrome浏览器需要https 不行
      // navigator.geolocation.getCurrentPosition(position => {
      //   console.log('当前位置信息:',position)
      // })

    useEffect(() => {
      const getCurCity = async () => {
        const curCity = await getCurrentCity()
        setCurCityName(curCity.label)
      }
      getCurCity()

      // const curCity = new window.BMapGL.LocalCity()
      // curCity.get(async res =>{
      //     const result = await axios.get(`http://localhost:8080/area/info?name=${res.name}`)

      //     setCurCityName(result.data.body.label)
  
      // })
      
    },[curCityName.length]); 

  return (
      <div className='search-box'>

        {/* 左侧白色区域 */}
        <div className='search'>

          {/* 位置 */}
          <div className='location' onClick = {()=>{navigate('/citylist')}}>
            <span className='name'>{curCityName}</span>
            <i className='iconfont icon-arrow'/>

          </div>

          {/* 搜索表单 */}
          <div className='form' onClick = {()=>{navigate('/search')}}>

            <i className='iconfont icon-seach'/>
            <span className='text'>请输入小区或地址</span>

          </div>
        </div>

        {/* 右侧地图图标 */}
        <i className='iconfont icon-map' onClick = {()=>{navigate('/map')}}/>

      </div>
  )
}


// 导航栏
const MyNavBar = () =>{
  const navigate = useNavigate()
  const navs = [
    {
      id:1,
      img:Nav1,
      title:'整租',
      path:'/home/houseList'
    },
    {
      id:2,
      img:Nav2,
      title:'合租',
      path:'/home/houseList'
    },
    {
      id:3,
      img:Nav3,
      title:'地图找房',
      path:'/home/houseList'
    },
    {
      id:4,
      img:Nav4,
      title:'去出租',
      path:'/home/houseList'
    }
  ]

  return navs.map(item => (
      <div 
        className='navBarchild'
        key = {item.id}
        onClick = {() => navigate(item.path)}
      >
        <img src={item.img} alt='图片消失了'></img>
        <h2>{item.title}</h2>
      </div>
  ))
}


// 租房小组
const MyGrid = () => {

  const [groups, setGroups] = useState([]);
  useEffect(() => {
    async function getGroups() {
      let res = await axios.get('http://localhost:8080/home/groups' , {
        params:{
          area:'AREA%7C88cff55c-aaa4-e2e0'
        }
      })
      setGroups(res.data.body)
    }
    getGroups()
  }, [groups.length])

  return (
        <Grid columns={2} gap={10}> 
            {groups.map(item => (
                <Grid.Item 
                    key = {item.id}
            //         onPress = {()=>{
            //             navigate(item.path)
            // }}
              >
            <div className='group-item' >
              
              <div className='desc'>
                <p className='title'>{item.title}</p>
                <p className='info'>{item.desc}</p>
              
                {/* <a
                href='https://www.baidu.com'
                style={{
                display : 'inline-block',
                width : '100%',
                  }}
                  >
          
                </a> */}
        </div>
        <img
                src={`http://localhost:8080${item.imgSrc}`}
                alt = '图片跑路了'
              >
              </img>
            </div>
              </Grid.Item>
            ))}
        </Grid>
  )
}

// 最新资讯
const MyNews = () => {

  const [news, setNews] = useState([]);
  useEffect(() => {
    async function getNews() {
      let res = await axios.get('http://localhost:8080/home/news' , {
        params:{
          area:'AREA%7C88cff55c-aaa4-e2e0'
        }
      })
      setNews(res.data.body)
    }
    getNews()
  }, [news.length])
  // console.log(news)
  return (news.map(item => (
      <div className='news-item' key = {item.id}>
          <div className='imgwrap' >
              <img className='img'
                src={`http://localhost:8080${item.imgSrc}`}
                alt = '图片跑路了'
              />
          </div>
          <div className='content'>
              <h3 className='title'>{item.title}</h3>
              <div className='info' >
                <span >{item.from}</span>
                <span >{item.date}</span>
                {/* <a
                href='https://www.baidu.com'
                style={{
                display : 'inline-block',
                width : '100%',
                  }}
                  >
          
                </a> */}
                </div>
            </div>

      </div>
            ))
        // </div>
  )
}

export default function Index() {
  return (
    <>
      <div className='index'>

        {/* 轮播图 */}
        <div className='swiper'>
          <MySwiper/>

          {/* 搜索框 */}
          <MySearch/>
        </div>

        {/* 导航栏 */}
        <div className='navBar'>
          <MyNavBar/>
        </div>

        {/* 租房小组 */}
        <div className='group'>
          <h3 className='title'>
              租房小组 <span className='more' right = '0px'>更多</span>
          </h3>
          <MyGrid/>
        </div>

        {/* 最新资讯 */}
        <div className='news'>
          <h3 className='group-title'>
              最新资讯 
          </h3>
          <MyNews/>
        </div>

      </div>
    </>
  )
}