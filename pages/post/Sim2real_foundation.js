import DisqusBox from '../../components/disqus'
import Header from '../../components/header'
import Footer from '../../components/footer'
import KeywordsTags from '../../components/keywordsTags'
import { sortedLastIndex } from 'lodash'

export async function getStaticProps() {
    
  const data = {
      data: {
        Post: {
                  id: "Sim2real_foundation",
                  title: "【Sim2real】01：ROS ， Moveit ， Gazebo 和凸包",
                  publishedDate: "2022-08-18",
                  brief: "用UR5机器人开发实际工业加工的项目，Sim2Real的基础项目搭建",
                  categories: [{name: "Robotic" }]  
              }
      }        
  }
  // Pass data to the page via props
  return { props: data }
}

function post({ data }) {
    let _post = data.Post

    return <div>
        <div className="w3-content" style={{ maxWidth:1500 + "px" }}>
            
            <Header />
            
            { /* Context */ }
            
            <div className="w3-row-padding" >
                <div className="post postdetail" >
                    <h3 className="title" >{_post.title}</h3>
                    <div className="date">{_post.publishedDate}</div>
                    <p className="bref">{_post.brief}</p>
                    <div className="extended">
                        <p></p>
                        <p>
                          <img src="https://res.cloudinary.com/dgdhoenf1/image/upload/c_scale,w_720/v1660818803/gazebo/default_gzclient_camera_1_-2022-08-18T18_28_16.807010.jpg"  />                            
                        </p>
                        
                        <p className='cl'></p>
                        <h3 className='code'>本次的代码：<a href='https://github.com/mrzhuzhe/Gurren' target="_blank">https://github.com/mrzhuzhe/Gurren</a></h3>
                        <p></p>
                        <h3>1. 简介：</h3>
                        <p>需要开发一个实际操作工业机器人的程序，并且在实际机器人测试计通过。</p>
                        <p>业务场景为：碳纤维模具的表面打磨</p>
                        
                        <ul>
                          <li>1. 模具大多为形状有凹凸圆环, 也有少部分有不规则形状</li>
                          <li>2. 碳纤维比较脆，硬度和金属相当，需要打磨上面突起的毛刺和污染物</li>
                        </ul>
                       
                        <p>工具为：</p>
           
                        <ul>
                          <li>1. UR5机器人</li>
                          <li>2. 末端执行器（打磨头/吸盘等</li>
                          <li>3. 相机，力传感器</li>
                        </ul>
 
                        <p>所需要的功能点：</p>
                        
                        <ul>
                          <li>1. 根据模具CAD生成路径点</li>
                          <li>2. 用 ROS 系列软件： Moveit 来做IK（逆运动学）规划，  Gazebo 来做场景模拟</li>
                          <li>3. 归纳测试中出现的问题，保证交付后健壮性和可维护性</li>
                        </ul>  
                                         
                        <p></p>

                        <h3>2. 演示</h3>                        
                       
                        <img src="https://res.cloudinary.com/dgdhoenf1/image/upload/c_scale,w_360/v1660819151/gazebo/photo_2022-08-18_18-38-21.jpg"/>                                               
                        <p>UR5 演示：</p>
                        <p>TODO 此处添加视频演示</p>

                        <p>Gazebo 演示：</p>
                        <p>TODO 此处添加视频演示</p>
                        
                        <p></p> 

                        <h3>3. 相关工作：</h3>
                        <ul>
                          <li>1. 2d凸包算法可以参考算法导论</li>
                          <li>2. 3d求凸包算法需要用到大量mesh几何形状的计算，目前暂定是taichi HPC框架来开发</li>
                          <li>3. ROS（版本是Noetic） 是一个消息队列，其中每个node为可以为机器人，摄像头等，采用订阅者模式
                            <p>ROS 核心概念文档：<a href='http://wiki.ros.org/ROS/Tutorials' target="_blank">http://wiki.ros.org/ROS/Tutorials</a></p>          
                            <p>因此UR这样的硬件开发商接入ROS只需根据ROS的消息规则匹配自己软件的输入输出即可了</p>
                            <p>Universal robot 模拟器和机器人驱动： <a href='https://github.com/UniversalRobots/Universal_Robots_ROS_Driver' target="_blank">https://github.com/UniversalRobots/Universal_Robots_ROS_Driver</a></p>
                          </li>
                          <li>4. Moveit是一个逆运动学框架（版本是Moveit 1 Noetic） 核心概念文档： <a href='https://ros-planning.github.io/moveit_tutorials/' target="_blank">https://ros-planning.github.io/moveit_tutorials/</a>
                            <p>逆运动学是指指定目标和机器人当前状态，这个库会根据机器人形状和环境等"constraint"限制条件规划一个运行路径, Moveit默认使用的是OMPL这个项目： <a href='https://ompl.kavrakilab.org/' target="_blank">https://ompl.kavrakilab.org/</a></p>
                            <p>求解过程是数值方法求解，这部分整体综述我是看的 Tedrake 这个老师的视频 <a href='https://www.youtube.com/channel/UChfUOAhz7ynELF-s_1LPpWg' target="_blank">https://www.youtube.com/channel/UChfUOAhz7ynELF-s_1LPpWg</a></p>
                          </li>
                          <li>
                            5. gazebo (Version 11) 是一个物理模拟工具 其中刚体物理模拟用的是bullet这个库
                            <p>核心概念：<a href='https://classic.gazebosim.org/tutorials' target="_blank">https://classic.gazebosim.org/tutorials</a></p>
                            <p>其中和ROS交互的重点部分：<a href='https://classic.gazebosim.org/tutorials?cat=connect_ros' target="_blank">https://classic.gazebosim.org/tutorials?cat=connect_ros</a></p>
                          </li>
                          <li>
                            6. ROS文档还算齐全，不过我在开发过程中还是在 <a href='https://answers.ros.org/questions/' target="_blank">https://answers.ros.org/questions/</a>
                            和 <a href='https://discourse.ros.org' target="_blank">https://discourse.ros.org</a> 上可以提问
                          </li>                        
                        </ul>
                        
                                                                    
                        <h3>4. 方案</h3>
                        <p>几何形状求凸包：</p>
                        <p></p>                                            
                        <ul>
                          <li>
                            1. CAD生成路径，目前方案是用凸包算法对3D求凸包，再简单根据业务过滤出等高线
                            <p>这是3d mesh求法向量（TODO没有求3d凸包，后面会补上）， 其中红色为mesh三角的中心点 蓝色点为垂直法相量</p>
                            <p>
                              <img src="https://res.cloudinary.com/dgdhoenf1/image/upload/c_scale,w_480/v1660819151/gazebo/Screenshot_from_2022-08-18_20-17-48.png"/>&emsp;<br></br>
                              <img src="https://res.cloudinary.com/dgdhoenf1/image/upload/c_scale,w_480/v1660819151/gazebo/Screenshot_from_2022-08-18_20-19-57.png"/>
                            </p>
                          </li>
                          <li>
                            2. 如果模型完全均匀可以使用2D横截面，如果只取一侧可以用1D凸包
                            <p>2d维凸包实现：<a href='https://github.com/mrzhuzhe/vanilla/tree/master/geometry' target="_blank">https://github.com/mrzhuzhe/vanilla/tree/master/geometry</a></p>
                            <p>1d凸包实现：<a href='https://github.com/mrzhuzhe/Patrick/tree/main/geo/contour' target="_blank">https://github.com/mrzhuzhe/Patrick/tree/main/geo/contour</a></p>
                            <p>效果如下:</p>
                            <p>
                              <img src="https://res.cloudinary.com/dgdhoenf1/image/upload/c_scale,w_480/v1660826564/gazebo/Figure_1.png" className='inline_block'/>&emsp;<br></br>
                              <img src="https://res.cloudinary.com/dgdhoenf1/image/upload/c_scale,w_480/v1660826564/gazebo/Figure_2.png" className='inline_block'/>&emsp;<br></br>
                              <img src="https://res.cloudinary.com/dgdhoenf1/image/upload/c_scale,w_480/v1660826564/gazebo/Figure_3.png" className='inline_block'/>
                            </p>
                          </li>
                        </ul>
                        <p>可维护性和健壮性</p>
                        <p>ROS和moveit方面:</p>
                        <ul>
                          <li>项目目前没有做pybind</li>
                          <li>打包工具catkin类似于cmake</li>
                          <li>后面会重点再深入研究OMPL</li>
                        </ul> 
                        <p>业务方面:</p>
                        <ul>
                          <li>现在准备马上安装上执行器做测试</li>
                          <li>需要有一个模具限位器，把模具固定在一个特定位置</li>
                          <li>需要反复测试迭代改进工艺问题</li>
                        </ul> 
                        <p></p>

                        <h3>5. 实验：</h3>
                        <p>实验设计：</p>
                        <p>实验一：实体机器人运行沿着模具法相量等高线运行一圈并复位, 要求跟gazebo中模拟尽可能一致，机器人执行器上要有一个摄像头</p>
                        <p><img src="https://res.cloudinary.com/dgdhoenf1/image/upload/c_scale,w_720/v1660819151/gazebo/photo_2022-08-18_18-38-21_2.jpg" /> </p>                      
                        <p>实验一视频：TODO</p>                        
                        <p>实验一结论：基本符合预期，摄像头gazebo中模拟摄像头和实际摄像头看到的画面基本一致</p>
                        <p></p>                                      
                        
                        <h3>6. 结论：</h3>
                        <p>未解问题TODO</p>
                        <p>思考TODO</p>
                        <p>下一步计划TODO</p>           

                    </div>
                    
                    <KeywordsTags tagList={ _post.categories } />
                    
                </div>
                
              <div className="DisqusComp">      
                <DisqusBox />
              </div>
            
            </div>  
        </div>

        <Footer />

    </div>
}


export default post