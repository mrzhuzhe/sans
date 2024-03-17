import DisqusBox from '../../components/disqus'
import Header from '../../components/header'
import Footer from '../../components/footer'
import KeywordsTags from '../../components/keywordsTags'

export async function getStaticProps() {
    
  const data = {
      data: {
        Post: {
                id: "iteration_solver",
                title: "【HPC 07】Coding常见迭代法数值求解器",
                publishedDate: "2024-3-17",
                brief: "jacobian迭代， guassion-seidel迭代，multigrid预条件，conjugate gradient迭代, preconditioner conjugate gradient, biconjugate gradient, GMRES, biconjugate gradient stablized",
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
                      <p><strong>动机</strong></p>
                      <p>迭代法解线性方程组，在稀疏矩阵时比直接法快几十倍，所以自己实现一下迭代法，加深理解</p>
                      <ul>
                        <li>1. 测试一下<strong className='crimson'>不收敛的原因</strong> </li>
                        <li>2. 测试一下不同方法收敛的速度</li>
                        <li>3. 实现时留意是否易于<strong className='crimson'>向量化并行</strong></li>
                        <li>4. 测试一些预条件加速法，比如Multigrid或者preconditioner，或者矩阵重排</li>
                        <li>5. 测试求解器嵌套的情况</li>
                      </ul>
                      <h3>2.相关工作</h3>
                      <h4>相比较于直接法</h4>
                      <p><strong className='green'>并行化</strong>：迭代法相对直接法，并行化更直观</p>
                      <p><strong className='green'>速度</strong>：迭代法中途有很多乘法计算在矩阵稀疏时乘以0，所以矩阵稀疏时计算起来会非常快（几十倍）<br></br>相对直接法中间过程都会变成dense矩阵，所以稀疏和不稀疏计算时间一样</p>
                      <p><strong className='crimson'>误差</strong>：直接法只有浮点误差，迭代法是近似收敛法，会有收敛误差</p>
                      <p><strong className='crimson'>不收敛</strong>：迭代法对矩阵本身的性质：对称正定（SPD），对称，矩阵稳定性（最大特征值/最小特征值）有要求，矩阵性质不好时会很难收敛</p>
                      <ul>
                        <li>
                          1. Painless conjugate gradient <a href='https://www.cs.cmu.edu/~quake-papers/painless-conjugate-gradient.pdf' target='blank'>https://www.cs.cmu.edu/~quake-papers/painless-conjugate-gradient.pdf</a> 
                        </li>
                        <li>
                          2. A Multigrid Tutorial, 2nd Edition <a href='https://www.math.hkust.edu.hk/~mamu/courses/531/tutorial_with_corrections.pdf' target='blank'>https://www.math.hkust.edu.hk/~mamu/courses/531/tutorial_with_corrections.pdf</a>
                        </li>
                        <li>
                          3. Iterative Methods for Sparse Linear Systems, 2nd ed. <a href='https://www-users.cse.umn.edu/~saad/IterMethBook_2ndEd.pdf' target='blank'>https://www-users.cse.umn.edu/~saad/IterMethBook_2ndEd.pdf</a>
                        </li>
                        <li>
                          4. Cosmol的各种迭代求解器<strong className='crimson'>用法</strong>和<strong className='crimson'>对比</strong> For Usage and compare <a href='https://doc.comsol.com/5.5/doc/com.comsol.help.comsol/comsol_ref_solver.27.123.html' target='blank'>https://doc.comsol.com/5.5/doc/com.comsol.help.comsol/comsol_ref_solver.27.123.html</a>
                        </li>
                      </ul>

                      <h3>3.实验</h3>
                      <p>代码还是都在 https://github.com/mrzhuzhe/riven/solver 这个目录下</p>
                      <p>
                        https://github.com/mrzhuzhe/riven 现在在这个repos项目中增加了Eigen作为子项目<br></br>
                        Clone 时需要 --recursive
                      </p> 
                      <div className="code">git clone --recursive git@github.com:mrzhuzhe/riven.git</div>
                      <h4>3.1 Jacobian iteration </h4>
                      <div className='code'>
                        # code
                        <br></br>
                        solver/inc/jacobian.h
                        <br></br>
                        # test case
                        <br></br>
                        /build/bin/test_iteration 32 1
                      </div>
                      <p>其中<strong>第一个参数</strong>："32"是矩阵大小，可以从外部传入默认是64</p>
                      <p>其中<strong>第二个参数</strong>：1 是柏松矩阵 2 是稠密对称矩阵 0 是随机稠密矩阵</p>
                      <p>后面都保持这个约定<br></br></p>
                      <p>jacobian 有个小trick就是计算时，因为都是根据对角线来，如果矩阵是基于对角线的带状矩阵，可以把一行的计算简化成几个固定乘法的计算</p>
                      <img src='https://res.cloudinary.com/dgdhoenf1/image/upload/v1710672474/iteration_solver/01-ja.jpg' alt="jacobian_trick"></img>
                      <div className='code'>
                      2 -1  0  0  0  0  0  0 <br></br>
                      -1  2 -1  0  0  0  0  0<br></br>
                      0 -1  2 -1  0  0  0  0<br></br>
                      0  0 -1  2 -1  0  0  0<br></br>
                      0  0  0 -1  2 -1  0  0<br></br>
                      0  0  0  0 -1  2 -1  0<br></br>
                      0  0  0  0  0 -1  2 -1<br></br>
                      0  0  0  0  0  0 -1  2 
                      </div>
                      <p>&nbsp;</p>
                      <h4>3.2 Guassion-seidel iteration </h4>
                      <div className='code'>
                        # code
                        <br></br>
                        solver/inc/jacobian.h
                        <br></br>
                        # test case
                        <br></br>
                        /build/bin/test_iteration 32 1
                      </div>
                      <p>高斯赛德二和jacobian都需要矩阵近似对称正定，且收敛需要的步数较多，但是好处是非常容易并行化</p>
                      <p>&nbsp;</p>
                      <h4>3.3 过于简单的multigrid </h4>
                      <div className='code'>
                        # solver
                        <br></br>
                        /inc/multigrid.h
                        <br></br>
                        # test case
                        <br></br>
                        /build/bin/test_iteration 32 1
                      </div>
                      <p><img src="https://res.cloudinary.com/dgdhoenf1/image/upload/v1710672974/iteration_solver/multi_grid2.png" width="640px" alt="multigrid"></img></p>
                      <p>你只需要写一个f2c和c2f函数</p>
                      <p>再 16 - 8 - 4 - 8 - 16 每个尺度上跑几个iteration 给下一个尺度当初始条件就可以了</p>
                      <p>&nbsp;</p>
                      <h4>3.4 Conjugate gradient </h4>
                      <div className='code'>
                        # code
                        <br></br>
                        solver/inc/cg.h
                        <br></br>
                        # test case
                        <br></br>
                        /build/bin/test_iteration 32 1
                      </div>
                      <p>根据painless conjugate gradient文档共轭梯度就是向梯度方向前进，但是不是垂直于梯度方向（sgd），而是共轭于自己上一次的迭代方向，每次迭代的方向都是已经确定的，每次只需计算步长即可</p>
                      <p>共轭梯度为<a href="https://en.wikipedia.org/wiki/Krylov_subspace" target='_blank'>krylov子空间法</a>，虽然共轭梯度也需要<a href="https://en.wikipedia.org/wiki/Definite_matrix" target='_blank'>正定</a>，但是似乎比jacobian等迭代法有更好的泛化性能</p>
                      <img src="https://res.cloudinary.com/dgdhoenf1/image/upload/v1710673515/iteration_solver/03-cg.png" alt="cg"></img>
                      <p>&nbsp;</p>

                      <h4>3.5 Biconjugate gradient </h4>
                      <div className='code'>
                        # code
                        <br></br>
                        solver/inc/bicg.h
                        <br></br>
                        # test case
                        <br></br>
                        /build/bin/test_cg 32 1
                      </div>
                      <p>双共轭梯度泛化性比共轭梯度更好一些，但是需要额外再计算一个residuel和方向</p>
                      <p>还有一个计算量更大但数值更稳定的<a href="https://en.wikipedia.org/wiki/Biconjugate_gradient_stabilized_method" target='_blank'>bicg-stablized</a>  在 solver/inc/bicg_stab.h </p>
                      <p>&nbsp;</p>
                      <h4>3.6 Preconditioner conjugate gradient </h4>
                      <div className='code'>
                        # code
                        <br></br>
                        solver/inc/cg.h
                        <br></br>
                        # test case
                        <br></br>
                        /build/bin/test_cg 32 1
                      </div>
                      <p>预条件法改变了优化的目标residuel，且在迭代过程中要解一个子线性方程，但是会让迭代收敛大幅加快</p>
                      <p>&nbsp;</p>

                      <h4>3.7 GMRES </h4>
                      <div className='code'>
                        # code
                        <br></br>
                        solver/inc/gmres.h
                        <br></br>
                        # test case
                        <br></br>
                        /build/bin/test_cg 32 1
                      </div>
                      <p>GMRES在计算过程中需要求特征值</p>
                      <p>&nbsp;</p>

                      <h3>4. 结论</h3>
                      <p>1. 共轭梯度为什么时候会fail , fail和不收敛有关系吗?</p>
                      <p>Fail是因为共轭梯度计算alpha和beta时有除法，判断到分母为0时算法就会当作异常</p>
                      <ul>
                        <li><strong> p.T*A*p 除以 r.T * r 带来的奇点</strong></li>
                      </ul>
                      <p>2. 为什么迭代法都是针对一列b和x计算的，多列x和b如何处理？</p>
                      <ul>
                        <li>每列单独求解</li>
                        <li>Blcok conjugate gradient <a href="https://www.sciencedirect.com/science/article/pii/0024379580902475" target='_blank'>https://www.sciencedirect.com/science/article/pii/0024379580902475</a> 每次求 rows*(n)列，求cols/n组, 似乎对收敛性有影响</li>
                      </ul>
                      <h3>5. 后续工作</h3>
                      <p>后面会根据实际使用时遇到的问题来持续优化</p>
                      <p>还是研究具体场景</p>
                      <ul>
                        <li>
                          1. openfoam 流体，电磁
                        </li>
                        <li>
                          2. openroad vlsi电路仿真
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