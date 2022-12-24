import DisqusBox from '../../components/disqus'
import Header from '../../components/header'
import Footer from '../../components/footer'
import KeywordsTags from '../../components/keywordsTags'

export async function getStaticProps() {
    
  const data = {
      data: {
        Post: {
                  id: "ros_controller",
                  title: "【Sim2real】02 自定义ROS_controller实现反馈控制",
                  publishedDate: "2022-12-23",
                  brief: "自定义ROS_controller实现反馈控制",
                  categories: [{ name: "ros" }, { name: "robotic" }]  
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
                        <h3 className="code">代码：<a href='https://github.com/mrzhuzhe/Gurren' target="_blank">https://github.com/mrzhuzhe/Gurren</a></h3>
                        
                    
                        <h3>1. 概述</h3>
                        <p>之前做了<a href='/post/Sim2real_foundation' target="_blank">ROS moveit和Gazebo的demo</a>，可以通过moveit生成末端执行器的到目标位置joint pose 或 cartesian pose的<strong className="red">移动轨迹</strong></p>
                        <p>Moveit 虽然可以考虑 (1)环境中的障碍物 (2)机器人本体 作路径规划，但是发现 moveit 的<strong className="red">最小单元</strong>是轨迹点</p>
                        <p>也就是说： moveit 无法自定义轨迹之间两点的行为</p> 
                        <p>因此：</p>
                        <ul>
                          <li>1. 首先轨迹点应该是一个 catesian space 的描述 而非 joint space 描述（[TODO]此处有歧义）<br></br> <strong>注</strong>： 机器人关节电机的位置 -&gt; joint space -&gt; cartesian space 位置
                          <br></br><img src="https://res.cloudinary.com/dgdhoenf1/image/upload/v1671853123/ros_control/01.jpg" width="360" /></li>
                          <li>2. 根据机器人学导论《introduction to robotics》 - craig 轨迹点之间的运动应该是用forward/inverse kinematic dynamic 来求解，是非常核心的部分</li>   
                          <li>3. 如果要自定义机器人实时的行为就得自定义ros_control，需要调用ros control loop 的钩子 start/update/shutup 等</li>
                          <li>4. ros control 才能对外部的信号(ros topic)做<strong>实时响应(Feedback)</strong>的逻辑
                          <br></br>ur5的控制频率是125hz ur5e 1000hz</li>                                               
                        </ul>
                        <p>所以：决定尝试自定义ros controller 做一个最小实现的baseline</p>
                        <p></p>

                        <h3>2. 演示</h3>
                        <p>[TODO] 此处添加视频：</p>
                        <ul>
                          <li>1. 注册ros control</li>
                          <li>2. 位置控制 Joint to cartesian 和 cartesian to joint</li>
                          <li>3. 速度控制</li>
                          <li>4. 实现一个简单业务逻辑</li>
                                                                           
                        </ul>

                        <p></p>

                        <h3>3. 相关工作</h3>
                        <p>参考书：《 Introduction to robotics 》 - craig 中文名：《机器人学导论》</p>
                        <p>3.1 背景知识：</p>
                        <ul>
                          <li>
                            0. joint space 和 cartesian space
                            <br></br>
                            这俩个都是机器人状态的表示，其中cartesian指机器人末端的位置pose和朝向orientation
                            <br></br>
                            joint space 指机器人关节扭动的角度
                            <br></br>
                            一般我们会希望表示为机器人末端以一个速度移动，或者移动多少距离，cartesian space 描述更符合人的直觉
                            <br></br>&nbsp;
                          </li>
                          <li>
                            1. Eigen <a hre="https://eigen.tuxfamily.org/">https://eigen.tuxfamily.org/</a> 
                            <br></br> Cpp 矩阵计算库， 用来创建dense或者稀疏矩阵，做各种矩阵相乘，小矩阵求解，求伪逆等
                            <br></br>&nbsp;
                          </li>
                          <li>
                            2. 运动学/逆运动学
                            <br></br>
                            <img src="https://res.cloudinary.com/dgdhoenf1/image/upload/v1671853123/ros_control/02.jpg" width="480"></img>
                            <br></br> 
                            总的来说：就是如果已知机器人的 a/aplha/d： 关节位置/关节长度/关节偏置 就能根据机器人的安装位置逐关节的求解下一个关节的位置，也就是可以知道末端的位置，如上图二维的例子
                            <br></br>
                            <strong>逆运动学</strong>：如果已知机器人“当前”和”目标“两个pose：可以是joint pose 也可以是cartesian pose，可以求这两个pose之间如果通过扭动机器人的关节来运动到目标位置
                            <br></br> 
                            此处可以参见《机器人学导论》第二章第三章
                            <br></br>&nbsp;
                          </li> 
                          <li>
                            3. URDF
                            <br></br>
                            机器人的模型定义：
                            <br/>
                            包含:
                            <br></br>
                            关节位置/长度/偏置 信息来计算运动学
                            <br></br>
                            关节重量，pid增益等
                            <br></br>
                            关节的转动限制条件，极限速度，极限角度等
                            <br></br>&nbsp;
                          </li>
                          <li>4. 实时反馈控制 和 <strong className='red'>Control loop</strong>
                            <br></br>
                            Control loop 是 ros control 中约定的一个机器人控制的“生命周期钩子”
                            <br></br>
                            例如：ur5 的频率是125hz，每0.01毫秒调用此函数钩子
                            <br></br>
                            机器人可以在这个函数里获取到机器人当前的关节状态：速度位置等
                            <br></br>
                            在钩子里也可以把外部的信息，如末端力sensor的信息wrench通过ros topic传进来
                            <br></br>
                            所以如果要实时响应外部信号 就得在control loop 中写业务逻辑                                                  
                            <br></br>&nbsp;
                          </li>
                          <li>
                            5. ros 整体架构 和 gazebo 搭建仿真环境相关
                            <br></br>
                            这块可以看上一篇博客  <a href='/post/Sim2real_foundation' target="_blank">ROS moveit和Gazebo的demo</a>
                          </li>                        
                        </ul>

                        <p>3.2 整体架构：</p>
                        <p>[TODO] 此处需要完善，补充图</p>
                        <ul>
                          <li>1. firmware
                            <br/>
                            revolute joint: 伺服电机和减速机
                          </li>
                          <li>2. ros controller joint cmmand interface ( joint state )
                            <br/>
                            ros 提供的硬件管理和命令“协议”的实现
                          </li>
                          <li>3. kdl getHandles
                            <br/>
                            根据预先设置的机器人urdf初始化机器人joint space 和 cartesian space 转换关系
                            <br/>
                            并注册对机器人关节硬件的控制权
                          </li>
                          <li>4. kdl forward/inverse solver
                            <br></br>
                            在control loop 中调用求解器得到末端执行器运动，所需每个关节转动角度的方案，产生姿态变幻的运动
                          </li>
                          <li>5. Business logic 
                            <br></br>
                            自定义的逻辑，例如力控，导纳，阻抗控制等
                          </li>
                        </ul>

                        <p>3.3 参考的代码库：</p>
                        
                        <ul>
                          <li>1. ros_control
                            <br></br>
                            <a href="https://github.com/ros-controls/ros_control" target="_blank">https://github.com/ros-controls/ros_control</a>
                            <br></br>
                            ros 控制器协议的核心概念
                          </li>
                          <li>2. ros_controllers
                            <br></br>
                            <a href="https://github.com/ros-controls/ros_controllers" target="_blank">https://github.com/ros-controls/ros_controllers</a>
                            <br></br>
                            基于ros control 自定义的Joint space转换控制器 ，说实话这个库面向对象封装的非常的让人迷惑，如果你要做的cartesian控制器不用看这个库
                          </li>
                          <li>3. FCI franka_ros 和 libfranka
                            <br></br>
                            <a href="https://github.com/frankaemika/franka_ros" target="_blank">https://github.com/frankaemika/franka_ros</a>
                            <br></br>
                            franka 自己实现的一系列控制器，需要注意的是franka 支持effortjointcontroller，就是关节扭矩控制，但是ur是不支持关节扭矩控制的
                          </li>
                          <li>4. ur compliant control
                            <br></br>
                            <a href="https://github.com/MingshanHe/Compliant-Control-and-Application" target="_blank">https://github.com/MingshanHe/Compliant-Control-and-Application</a>
                            <br></br>
                            <strong className='red'>特别鸣谢</strong>我的实现大部分都基于这个库，按自己理解做了一些必要的简化
                          </li>
                          <li>5. kdl_parser
                            <br></br>
                            <a href="https://github.com/ros/kdl_parser" target="_blank">https://github.com/ros/kdl_parser</a>
                            <br></br>
                            用来解析urdf获得机器人运动学参数a/alpha/d等，很多库都依赖于这个
                          </li>  
                          <li>6. orocos kdl
                            <br></br>
                            <a href="https://github.com/orocos/orocos_kinematics_dynamics" target="_blank">https://github.com/orocos/orocos_kinematics_dynamics</a>
                            <br></br>
                            <strong>运动学求解器</strong> 这个库<strong className="red">极其</strong>重要，很多逆运动学的求解都依赖于它，但是文档确非常糟糕，我是慢慢看它的代码才了解了一点点
                          </li>
                          <li>7. FZI cartesian controller
                            <br></br>
                            <a href="https://github.com/fzi-forschungszentrum-informatik/cartesian_controllers" target="_blank">https://github.com/fzi-forschungszentrum-informatik/cartesian_controllers</a>
                            <br></br>
                            FZI 的开发者改进的运动学求解器，相当于自己实现了kdl的部分功能
                          </li>
                          <li>8. moveit
                            <br></br>
                            <a href="https://github.com/ros-planning/moveit" target="_blank">https://github.com/ros-planning/moveit</a>
                            <br></br>
                            其中求解逆运动学的部分基于orocos kdl但是也做了一些自己的修改
                          </li>                          
                        </ul>

                        <p></p>
                        
                        <h3>4. 逐步实现</h3>
                        <p></p>
                        <ul>
                          <li>rqt
                            <br></br>
                            <img src="https://res.cloudinary.com/dgdhoenf1/image/upload/v1671862472/ros_control/03.jpg" width="960"></img>
                            <br></br>
                            rqt可以方便的调试：可以publish和和查看topic
                            <br></br>
                            注意上图打勾的两个地方，左侧是publish topic 右侧是查看topic
                            <br></br> &nbsp;
                          </li>
                          <li>注册控制器plugin
                            <div className='code'>                            
                              // only test control hook Code: /my_controller/test_controller <br/> 
                              roslaunch ur_gazebo ur5e_bringup.launch controllers:=test_controller
                            </div>
                            <br></br>
                            这块主要参考了ros_control本身的totoial  
                            <br></br> &nbsp;
                          </li> 
                          <li>位置/和速度求解
                            <div className='code'>                            
                              // cartesian position Code: /my_controller/cartesian_controller <br/>
                              roslaunch ur_gazebo ur5e_bringup.launch controllers:=cartesian_controller
                            </div>
                            <br></br>
                            这块需要用到下面这些kenimatic chain 速度/位置求解器
                            <div className='code'>
                              // KDL definition: /my_controller/cartesian_controller/include/cartesian_controller/kdl_base.h <br/>

                              KDL::ChainFkSolverVel; <br/>

                              KDL::ChainFkSolverPos; <br/> 
                              
                              KDL::ChainIkSolverVel; <br/>
                              
                              KDL::ChainIkSolverPos; <br/>
                           
                            </div>
                            这块<a href="https://www.orocos.org/wiki/orocos/kdl-wiki.html" target="_blank">kdl官方文档</a>实在是年久失修，我一直找不到一个简单实现，
                            <br></br>
                            直到被人推荐了<a href="https://github.com/MingshanHe/Compliant-Control-and-Application" target="_blank">https://github.com/MingshanHe/Compliant-Control-and-Application</a>
                            <br></br>
                            参照他调用kdl的例子结合kdl文档和代码才勉强把kdl用起来
                            <br/> 
                            <br></br> &nbsp;
                          </li> 
                          <li>                            
                            速度求解
                            <div className='code'>                            
                              // caertesian velocity controller Code: /my_controller/cartesian_velocity_controller  <br/>
                              roslaunch ur_gazebo ur5e_bringup.launch controllers:=cartesian_velocity_controller
                            </div>
                            <br></br>
                            和位置一样速度也可以被分解为Jacobian，这是最符合人类直观感觉的一种控制方式
                            <br></br>
                            但是这个模式由于关节的速度限制，奇点更多
                            <br></br>
                            <br></br> &nbsp;
                          </li> 
                          <li>响应外部topic做自己的业务逻辑
                            <div className='code'>
                              // run to a position with static cartesian velocity   Code: /my_controller/cartesian_velocity_position_controller  <br/>
                              roslaunch ur_gazebo ur5e_bringup.launch controllers:=cartesian_velocity_position_controller
                            </div>
                            <br></br>
                            力控/阻抗控制/实时机器学习控制等  
                            <br></br> &nbsp;
                          </li>                          
                        </ul>

                        <p></p>

                        <h3>5. 讨论</h3>
                        <p>遇到的问题</p>
                        <ul>
                          <li>全局蓝图不清，知识点杂乱</li>
                          <li>[TODO]</li>                    
                        </ul>

                        <p></p>

                        <h3>6. 后续工作</h3>

                        <p>伺服电机</p>
                        <ul>
                          <li>算法误差</li>
                          <li>伺服电机误差</li>
                          <li>自定义硬件方案</li>                          
                        </ul>

                        <p><strong>重写KDL</strong></p>
                        <p>KDL的替代方案</p>
                        <ul>
                          <li>FZI cartesian controller </li> 
                          <li>IKfast</li>
                          <li>trackIK</li>                       
                        </ul>

                        <p></p>

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