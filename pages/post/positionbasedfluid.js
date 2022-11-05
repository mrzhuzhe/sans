import DisqusBox from '../../components/disqus'
import Header from '../../components/header'
import Footer from '../../components/footer'
import KeywordsTags from '../../components/keywordsTags'

export async function getStaticProps() {
    
  const data = {
      data: {
        Post: {
            id: "positionbasedfluid",
            title: "【HPC】01 Position base fluid & 程序员角度所理解的流体力学",
            publishedDate: "0-11-04",
            brief: "Position based fluid & 程序员角度所理解的流体力学",
            categories: [{name: "HPC" }, {name: "CFD" }]  
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
                      <h3 className="code">代码：<a href='https://github.com/mrzhuzhe/taichi_dem' target="_blank">https://github.com/mrzhuzhe/taichi_dem</a></h3>
                      <h3>1. 概述</h3>
                      <p>最近花了很多时间学习了流体力学相关的知识</p>
                      <ul>
                        <li>1. 因为做机器人的项目中结构设计和仿真需要用到柔性和形变，会用到大量连续介质力学相关的知识</li>
                        <li>2. 经过了解发现流体力学所在的CAE： Computer aided engineering 计算机辅助工程化这个领域，
                          <br/> 需要三块能力：
                          <br/> （1）高性能计算: mpi 和 cuda编程 
                          <br/> （2）物理: 流体力学等 
                          <br/> （3）数值方法 ：梯度法 和 静态迭代法
                          <br />其实整体框架和机器学习大部分一致，可以算的上机器学习的父母学科
                        </li>
                        <li>
                          3. 流体仿真分析问题的流程：
                          <br/> （1）对物理现象进行离散化建模 
                          <br/> （2）用合适的微分方程表示离散化单元之间的关系，确定外力，内部约束条件和边界条件 
                          <br/> （3）对以上微分方程进行数值求解，重度的依赖并行编程，稀疏数据结构，和设置合适的求解器
                        </li>
                        <li>
                          4. 本次演示的 Position based dyanamic 法是一种加速求解的方式，实现起来比较简单，但是原理并不不简单
                          <br />强烈推荐发明者做的在线教程：<a href='https://matthias-research.github.io/pages/tenMinutePhysics/index.html' target="_blank">PBD作者的在线交互教程，用JS实现</a>
                        </li>
                      </ul>

                      <p></p>
                      <h3>2. 演示 和 前置知识</h3>
                      <p>演示：</p>
                      <p>1. 只考虑粒子碰撞和边界条件的很多小球，所在立场为立方体中心有引力，整体有旋转力
                        <br /><img src="https://github.com/mrzhuzhe/taichi_dem/raw/main/gifs/v01.gif" width="480" />
                      </p>
                      <p>2. 所在力场和上一个演示一样, 但是增加了流体的不可压缩性 和粘度 “假”
                        <br /><img src="https://github.com/mrzhuzhe/taichi_dem/raw/main/gifs/pbf-v01.gif" width="480" />
                      </p>

                      <p>基础：</p>
                      <ul> 
                        <li>0. 线性代数 微分方程 数值方法 数学分析 最优化 等基础课</li>                       
                        <li>1. 图形学仿真和流体力学入门：<a href='https://www.bilibili.com/video/BV1aL4y1a7pv/?vd_source=357616f412db6079b853b68278dc03db' target="_blank">太极图形课</a></li>
                        <li>2. 上面这个课程的老版本，难度偏高，但是老师把读者当作和自己同样水平的人在交流一样在讲，讲的非常真诚：<a href='https://www.bilibili.com/video/BV1ZK411H7Hc/?spm_id_from=333.337.search-card.all.click&vd_source=357616f412db6079b853b68278dc03db' target="_blank">GAMES201 高级物理引擎</a></li>
                        <li>3. 太极图形对求解器 PBF 和内存优化 等点做的补充讲解 <a href='https://www.bilibili.com/video/BV1gU4y1g7uJ/?spm_id_from=333.337.search-card.all.click' target="_blank">taichi graphic 公司内部分享</a></li>
                      </ul>

                      <p></p>
                      <h3>3. 处理流程</h3>

                      <p>第零步：CAE的思考方式</p>
                      <p></p>
                      <ul>
                        <li>
                          1. 选择合适的模型对物理现象进行离散化建模                          
                          <br />（1）<a href="https://github.com/mo-hanxuan/FEMcy"  target="_blank">FEM 有限元</a>，用三角网格建模，主要用于连续介质，比如模拟钢条桁架水坝受力等
                          <br />（2）<a href="https://github.com/Denver-Pilphis/taichi_dem/tree/submit/Denver-Pilphis_MuGdxy" target="_blank">DEM 离散元</a>，用粒子建模，主要模拟粒子团块，比如模拟胶体，泥土等
                          <br />（3）<a href='https://github.com/erizmr/SPH_Taichi' target="_blank">SPH</a> 光滑粒子，用粒子建模，用来模拟液体
                          <br />（4）PIC 网格法，用欧拉网格视角，用来模拟粒子
                          <br />（5）其他例如<a href="https://github.com/yjhp1016/taichi_LBM3D" target="_blank">LBM法</a>用概率建模 <a href="https://github.com/houkensjtu/SIMPLE-taichi" target="_blank">FVM</a>流体建模等 各有各的适合场景
                          <br />&emsp;
                        </li>
                        <li>
                          2. 选择合适的微分方程，来表示物理场景，即使是同一种方法例如sph也可以用不同的方程来描述液体
                          <br />
                          在本次的position base fluid 中 只使用了 Navier–Stokes 方程 中不可压缩性的部分  来描述液体，用poly6来描述局部压强
                          <br />
                          本次为了模拟速度牺牲了很多精度，所以导致只有一阶近似精度（速度），当然如果使用严格的流体平衡方程能获得更高的精度和更接近真实的加速度等
                          <br /> 
                          当然有一些现实中特定物理现象例如卡门涡街，是比较难在模拟中复现的，所以本次的模拟如果仔细看会发现很多不真实的地方
                          <br />&emsp;
                        </li>
                      </ul>
                      <p></p>

                      <p>第一步：选择和建立整体模型</p>
                      <p>这里只针对PBF 的 SPH 例子讲： </p>
                      <p>TODO 流程演示视频</p>
                      <p>这里我逐步放开每个步骤的注释，让大家看以下每个步骤对结果的影响</p>
                      <ul>
                        <li>1. 计算外力(tougong函数)得到速度， 保存当前位置 </li>
                        <li>2. solveBoundaries 计算边界条件</li>
                        <li>3. findNeighbors 临近搜索，快速找粒子当前的邻居</li>
                        <li>4. solveFluid 约束条件来修正每个粒子的速度，本例中是根据体积守恒方程，求解粒子所受约束条件产生的梯度
                          <br /> 例如物体被压扁梯度就会指向还原，水流动梯度就会指向体积守恒，梯度一般遵循守恒条件会指向能量降低的流动方向
                        </li>
                        <li>5. applyViscosity 求解一个假的粘度来修正速度</li>
                        <li>6. 根据速度更新粒子位置，一个loop结束</li>
                      </ul>

                      <p>第二步：求解</p>
                      <ul>
                        <li>1. Position based dynamic 中没有对线性方程组进行求解</li>
                        <li>2. PBD 用类似于显示隐式时间积分的方式来修正粒子的速度，来近似求解方程的过程<a href='https://www.youtube.com/watch?v=uCaHXkS2cUg' target="_blank">发明者的解释</a> 起到数值加速的作用</li>
                        <li>3. 这个方法类似于jacobi迭代 <a href='https://www.bilibili.com/video/BV1gU4y1g7uJ?p=3&vd_source=357616f412db6079b853b68278dc03db' target="_blank">PBD 和 jacobi迭代的关系</a></li>
                      </ul>
                      
                  
                      <h3>4 遇到的问题</h3>
                      <p></p>
                      <ul>
                        <li>在GPU3090上 黄色 dem 旋转小球，如果临域搜索的数据结构是用dynamic snode 只有 30-40 fps <br></br>但是用blog里的紧凑内存实现 60-70 fps， 瓶颈在哪里？</li>
                        <li>3d的情况下粒子靠近边界时会卡在一起，会产生数值下溢，目前只能随机把小球往回移动一小段距离，这个方法有点过于trick，有没有通用的解决办法？
                                        <pre className='code'>if (pos[i][0] >= maxX):
                                                    pos[i][0] = maxX - eps * ti.random();</pre> </li>
                        <li>fp32 在小步长下很容易数值溢出，是否有通用的方法解决？</li>
                      </ul>

                      <p></p>
                      <h3>6. 总结</h3>                      
                      <p>后续计划</p>
                      <ul>
                        <li>1. 做一个有求解器的版本 共轭梯度也试一下</li>
                        <li>2. 练习其他常见模型 SPH FVM <a href="https://www.bilibili.com/video/BV1mg411y7i9/?p=11&vd_source=3b67a6b68a6e25b141c94dc81e57dc4e" target="_blank">MPM</a> 等</li>
                        <li>3. 看taichi cpp源码 熟悉 cuda mpi</li>
                        <li>4. 学习cpu 和 内存管理</li>
                        <li>5. 了解一下LLVM</li>
                        <li>6. 用houdini 渲染粒子效果</li>
                      </ul>

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