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
                      <p><img src="https://res.cloudinary.com/dgdhoenf1/image/upload/v1708075921/solver/pl1yobnnolkxgvy4uumx.jpg" alt="eigen"></img></p>
                      <h3>3.实验</h3>
                      <h4>3.1 直接法求解</h4>
                      <div className='code'>
                        # cd /solver 
                        <br></br>
                        # code /solver/test_simp.cpp
                        <br></br>
                        ./build/bin/test_simp
                      </div>
                      <p>打印了消项的过程</p>
                      <p><strong>不可解的情况</strong> singular </p>
                      <p>例如:</p>
                      <p>a + b = 3 </p>
                      <p>a - b = 5 </p>
                      <p><strong>Rank</strong> is 2 equal to unknow Number solution is unique</p>
                      <p>Rank = number of independent 的限制条件(线性规划simplex)</p>
                      <p>但是如果我们再加一条independent的限制条件 例如 3a - b = 1, 这和前两个式子组成的3a-b = 13矛盾，则无界</p>

                      <p><strong>无穷解的情况</strong> low rank </p>
                      <p>例如:</p>
                      <p>a + b = 3 </p>
                      <p>2*a + 2*b = 6 </p>
                      <p>Rank is lower than number of unknow solution is infinite </p>
                      <p>这个版本缺少一个矩阵重排，对应消项过程中pivot为0的情况</p>
                      <p><strong className='crimson'>行与行之间存在依赖关系，无法并行化</strong></p>
                      <h4>3.2 LU分解</h4>
                      <div className='code'>
                        # cd /solver 
                        <br></br>
                        # cmake -B build -S .
                        <br></br>
                        # cmake -build build
                        <br></br>
                        # code: /solver/test_lu.cpp
                        <br></br>
                        # run 
                        <br></br>
                        ./build/bin/test_lu
                      </div>
                      <ul>
                        <li>1. lu_factor的过程打印
                          <br></br>
                          <img src="https://res.cloudinary.com/dgdhoenf1/image/upload/v1708083230/solver/mhq2eieko3okqafu7jaw.jpg"></img>
                        </li>
                        <li>2. plu_factor 的测试</li>
                        <li>3. plu_solver 和 eigen solver的结果对比
                          <br></br>
                          <img src="https://res.cloudinary.com/dgdhoenf1/image/upload/v1708083230/solver/rbxgibwyfbehygfonyc6.jpg"></img>
                        </li>
                      </ul>
                      <p>lu把原本一个线性方程组的求解，拆分成两个线性方程组的求解，
                        <br></br>
                        但是相对消项要对A和b都做消项, lu只需要对A做分解， 注意这一步复杂度还是 O(n^3)，但是矩阵cols减少了
                        <br></br>
                        而两个现行方程组的求解只需在当前列回代消项 复杂度从O(n^3)降低到O(n^2)
                      </p>
                      <p><strong className='crimson'>分解过程中还是行与行之间存在依赖</strong></p>

                      <h4>3.3 QR分解求特征值</h4>
                      <div className='code'>
                        # code: /solver/test_eigen.cpp
                        <br></br>
                        # run 
                        <br></br>
                        ./build/bin/test_eigen
                      </div>
                      <p className='strong'>迭代法求特征值和特征向量</p>
                      <div className='code'>
                        power_method(mat, rows, cols) # in /solver/test_eigen.cpp
                      </div>
                      <p>这个方法必须要有一个特别大的特征值的时候才会有用</p>
                      <p className='strong'>householder过程求相似矩阵</p>
                      <div className='code'>
                      householder(mat, rows, cols);
                      </div>
                      <p><img src="https://res.cloudinary.com/dgdhoenf1/image/upload/v1708089388/solver/w63giogesym0i64rlyoa.jpg" alt="q*q in household"></img></p>
                      <p>household 通过构造一个Q矩阵来A_similar = Q * A * Q，会将矩阵转化为一个三角化的相似矩阵，相似矩阵和原矩阵有相同的特征值</p>
                      <p>其中I=Q*Q，一般Q = I - 2w*w^T</p>
                      <p><img src="https://res.cloudinary.com/dgdhoenf1/image/upload/v1708089388/solver/f3j9gnpzwdxedxmit07k.jpg" alt="idea household"></img></p>
                      <p>理想对称正定状况下，转换完毕后的矩阵如上图</p>
                      <p className='strong'>gram_schmidt过程求相似矩阵</p>
                      <div className='code'>
                      gram_schmidt(A, Q, rows, cols);
                      </div>
                      <p><img src="https://res.cloudinary.com/dgdhoenf1/image/upload/v1708089388/solver/c1jmgagwtqsm1fhtjucc.jpg" alt="q.tans*q"></img></p>
                      <p>gram schmidt 过程跟之前类似 构造一个 I = Q.transpose * Q </p>
                      <p>q就很容易得到R R = Q.transpose() * A，如下图</p>
                      <p><img src="https://res.cloudinary.com/dgdhoenf1/image/upload/v1708089389/solver/uy2zxiv27db1by2mcyqo.jpg" alt="a=qr"></img></p>                      
                      <p className='strong'>QR迭代求特征值</p>
                      <p>来将 A_similar = Q.transpose() * A * Q 来将 A 对角化，最后pivot中轴线上的值就是特征值</p>
                      <div className='code'>
                        qr_eigen(A, rows, cols)
                      </div>
                      <p>Q迭代也对矩阵precondition有要求，矩阵为正定才一定能收敛</p>
                      <h3>4. 结论</h3>
                      <p>目前只是初步实现，还需要后续加深理解</p>
                      <p>后续要分析一下收敛成立的原因<br></br>
                      还有precondition</p>
                      <p>另外还需分析一下并行化的方案</p>
                      <p>当然最重要的还是要和实际物理问题的求解联系起来</p>
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
                        <li>
                          4. 在实际的物理问题场景中实现
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