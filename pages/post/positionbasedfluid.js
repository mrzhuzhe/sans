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
            brief: "Position base fluid & 程序员角度所理解的流体力学",
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
                      <ul>
                        <li></li>
                      </ul>

                      <p>第一步：选择和建立整体模型</p>
                      <ul>
                        <li></li>
                      </ul>

                      <p>第二步：求解</p>
                      <ul>
                        <li></li>
                      </ul>

                      

                      <p></p>
                      <h3>4. 动画</h3>
                      <p>显式和隐式积分</p>
                      <ul>
                        <li></li>
                      </ul>

                      <p></p>
                      <h3>5. Position based fluid</h3>
                      <p>5.1 PBF更新的流程</p>
                      <ul>
                        <li></li>
                      </ul>

                      <p>5.2 遇到的问题</p>
                      <ul>
                        <li></li>
                      </ul>

                      <p></p>
                      <h3>6. 总结</h3>
                      <p></p>
                      <ul>
                        <li></li>
                      </ul>
                      <p>未解决问题</p>
                      <ul>
                        <li></li>
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