import DisqusBox from '../../components/disqus'
import Header from '../../components/header'
import Footer from '../../components/footer'
import KeywordsTags from '../../components/keywordsTags'

export async function getStaticProps() {
    
  const data = {
      data: {
        Post: {
                id: "solver",
                title: "【HPC 06】数值求解器",
                publishedDate: "2024-1-15",
                brief: "矩阵直接求解, 迭代求解, lu分解求解, lu分解求det, householder过程求相似矩阵, qr分解求特征值",
                categories: [{name: "HPC" }, { name: "linear algebra"}] 
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
                    <h3 className="code">代码：<a href='###' target="_blank">https://github.com/mrzhuzhe/riven/solver</a></h3>
                      <h3>1. 概述</h3>
                      <p>这次尝最简单的实现了一些常见矩阵求解器</p>
                      <ul>
                        <li>直接法求解</li>
                        <li>LU分解求结果和行列式(det)</li>
                        <li>QR分解求特征值</li>
                      </ul>
                      <p>本次大部分代码都来自这里</p>
                      <ul>
                        <li>1. 大部分code 例子都来自这里&nbsp;
                          <a target='blank' href='https://johnfoster.pge.utexas.edu/numerical-methods-book/LinearAlgebra_IterativeSolvers.html'>https://johnfoster.pge.utexas.edu/numerical-methods-book/LinearAlgebra_IterativeSolvers.html</a></li>
                        <li>2. 《Numerical Recipes in C》 一本免费书网上很多 </li>
                        <li>3. MIT 18.06 linear algebra</li>
                        <li>4. MIT numerical analysis 18.33 </li>
                      </ul>
                      <p>本次用了Eigen这个库作为baseline来对照结果正确性&nbsp;
                        <a target='blank' href='https://eigen.tuxfamily.org/dox/GettingStarted.html' >https://eigen.tuxfamily.org/dox/GettingStarted.html</a></p>
                      <h3>2.相关工作</h3>
                      <h4>2.1 联立线性方程组</h4>
                      <p>
                        <img src="https://res.cloudinary.com/dgdhoenf1/image/upload/v1708072272/solver/h0pkd9dqbckjtvppye0f.jpg" alt="fem"></img>
                      </p>
                      <p>对于有限元和图形学中的弹簧质点系统</p>
                      <p className='strong'>通过矩阵表示Vertex和Edge的邻近关系：</p>
                      <p><strong>例如</strong> 
                      <br />上图的1 2 3 三个质点根据每个质点的位置x, y, 可以计算之间距离也就是连杆（弹簧）的长度
                      <br />
                      根据连杆的长度可以依据胡克定律计算相互之间的弹力
                      <br />
                      根据一个质点和其他质点的位置就可以得出质点间所有的相互作用力</p>
                      <p className='strong'>通过守恒关系联立微分方程：</p>
                      <p>
                      所有质点x y 方向受力的合力一定等于边界条件的支反力
                      <br/>
                      例如上图在下坠过程中，内部合力为0，外力只有重力，质点之间合力为0
                      <br/>
                      而接触地面后，质点之间合力之和为重力之和
                      </p>
                      <p>通过<strong className='green'>动量守恒</strong> <strong className='green'>速度</strong> 
                      <strong className='green'>加速度</strong> <strong className='green'>角动量</strong> 
                      <strong className='green'>质量/密度</strong> 等守恒关系</p>
                      <p>我们可以根据这些关系建立线性方程，对系统状态进行求解</p>
                      <p><strong>例如</strong>
                        <br></br>
                        <strong className='green'>已知</strong>位置求受力
                        <br></br>
                        再根据受力，弹性，阻尼等来求受力带来的加速度变化
                        <br></br>
                        就可以求得每个点接下来的速度和状态了
                      </p>
                      <p>
                        <img src="https://res.cloudinary.com/dgdhoenf1/image/upload/v1708072272/solver/p1mimzz9u6ognbn9leww.jpg" alt="sph"></img>
                      </p>
                      <h4>2.2 线性代数和Eigen</h4>
                      <p>因此实际工程中我们会经常碰到</p>
                      <p>需要求矩阵线性方程的解，分<strong className='green'>小规模</strong>和<strong className='crimson'>大规模</strong>的</p>
                      <p>其中大规模线性方程组求解非常非常的的慢，一般无法用直接法或者直接lu分解等O(n^3)方法</p>
                      <p>更致命的是，直接法,不仅计算量大，往往无法并行，<strong className='crimson'>矩阵消项过程每个都依赖于上一行的写回</strong></p>
                      <p>而要采用一些基于<strong>数值迭代</strong>的方法</p>
                      <p>例如对<strong>近似正定矩阵</strong>可以用 <strong>雅各比迭代</strong> 或者 <a target='blank' href='https://www.cs.cmu.edu/~quake-papers/painless-conjugate-gradient.pdf'>共轭梯度</a></p>
                      <p>但是迭代法也不是万能的，迭代法一般都要满足一些<strong>Precondition</strong></p>
                      <p>实际开发中，我们经常用到<strong>Eigen</strong>这个库来表示矩阵，用它类提供的矩阵相乘，点乘和小矩阵求解</p>

                      <h3>3.实验</h3>

                      <h3>4.结论</h3>

                      <h3>5. 后续工作</h3>
                      <ul>
                        <li>
                          1. 实现 SVD 分解
                        </li>
                        <li>
                          2. 实现FFT
                        </li>
                        <li>
                          3. 实现GMRES
                        </li>
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