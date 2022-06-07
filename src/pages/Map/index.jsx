import React ,{useState , useEffect,useRef} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Toast } from 'antd-mobile'
import { UploadOutline } from 'antd-mobile-icons'
import axios from 'axios'
import styles from './index.module.css'
import './index.scss'

// 导入封装好的NavHeader 和 HouseItems
import NavHeader from '../../components/NavHeader'
import HouseItem from "../../components/HouseItem"


// 解决脚手架中全局变量访问问题,react 脚手架中，全局对象需要使用window来访问，否则eslint报错
const BMapGL = window.BMapGL

// 覆盖物样式
const labelStyle = {
    cursor: 'pointer',
    border: '0px solid rgb(255, 0, 0)',
    padding: '0px',
    whiteSpace: 'nowrap',
    fontSize: '12px',
    color: 'rgb(255, 255, 255)',
    textAlign: 'center'
}


// Map组件
export default function Map () {
    
    // 设置小区房源列表和是否显示列表的state
    const [list, setList] = useState([]);
    const [isShowList, setIsShowList] = useState(false);



    // 初始化地图
    const initMap = () => {

        // 获取当前定位信息
        const {label ,value} = JSON.parse(localStorage.getItem('hkzf_city'))

        // 创建地图 
        var map = new BMapGL.Map("container");

        // 创建解析器实例
        const myGeo = new BMapGL.Geocoder();   

        // 将地址解析结果显示在地图上，并调整地图视野  
        myGeo.getPoint(label, async point => {
            if(point){
                map.centerAndZoom(point, 11);

                // 添加常用控件
                map.enableScrollWheelZoom(true);            //开启鼠标滚轮缩放
                var scaleCtrl = new BMapGL.ScaleControl();  // 添加比例尺控件
                map.addControl(scaleCtrl);
                var zoomCtrl = new BMapGL.ZoomControl();    // 添加缩放控件
                map.addControl(zoomCtrl);

                // 渲染覆盖物
                renderOverlays(value)
            }else{
                alert('您选择的地址没有解析到结果！');
            } 


        }, label) 

        // 给地图增加移动事件
        map.addEventListener('movestart', () => {
            if (isShowList){
                setIsShowList(false)
            }
        })


        // 渲染覆盖物入口
        // 1.接收区域id参数，获取该区域下的房源数据
        // 2.获取房源类型及下级地图缩放级别
        const renderOverlays = async (id) =>{
            try{

                // 开启loading
                Toast.show({
                    icon: 'loading',
                    content: '加载中…',
                });
                const res = await axios.get(`http://localhost:8080/area/map?id=${id}`)

                // 关闭Loading
                Toast.clear()

                const data = res.data.body 
    
                // 调用getTypeAndZoom()获取级别和类型
                const {nextZoom , type} = getTypeAndZoom()

                data.forEach(item => {
                    // 创建覆盖物
                    createOverlays(item , nextZoom , type)
                })

            }catch(e){

                // 清除加载提示
                Toast.clear();
            }

        }

        // 计算类型和缩放入口
        // 1.计算要绘制的覆盖物类型和下一个缩放级别
        // 2.区 11 ,镇 13 ,小区 15
        const getTypeAndZoom = () => {

            // 获取当前缩放级别
            // 这一步的异步调用出了问题，没有获取到当前的zoom，而是上一步的zoom,所以自己改了一下条件
            let zoom = map.getZoom()

            // 定义下一级别和类型
            let nextZoom ,type

            if (zoom == 11){
              nextZoom = 13
              type = 'circle'
            }else if (zoom > 11 && zoom <15){
              nextZoom = 15
              type = 'circle'
            }else if (zoom >= 14 && zoom <16){
              type = 'rect'
            }
            console.log(nextZoom,type);
            return {nextZoom,type}
        }
      
      
        // 创建覆盖物
        const createOverlays = (data , zoom , type) => {

            // 获取坐标
            const {coord:{longitude , latitude},label:areaName,count,value} = data

            //创建坐标对象
            const areaPoint = new BMapGL.Point(longitude,latitude)

            // 两个方法入口
            if (type == 'circle'){
              createCircle(areaPoint, areaName,count,value,zoom)
            }else{
              createRect(areaPoint, areaName,count,value)
            }
        }
      
      
        // 创建区、镇覆盖物
        function  createCircle(point, name, count, id, zoom) {

            // 创建覆盖物
            const label = new BMapGL.Label('',{                       // 可以创建文本标注
                position: point,                                      // 设置标注的地理位置
                offset: new BMapGL.Size(-35, -35)                     // 设置标注的偏移量
            })  

            // 给 label 对象添加一个唯一标识
            label.id = id
      
            // 设置房源覆盖物内容
            label.setContent(`
              <div class="${styles.bubble}">
                <p class="${styles.name}">${name}</p>
                <p>${count}套</p>
              </div>
            `)
        
            // 设置样式
            label.setStyle(labelStyle)
      
            // 添加单击事件
            label.addEventListener('click', () => {
                // if (zoom > 11) zoom = 13
                console.log('真的：',zoom);
                map.centerAndZoom(point, zoom)
                
                // 调用 renderOverlays 方法，获取该区域下的房源数据
                renderOverlays(id)
                // 放大地图，以当前点击的覆盖物为中心放大地图

 
                console.log('createCircle',zoom);
                setTimeout(() => {
                    // 清除当前覆盖物信息
                    map.clearOverlays()
                }, 0)
            })

            // 添加覆盖物到地图中
            map.addOverlay(label)

        }
      
      
        // 创建小区覆盖物
        function createRect(point, name, count, id) {
            // 创建覆盖物
            console.log('rect',point, name, count, id);
            const label = new BMapGL.Label('',{                     // 创建文本标注
              position: point,                                      // 设置标注的地理位置
              offset: new BMapGL.Size(-50, -28)                     // 设置标注的偏移量
            })  

            // 给 label 对象添加一个唯一标识
            label.id = id
      
            // 设置房源覆盖物内容
            label.setContent(`
                <div class="${styles.rect}">
                    <span class="${styles.housename}">${name}</span>
                    <span class="${styles.housenum}">${count}套</span>
                    <i class="${styles.arrow}"></i>
                </div>
            `)
      
            // 设置样式
            label.setStyle(labelStyle)

            // 添加单击事件
            label.addEventListener('click', async (e) => {

                // 加载提示
                Toast.show({
                    icon: 'loading',
                    content: '加载中…',
                });

                // 当点击小区标签时,将该位置移动到视图中间
                const target = e.domEvent.changedTouches[0];

                map.panBy(
                    window.innerHeight / 2 - target.clientX,
                    (window.innerHeight - 330) / 2 - target.clientY

                )

                // 获取小区房源，设置房源列表显示

                const result = await axios.get(`http://localhost:8080/houses?cityId=${id}`);

                setList(result.data.body.list);

                setIsShowList(true);
                console.log(list);

                // 清除加载提示
                Toast.clear();
                // await getHouseList(id)
                // 调用 renderOverlays 方法，获取该区域下的房源数据
                // renderOverlays(id)
          
                // 放大地图，以当前点击的覆盖物为中心放大地图
                // map.centerAndZoom(point, 15)
          
                // 解决清除覆盖物时，百度地图API的JS文件自身报错的问题
                // setTimeout(() => {
                //   // 清除当前覆盖物信息
                //   map.clearOverlays()
                // }, 0)
            })
      
          // 添加覆盖物到地图中
          map.addOverlay(label)
        }


        // 获取小区房源数据方法
        const getHouseList = async (id) => {
            console.log(88);
            try{
                // 开启loading
                // Toast.loading('Loading...', 0 ,null, false)
                Toast.show({
                  icon: 'loading',
                  content: '加载中…',
                });
                const res = await axios.get(`http://localhost:8080/houses?cityId=${id}`)

                // 关闭Loading
                Toast.clear()

                setList(res.data.body.list)

                // 展示房源列表
                setIsShowList(true)
                console.log(isShowList);
            }catch(e){
                 // 清除加载提示
                 Toast.clear();
            }
        }


    }


    
    // 房屋列表组件
    const HouseList = ({list, isShowList}) => {
        const history = useNavigate();

        return (
            <div className={`${styles.houseList} ${isShowList ? styles.show : ''}`}>
                <div className={styles.titleWrap}>

                    <h1 className={styles.listTitle}>房屋列表</h1>
                    <Link className={styles.titleMore} to="/home/search">
                        更多房源
                    </Link>

                </div>
                <div className={styles.houseItems}>
                    {list.map((house) => (
                        <HouseItem
                            key={house.houseCode}
                            src={'http://localhost:8080/' + house.houseImg}
                            title={house.title}
                            desc={house.desc}
                            tags={house.tags}
                            price={house.price}
                            styles={styles}
                            onClick={() => history(`/detail/${house.houseCode}`)}
                        />
                    ))}
  

                </div>
            </div>
        )
    };


    // 调用生命周期方法
    useEffect(() => {
        initMap()
        console.log(isShowList);
    }); 
   


    // 返回组件内容
    return (

        <div className="map">
            <NavHeader>地图找房</NavHeader>
            
                <div id="container" className={styles.container}>

                    {/* 房源列表 */}
                    {/* 添加 styles.show 展示房屋列表 */}
                    {/* <HouseList
                        list={list}
                        isShowList={isShowList}
                    /> */}
                    <div id = "text">我</div>

                    <div className={`${styles.houseList} ${isShowList ? styles.show : ''}`}>
                        <div className={styles.titleWrap}>

                            <h1 className={styles.listTitle}>房屋列表</h1>
                            <Link className={styles.titleMore} to="/home/search">
                                更多房源
                            </Link>

                        </div>
                        <div className={styles.houseItems}>
                            {list.map((house) => (
                                <HouseItem
                                    key={house.houseCode}
                                    src={'http://localhost:8080/' + house.houseImg}
                                    title={house.title}
                                    desc={house.desc}
                                    tags={house.tags}
                                    price={house.price}
                                    styles={styles}
                                    // onClick={() => history(`/detail/${house.houseCode}`)}
                                />
                            ))}
  

                        </div>
                    </div>



                </div>


        </div>
    );


}
