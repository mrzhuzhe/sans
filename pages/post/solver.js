import DisqusBox from '../../components/disqus'
import Header from '../../components/header'
import Footer from '../../components/footer'
import KeywordsTags from '../../components/keywordsTags'

export async function getStaticProps() {
    
  const data = {
      data: {
        Post: {
                id: "solver",
                title: "【HPC 05】数值求解器",
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
                        <li>1. 大部分code 例子都来自这里https://johnfoster.pge.utexas.edu/numerical-methods-book/LinearAlgebra_IterativeSolvers.html</li>
                        <li>2. 《Numerical Recipes in C》 一本免费书网上很多 </li>
                        <li>3. MIT 18.06 linear algebra</li>
                        <li>4. MIT numerical analysis 18.33 </li>
                      </ul>

                      <h3>2.相关工作</h3>
                      <p>联立线性方程组</p>
                      
                      <h3>3.相关工作</h3>

                      <h3>4.实验</h3>

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