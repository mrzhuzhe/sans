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
                          <li>1. 首先轨迹点应该是一个 catesian space 的描述 而非 joint space 描述<br></br> <strong>注</strong>： 机器人关节电机的位置 -&gt; joint space -&gt; cartesian space 位置</li>
                          <li>2. 根据机器人学导论《introduction to robotics》 - craig 轨迹点之间的运动应该是用forward kinematic dynamic 和 inverse kinematic dynamic 来求解是非常核心的部分</li>   
                          <li>3. 这块如果要自定义要自定义ros_control，调用ros control loop 的钩子 start update shutup</li>
                          <li>4. 因此ros control 才能对外部的信号(ros topic)做<strong>实时响应(Feedback)</strong>的逻辑，ur5的控制频率是125hz ur5e 1000hz</li>                                               
                        </ul>
                        <p>所以：决定尝试自定义ros controller 做一个最小实现的baseline</p>
                        <p></p>

                        <h3>2. 演示</h3>
                        <p>TODO 此处添加视频：</p>
                        <ul>
                          <li>1. 注册ros control</li>
                          <li>2. 位置控制</li>
                          <li>3. 速度控制</li>
                          <li>4. 实现一个简单业务逻辑</li>
                                                                           
                        </ul>

                        <p></p>

                        <h3>3. 相关工作</h3>
                        <p>《introduction to robotics》 - craig </p>
                        <p>3.1 背景知识：</p>
                        <ul>
                          <li>0. joint space 和 cartesien space</li>
                          <li>1. Eigen</li>
                          <li>2. 运动学 逆运动学</li> 
                          <li>3. urdf </li>
                          <li>4. 实时反馈控制</li>
                          <li>5. ros gazebo 相关</li>                        
                        </ul>

                        <p>3.2 整体架构：</p>
                        <ul>
                          <li>1. firmware</li>
                          <li>2. ros controller joint cmmand interface ( joint state )</li>
                          <li>3. kdl getHandles</li>
                          <li>4. kdl solver</li>
                          <li>5. Business logic </li>
                        </ul>

                        <p>3.3 参考的代码库：</p>
                        
                        <ul>
                          <li>1. ros_control</li>
                          <li>2. ros_controllers</li>
                          <li>3. FCI</li>
                          <li>4. ur compliant control</li>  
                          <li>5. ororos kdl</li>
                          <li>6. ur_cartesian</li>
                          <li>7. moveit</li>                              
                        </ul>

                        <p></p>
                        
                        <h3>4. 逐步实现</h3>
                        <p></p>
                        <ul>
                          <li></li>                          
                        </ul>

                        <p></p>

                        <h3>5. 讨论</h3>
                        <p>遇到的问题</p>
                        <ul>
                          <li></li>                          
                        </ul>

                        <p></p>

                        <h3>6. 后续工作</h3>

                        <p>伺服电机</p>
                        <ul>
                          <li></li>                          
                        </ul>

                        <p>重写KDL</p>
                        <ul>
                          <li></li>                          
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