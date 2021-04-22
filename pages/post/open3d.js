import DisqusBox from '../../components/disqus'

export async function getStaticProps() {
    
    const data = {
        data: {
          Post: {
                    id: "open3d.html",
                    title: "open3d实践",
                    publishedDate: "2021-03-28",
                    brief: "open3d中的一些实践，主要是将真实世界中环境通过intel realsense扫描重建成3d网格的相关内容",
                    categories: [{name: "open3d"}]  
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
                <div className="post postdetail" >
                    <h3>{_post.title}</h3>
                    <div className="date">{_post.publishedDate}</div>
                    <p className="bref">{_post.brief}</p>
                    <div className="extended">
                      <h3>概述</h3>
                        - open3d官网：<span class="red">http://www.open3d.org/</span><br />- 实践代码：<span class="red">https://github.com/mrzhuzhe/yunru/blob/main/realsense/</span><br />
                        <br />
                        最近实践了open3d 中的基础功能和3d环境重建相关功能，可以扫描场景重建成3d图像，其中主要的 reconstruction代码基本上复制于open3d官网的对应例子，除了numpy存在一个在新版本mac电脑M1下的不兼容的问题（重装兼容的版本即可），基本上按照官网一步步复现就没有问题。<br />
                        <br />
                        1. 所用设备 <span class="red">intel realsense D415</span> 最好安置在云台上，相机抖动会对结果造成极大的影响<br />2. 依赖 <span class="red">open3d</span> <span class="red">opencv</span> （realsense设备所需的<span class="red">pyrealsense2</span>其实并不没有用到）<br />3. 【注意】：anaconda自带的 np 在 m1 下运行 <span class="red">np.dot</span> <span class="red">np.inv</span> 会报错 \t<span class="red">Intel MKL ERROR: Parameter 8 was incorrect on entry to DGEMM</span>  如果需要此错误，卸载np用pip或者conda重装即可<br />4. 我这边补充了一些上下游所需的工具，例如摄像头录像，预览视频，预览帧，裁剪点云等小工具用于调试 在 <span class="red">https://github.com/mrzhuzhe/yunru/tree/main/realsense/manual</span>文件夹下<br />
                        <br /><br />
                        <br />
                        <h3>基本概念</h3>
                        1. <strong>点云</strong>：一般声纳或激光传感器可以扫描到三维物体的深度，这些深度信息会被离散化 记录成3d空间中的坐标点，这些点的集合就是点云<br />
                        2. <strong>深度帧和颜色帧</strong>：传感器不仅会扫描深度（深度帧）还会产生彩色照片（颜色帧），用相机内置的软件进行帧对齐后会生成一个“pair”配对<br />
                        3. <strong>姿态合并</strong> 和 姿态轨迹：一般情况下扫描会持续好几秒，在扫描过程中会缓缓的转动摄像头获取更广角的信息，这个过程中相邻帧会依据“重叠区域”来合并，合并时，会计算点云之间相对的旋转角度，连续很多角度产生的轨迹，就是“姿态轨迹“<br />
                        4. <strong>环境重建</strong>： 如果要重建一个很大的场景，就需要连续采集很多帧的点云，计算他们之间的姿态轨迹来合并这些点云，当然合并点云时姿态轨迹的计算可能会不太准确，会产生积累的误差，如何应对这种误差，是最大的挑战。<br />
                        <br />
                        <br />
                        <h3>整体结构</h3>
                        主要分为五个步骤<br />
                        <br />
                        1. 临近点云合并： 将非常接近的帧计算姿态合并在一起，这里假设了临近帧的变化率非常小，会把临近帧合并成 “fragment”<br />
                        < img alt="第一步临近帧合并" src="https://res.cloudinary.com/dgdhoenf1/image/upload/c_scale,w_1000/v1616920120/blog/s01.png" / ><br />
                        <strong>例如</strong>：这是一秒十五帧的合并，可以看到临近帧变化小 <br />
                        < img alt="临近点云合并" src="https://res.cloudinary.com/dgdhoenf1/image/upload/c_scale,w_800/v1616920050/blog/%E5%8F%AF%E8%A7%86%E5%8C%96%E5%90%88%E5%B9%B6%E5%90%8E.png" / ><br />
                        2. 姿态合并：把相邻的 “fagment” 计算相互的姿态变化合并在一起，这个和第一步对比可能是相当于一个非线性的整流，可能可以减少误差<br />
                        < img alt="第二步姿态合并" src="https://res.cloudinary.com/dgdhoenf1/image/upload/c_scale,w_1000/v1616920120/blog/s02.png" / ><br />
                        <strong>例如</strong>：这里不同颜色的区域就是相邻的“fragment”<br />
                        < img alt="姿态合并" src="https://res.cloudinary.com/dgdhoenf1/image/upload/c_scale,w_800/v1616920064/blog/%E5%90%88%E5%B9%B6.png" / ><br />
                        3. 第三步颜色帧对应精调：用彩色帧校对之前合并，把离群点删除<br />
                        < img alt="第三步颜色帧对应精调" src="https://res.cloudinary.com/dgdhoenf1/image/upload/c_scale,w_1000/v1616920119/blog/s03.png" / ><br />
                        4. 第四步转化为网格： 计算法向量由点云转化转化为多面体的3dmesh<br />
                        < img alt="第四步转化为网格" src="https://res.cloudinary.com/dgdhoenf1/image/upload/c_scale,w_500/v1616920120/blog/s04.png" / ><br />
                        <br />
                        <br />
                        <h3>实验</h3>
                        暂时没有测精度，只是粗略的复现了，官网上论文只看了一小部分，目前主要的贡献是实现过程中做了一些辅助小工具，如下：<br />
                        <code>
                            <br />#\t可视化点云<br />PLYvisualizer.py<br /># 录制视频，用于重建
                            <br />camera.py<br /># 录制视频所需的配置<br />camera_config.json
                            <br /># 裁剪单帧，方便调试<br />crop.py
                            <br /># 分离点和平面，方便截取平面上的物体<br />pt2pl.py
                            <br /># 读取录制好的视频 bag格式<br />readbag.py
                            <br /># 读取录制好的帧，bag解压出来的frame文件夹下的深度帧和彩色帧<br />readframe.py<br />
                        </code>
                            <br />
                        <br />
                        <br />
                        <h3>遇到的问题</h3>
                        1. 主要问题就是m1的mac下conda自带的numpy不兼容，一开始以为是矩阵是奇异矩阵无法计算逆，网上找了好久都没有找到原因，最后终于定位到是numpy的问题，猜想最新版numpy可能会已经解决了这个问题，试了一下重装numpy果然就好了。<br />
                        2. 相机的抖动或者横向旋转速度不均匀，对精度影响极大<br />
                        <br />
                        <br />
                        <h3>总结展望</h3>
                        还需看官网上的论文，后续要继续尝试open3dml，另外open3d发展极快，后面可以给他们提中文翻译的pr等参与一下，后面也可以结合kaggle的3d相关的机器学习任务做个实践。<br />
                        <br />
                        &nbsp;
                    </div>
                    <div className="tags">{ _post.categories.map((item, index) => (
                        <span key={index}> { item.name} </span>
                    ))}</div>
                </div>
                
              <div className="DisqusComp">      
                <DisqusBox />
              </div>
            
            </div>  
        </div>
        <footer className="w3-container w3-padding-64 w3-light-grey w3-center w3-large">   
        <p>2021 No right recived</p>
        <p className="small">太陽系を抜け出して平行線で交わろう</p>
        </footer>
    </div>
}


export default post