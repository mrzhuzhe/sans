import DisqusBox from '../../components/disqus'
import Header from '../../components/header'
import Footer from '../../components/footer'
import KeywordsTags from '../../components/keywordsTags'

export async function getStaticProps() {
    
  const data = {
      data: {
        Post: {
                  id: "euler",
                  title: "【HPC 02】欧拉视角的流体模拟",
                  publishedDate: "2023-2-18",
                  brief: "欧拉视角下的纯网格烟雾模拟，pic网格和粒子混合法，mpm混合粒子有限元法",
                  categories: [{name: "CFD" }] 
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
                      <h3 className="code">代码：<a href='https://github.com/mrzhuzhe/Reisen' target="_blank">https://github.com/mrzhuzhe/Reisen</a></h3>
                      <h3>1. 概述</h3>
                      <p>之前做了了<a href="/post/positionbasedfluid" target="blank">Position base dynamic</a>光滑粒子法流体和离散元法法的练习，那些方法都是基于
                      <a href="https://www.bilibili.com/video/BV1ZK411H7Hc/?spm_id_from=333.337.search-card.all.click&vd_source=357616f412db6079b853b68278dc03db" target="blank">拉格朗日视角的</a>模拟过程质保正粒子之间相互作用的物理守恒：动量，质量，角动量等守恒</p>                  
                      <p>本着入门就把常见方法都试一下的和taichi老师推荐的路线，最近把基于欧拉网格的方法也试了一下</p>
                      <p><strong>欧拉视角</strong>把当前空间划分成一个个网格，利用了力场的概念，网格中每个格子在xyz方向都有不同的速度（加速度），粒子在场内的运动会遵循场的加速度来改变当前速度和方向</p> 
                      <p>例如：</p>
                      <p>原本的(只显示粒子)</p>
                      <p><img src="https://res.cloudinary.com/dgdhoenf1/image/upload/v1676706478/euler/03.jpg"></img></p>
                      <p>显示出网格(注意粒子都被框在一个个的小格子里)</p>
                      <p><img src="https://res.cloudinary.com/dgdhoenf1/image/upload/v1676706478/euler/02.jpg"></img></p>
                      <p>演示网址：<a href="https://matthias-research.github.io/pages/tenMinutePhysics/18-flip.html" target="blank">https://matthias-research.github.io/pages/tenMinutePhysics/18-flip.html</a></p>
                      <p>所以：为什么要用网格？ <strong>答</strong>：更好的处理projection（也就是相互作用，和限制条件）</p>
                      <ul>
                        <li>1.没有网格算粒子之间相互作用就只能用粒子搜索粒子附近的粒子去计算碰撞/密度/概率来进行，这样会引起很多问题，比如粒子临域搜索就很麻烦</li>
                        <li>2.不过光滑粒子法也能处理自碰撞，固流耦合，柔性物体和欧拉方法能做的几乎一样</li>
                        <li>3.欧拉方法的守恒<strong>只存在网格之间的守恒</strong>不存在粒子之间的守恒，如果网格只存了速度，就默认没有体积的守恒</li>
                      </ul>

                      <h3>2. 演示</h3>
                      <p><img src="https://res.cloudinary.com/dgdhoenf1/image/upload/v1676716205/euler/04.jpg" width="480" ></img></p>
                      <p>TODO此处添加视频</p>
                      <p>1. SPH固流耦合 <a href='https://github.com/mrzhuzhe/Reisen/blob/main/sph/main.py' target="blank">https://github.com/mrzhuzhe/Reisen/blob/main/sph/main.py</a></p>
                      <p>2. 纯欧拉法烟雾<a href='https://github.com/mrzhuzhe/Reisen/blob/main/euler/test.py' target="blank">https://github.com/mrzhuzhe/Reisen/blob/main/euler/test.py</a></p> 
                      <p>3. 欧拉混合拉格朗日流体（dt不能太大）<a href='https://github.com/mrzhuzhe/Reisen/blob/main/euler/pic.py' target="blank">https://github.com/mrzhuzhe/Reisen/blob/main/euler/pic.py</a></p>
                      <p>4. 3d Partical in cell flip apic<a href='https://github.com/mrzhuzhe/Reisen/blob/main/flip/3d_pic.py' target="blank">https://github.com/mrzhuzhe/Reisen/blob/main/flip/3d_pic.py</a></p>
                      <p>5. mpm <a href='https://github.com/mrzhuzhe/Reisen/blob/main/mpm/2_compare.py' target="blank">https://github.com/mrzhuzhe/Reisen/blob/main/mpm/2_compare.py</a></p>

                      <h3>3. 相关工作</h3>
                      <p>代码大量借鉴了</p>
                      <ul>
                        <li>1. sph_taichi <a href='https://github.com/erizmr/SPH_Taichi'>https://github.com/erizmr/SPH_Taichi</a></li>
                        <li>2. sandy_fluid<a href='https://github.com/ethz-pbs21/SandyFluid'>https://github.com/ethz-pbs21/SandyFluid</a></li>
                        <li>3. taichi_mpm<a href='https://github.com/yuanming-hu/taichi_mpm'>https://github.com/yuanming-hu/taichi_mpm</a></li>
                        <li>4. power-pic<a href='https://github.com/g1n0st/power-pic'>https://github.com/g1n0st/power-pic</a></li>
                        <li>5. pyasflip <a href='https://github.com/nepluno/pyasflip'>https://github.com/nepluno/pyasflip</a></li>
                      </ul>

                      <h3>4. 实验</h3>
                      <p>遇到的问题</p>                      
                      <p>
                        <ul>
                          <li>1. 大步长引起的能量耗散</li>
                          <li>2. 隐式求解微分方程引起的能量耗散</li>
                          <li>3. 为什么计算网格节点差值要减去0.5<a href='https://forum.taichi-lang.cn/t/topic/1584/18' target="blank">https://forum.taichi-lang.cn/t/topic/1584/18</a></li>
                          <li>4. 数值稳定性</li>
                        </ul>
                      </p> 
                      <p></p>

                      <h3>5. 原理</h3>
                      <p>流程</p>
                      <ul>
                        <li>1. p2g particle to grid </li>
                        <li>2. project solve pressure divergen </li>
                        <li>3. g2p grid to particle </li>
                        <li>4. advect </li>  
                      </ul>                      
                      <p></p>

                      <h3>6. 讨论</h3>
                      <ul>
                        <li>1. projection 的隐式求解 </li>
                        <li>2. 隐式时间积分</li>
                        <li>3. 数值稳定性</li>
                        <li>4. mpm应力的求解 </li>
                        <li>5. 极分解</li>                       
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