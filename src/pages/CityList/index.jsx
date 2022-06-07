import React, { useState, useEffect ,useRef } from 'react'
import { AutoCenter, NavBar, Space, Toast } from 'antd-mobile'
import { SearchOutline, MoreOutline, CloseOutline } from 'antd-mobile-icons'
import axios from 'axios'
import './index.scss'
// 导入路由
import { useNavigate } from 'react-router-dom'
import { getCurrentCity } from '../../utils'
import { List, AutoSizer } from 'react-virtualized';





// 封装处理字母索引的方法
const formatCityIndex = (letter) => {
  switch (letter) {
    case '#':
      return '当前定位'
    case 'hot':
      return '热门城市'
    default:
      return letter.toUpperCase()
  }
}



export default function CityList() {

  const [cityList, setCityList] = useState({})
  const [cityIndex, setCityIndex] = useState([])    // 获取每一行的字母索引
  // 右侧索引高亮
  const [activeIndex , setactiveIndex] = useState(0)
  // useRef 可以使组件A调用组件B的方法
  const cityListComponent = useRef(List);

  const navigate = useNavigate()

  useEffect(() => {
     getCityList()
    // 调用measureAllRows，提前计算list的高度，
    // 需要在list组件中存在数据后调用
    // async function getMeasureAllRows(){
    //   await cityListComponent.current.measureAllRows()
    // }
    // getMeasureAllRows()
    
  }, [cityIndex.length]);
  const HOUSE_CiTY = ['北京','上海','广州','深圳']
  const changeCity= ({label , value}) => {
    if(HOUSE_CiTY.indexOf(label) > -1) {
      localStorage.setItem('hkzf_city',JSON.stringify({label,value}))
      navigate(-1)
    }else{
      Toast.show({
        content: '该城市暂无房源数据',
        // afterClose: () => {

        // },
      })
    }         

    console.log(label);
  }

  const rowRenderer = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  }) => {
    const letter = cityIndex[index]

    return (
      <div key={key} style={style} className="city">
        <div className="title">{formatCityIndex(letter)}</div>
        {
          cityList[letter].map(item => <div className="name" key={item.value} onClick={()=>changeCity(item)}>{item.label}</div>)
        }

      </div>
    );
  }

  // 数据格式化方法
  // list : [{},{}]
  const formatCityData = (list) => {
    const cityList = {}
    list.forEach(item => {
      const first = item.short.substr(0, 1)
      if (cityList[first]) {
        cityList[first].push(item)
      } else {
        cityList[first] = [item]
      }
    })

    // 获取索引数据
    const cityIndex = Object.keys(cityList).sort()
    return {
      cityList,
      cityIndex
    }
  }
  // 顶部导航栏
  const right = (
    <div style={{ fontSize: 24 }}>
      <Space style={{ '--gap': '16px' }}>
        <SearchOutline />
        <MoreOutline />
      </Space>
    </div>
  )

  const back = () =>
    Toast.show({
      content: '点击了返回区域',
      duration: 1000,
    })



  // 获取城市列表信息
  async function getCityList() {
    const res = await axios.get('http://localhost:8080/area/city?level=1')
    const { cityList, cityIndex } = formatCityData(res.data.body)
    const hotRes = await axios.get('http://localhost:8080/area/hot')
    cityList['hot'] = hotRes.data.body
    cityIndex.unshift('hot')

    // 获取当前定位城市
    const curCity = await getCurrentCity()

    cityList['#'] = [curCity]
    cityIndex.unshift('#')

    // console.log(cityList , cityIndex ,curCity);
    setCityList(cityList)
    setCityIndex(cityIndex)

  }

  // 索引的高度
  const Title_height = 36
  // 单个城市名称的高度
  const Name_height = 20
  // 自动计算高度的函数
  const getRowHeight = ({ index }) => {
    return Title_height + Name_height * cityList[cityIndex[index]].length
  }

  // 封装渲染右侧索引列表的方法
  const renderCityIndex = () => {

    return cityIndex.map((item , index) => 
    <li className="city-index-item" key={item} onClick={() => {
      cityListComponent.current.scrollToRow(index)
      // onRowsRendered({index})
    }}>
      <span className={activeIndex === index ? "index-active" : ''}>
        {item === 'hot' ? '热':item.toUpperCase()}
      </span>
    </li>)
  }

  // 用于获取list组件中渲染行的信息
  // 出现bug  react-virtualized onRowsRendered触发两次
  const onRowsRendered =({startIndex}) => {
    if (activeIndex !== startIndex){
      setactiveIndex(startIndex)
      console.log(startIndex);
      // console.log('wobei');

    }

  }

  // 返回数据
  return (
    <div className="citylist">
      <NavBar
        // onBack={back} 
        icon={<i className="iconfont icon-back " />}
        onBack={() => navigate(-1)}
      >
        城市选择
      </NavBar>

      {/* 城市列表 */}
      <AutoSizer>
        {
          ({ width, height }) => (
            <List
              ref={cityListComponent}
              width={width}
              height={height}
              rowCount={cityIndex.length}
              rowHeight={getRowHeight}
              rowRenderer={rowRenderer}
              onRowsRendered = {onRowsRendered}
              scrollToAlignment = "start"
              // isScrolling = {true}
              // isVisible = {true}
            />
          )
        }
      </AutoSizer>

      {/* 右侧索引列表 */}
      <ul className="city-index">
        {renderCityIndex()}
      </ul>
    </div>

  );
}
