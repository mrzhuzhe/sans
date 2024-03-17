import DisqusBox from '../../components/disqus'
import Header from '../../components/header'
import Footer from '../../components/footer'
import KeywordsTags from '../../components/keywordsTags'

export async function getStaticProps() {
    
  const data = {
      data: {
        Post: {
                id: "iteration_solver",
                title: "【HPC 07】Coding迭代法数值求解器",
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
                      <p></p>
                      
                      <h3>2.相关工作</h3>
                      <p></p>

                      <h3>3.实验</h3>
                      <p></p>
                      
                      <h3>4. 结论</h3>
                      <p></p>
                      
                      <h3>5. 后续工作</h3>
                      <p></p>
                      <ul>
                        <li>
                          
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