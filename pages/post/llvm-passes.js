import DisqusBox from '../../components/disqus'
import Header from '../../components/header'
import Footer from '../../components/footer'
import KeywordsTags from '../../components/keywordsTags'

export async function getStaticProps() {
    
  const data = {
      data: {
        Post: {
                  id: "llvm-passes",
                  title: "【HPC 08】LLVM 插件调试 loopVectorize pass",
                  publishedDate: "2025-12-18",
                  brief: "用llvm插件调试loopVectorize pass",
                  categories: [{name: "编译器" }]  
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
                    <h3 className="code">代码：<a href='https://github.com/mrzhuzhe/peasant/tree/main/llvm/pass-test/vectorize' target="_blank">https://github.com/mrzhuzhe/peasant/tree/main/llvm/pass-test/vectorize</a></h3>
                      <h3>1. 概述</h3>
                      <ul>
                        <li>1. llvm pass 调试需要重编，用插件调试节约编译时间</li>
                        <li>2. llvm codegen 也会用到 passes 可以 load plugin </li>
                        <li>3. 熟悉loop Vectorize 流程 alias PHI 分析 </li>
                        <li>4. 为开发LLVM后端做准备 </li>
                      </ul>

                      <h3>2. 相关工作</h3>
                      <ul>
                        <li>1. llvm passManager </li>
                        <li>2. llvm .ll 中间表示 IR  </li>
                        <li>3. llvm JIT </li>
                        <li>4. llvm backend codegen CPU0 </li>
                      </ul>

                      <h3>3. 实验设计</h3>
                      <h4>3.1 提取 llvm loopVectorize 插件中遇到的实际问题</h4>
                      <ul>
                        <li>1. RTTI 选项问题</li>
                        <li>2. .ll中 atribute 设置问题</li>
                      </ul>
                      <h4>3.2 Debug loopVectorize 插件中遇到的世纪问题</h4>
                      <ul>
                        <li>1. cl 和 pass 类名不能重复 </li>
                        <li>2. 上下游的插件依赖</li>
                      </ul>
                      

                      <h3>4. 实验结果</h3>
                      <ul>
                        <li>1. Alias 分析深度限制</li>
                        <li>2. Control in loop</li>
                        <li>3. Gather in loop</li>
                      </ul>


                      <h3>5. 总结和展望</h3>
                      <ul>
                        <li>1. 开发自定义LLVM后端支持新硬件</li>
                        <li>2. 虚拟机 和 浏览器</li>
                      </ul>

                      <h3>6. 参考资料</h3>
                      <ul>
                        <li>1. llvm kaleiscope</li>
                        <li>2. llvm CPU0 Backend</li>
                        <li>3. JIT 和虚拟机</li>
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