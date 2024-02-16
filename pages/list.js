export async function getStaticProps() {
    
    const data = {
        data: {
            allPosts: [
                {
                    id: "solver",
                    title: "【HPC 06】数值求解器",
                    publishedDate: "2024-1-15",
                    brief: "矩阵直接求解, 迭代求解, lu分解求解, lu分解求det, householder过程求相似矩阵, qr分解求特征值",
                    categories: [{name: "HPC" }, { name: "linear algebra"}]  
                },
                {
                    id: "gemm",
                    title: "【HPC 05】CPU 和 CUDA 的 GEMM 实现",
                    publishedDate: "2023-5-12",
                    brief: "CPU 和 GPU 的 GEMM 实现",
                    categories: [{name: "HPC" }]  
                },
                {
                    id: "cudaintro",
                    title: "【HPC 04】用Cuda实现和调试一些常见算法",
                    publishedDate: "2023-4-1",
                    brief: "高性能计算的整体蓝图，Cuda openmp SIMD指令 TVM 和 高性能计算",
                    categories: [{name: "高性能计算" }]  
                },
                {
                    id: "euler",
                    title: "【HPC 02】欧拉视角的流体模拟",
                    publishedDate: "2023-2-18",
                    brief: "欧拉视角下的纯网格烟雾模拟，pic网格和粒子混合法，mpm混合粒子有限元法",
                    categories: [{name: "CFD" }] 
                },
                {
                    id: "ros_controller",
                    title: "【Sim2real】02 自定义ROS_controller实现反馈控制",
                    publishedDate: "2022-12-23",
                    brief: "自定义ROS_controller实现反馈控制",
                    categories: [{ name: "ros" }, { name: "robotic" }]  
                },
                {
                    id: "positionbasedfluid",
                    title: "【HPC】01 Position base fluid & 程序员角度所理解的流体力学",
                    publishedDate: "2022-11-04",
                    brief: "Position based fluid & 程序员角度所理解的流体力学",
                    categories: [{name: "HPC" }, {name: "CFD" }]  
                },
                {
                    id: "Sim2real_foundation",
                    title: "【Sim2real】01：ROS ， Moveit ， Gazebo 和凸包",
                    publishedDate: "2022-08-18",
                    brief: "用UR5机器人开发实际工业加工的项目，Sim2Real的基础项目搭建",
                    categories: [{name: "Robotic" }]  
                },{
                    id: "impala",
                    title: "Impala多线程强化学习总结",
                    publishedDate: "2022-03-19",
                    brief: "在visdoom环境中利用多线程算法impala加速强化学习，用有限的家用机器资源训练出实战级别的rl agent",
                    categories: [{name: "reinforcement-learning" }]  
                },
                {
                    id: "tfjs-speech",
                    title: "online speech recognize",
                    publishedDate: "2022-3-3",
                    brief: "a simple demo of tensorflowjs speech recognizer",
                    categories: [{name: "tensorflowjs" }]  
                },
                {
                    id: "covid19",
                    title: "SIIM covid19比赛总结",
                    publishedDate: "2021-08-09",
                    brief: "新冠肺炎病灶识别和诊断比赛总结",
                    categories: [{name: "kaggle", name: "cv"}]  
                },
                {
                    id: "BMS",
                    title: "BMS分子结构图像翻译比赛总结",
                    publishedDate: "2021-06-24",
                    brief: "Bristol-Myers Squibb – Molecular Translation，分子结构图像转文字比赛总结",
                    categories: [{name: "kaggle", name: "vit", name: "transformer" }]  
                },
                {
                    id: "kidney",
                    title: "kaggle hack the kidney 比赛总结",
                    publishedDate: "2021-05-11",
                    brief: "实验记录，未实现的记录，获胜方法，总结，后面的方向",
                    categories: [{name: "kaggle"}]  
                },
                {
                    id: "trojan",
                    title: "Trojan部署中遇到的进程权限问题",
                    publishedDate: "2021-03-26",
                    brief: "最近把站点的代理从v2ray 换成trojan ，配置了nginx，代理证书等，但是在配置证书的访问权限时， 遇到了一个子进程权限的问题",
                    categories: [{name: "代理"}]  
                },
                {
                    id: "open3d",
                    title: "open3d实践",
                    publishedDate: "2021-03-28",
                    brief: "open3d中的一些实践，主要是将真实世界中环境通过intel realsense扫描重建成3d网格的相关内容",
                    categories: [{name: "open3d"}]  
                }
            ]
        }        
    }
    // Pass data to the page via props
    return { props: data }
}

function list({ data }) {
    return <div>
        <div className="w3-content" style={{ maxWidth:1500 + "px" }}>
            <header className="w3-panel w3-center w3-opacity" style={{ padding: "128px 16px" }}>
            <h1 className="w3-xlarge">Starofus</h1>
            <h1>你好呀，我是Sans</h1>    
            <div className="w3-padding-32">
                <div className="w3-bar w3-border">
                <a href="/index" className="w3-bar-item w3-button">Home</a>
                <a href="/list" className="w3-bar-item w3-button w3-light-grey">Works</a>
                <a href="https://github.com/mrzhuzhe" className="w3-bar-item w3-button">Github</a>
                <a href="/contact" className="w3-bar-item w3-button">Contact</a>
                </div>
            </div>
            </header>
            { /* Context */ }
            <div className="w3-row-padding" >
                <div className="postlist">
                    {  data.allPosts.map((e, i) => (
                        <a href={"/post/"+ e.id} key={i}>
                            <div className="item post" >
                                <h3>{e.title}</h3>
                                <div className="date">{e.publishedDate}</div>
                                <p className="bref">{e.brief}</p>
                                <div className="tags">{ e.categories.map((item, index) => (
                                    <span key={index}> { item.name} </span>
                                ))}</div>
                            </div>
                        </a>                        
                    ))  }
                </div>
            </div>  
        </div>
        <footer className="w3-container w3-padding-64 w3-light-grey w3-center w3-large">   
        <p>2021 to future, No right recived</p>
        <p className="small">太陽系を抜け出して平行線で交わろう</p>
        </footer>
    </div>
}

export default list