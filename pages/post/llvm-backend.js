import DisqusBox from '../../components/disqus'
import Header from '../../components/header'
import Footer from '../../components/footer'
import KeywordsTags from '../../components/keywordsTags'

export async function getStaticProps() {
    
  const data = {
      data: {
        Post: {
                  id: "llvm backend",
                  title: "给LLVM的CPU0后端增加一个指令",
                  publishedDate: "2026-03-02",
                  brief: "",
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
                    <h3 className="code">代码：<a href='https://github.com/mrzhuzhe/LLVM-12X' target="_blank">https://github.com/mrzhuzhe/LLVM-12X</a></h3>
                      <h3>1. 概述</h3>
                      <ul>
                        <li>如何适配自定义硬件的新指令集？</li>
                        <li>在LLVM的框架上开发编译器后端，分为哪几个步骤？ 哪些是不相关的？</li>
                        <li>如何参与LLVM的上游开发 / LLVM 的官方论坛</li>
                      </ul>

                      <h3>2. 相关工作</h3>
                      <ul>
                        <li>1. 自定义指令DSP，浮点数，多线程，图优化</li>
                        <li>2. LLVM backend 的结构和功能划分，指令选择，指令合并，指令legalize</li>
                        <li>3. LLVM IR / Machine IR / tableGen </li>
                        <li>4. 如何更高效的组织汇编代码，如何规划栈和堆，函数调用</li>
                        <li>5. 本次大部分代码都来自 LLVM官方教程中backend部分文档例子CPU0 </li>
                      </ul>

                      <h3>3. 实验设计</h3>
                      <ul>
                        <li>1. 增加一个二元binaryOP指令，以Sqsum为例</li>
                        <li>2. 增加一个三元指令，注意不是浮点</li>
                        <li>3. 增加硬浮点支持</li>
                        <li>4. fastSel / globalsel / selectDag 都支持</li>
                      </ul>

                      <h3>4. 实验结果</h3>
                      <ul>
                        <li>1. 通过增加二元指令debug llvm 全流程 见PR <a target="_blank" href='https://github.com/mrzhuzhe/LLVM-12X/commit/624c280c8d169642bf42cdcc6f54f0f1eca822c7'>https://github.com/mrzhuzhe/LLVM-12X/commit/624c280c8d169642bf42cdcc6f54f0f1eca822c7</a></li>
                      </ul>


                      <h3>5. 总结和展望</h3>
                      <ul>
                        <li>1. 编译器本身就是一个虚拟机</li>
                        <li>2. frame , ABI, libc操作系统编程接口</li>
                        <li>3. LLVM 的目前的路线是什么？还没解决的问题有哪些？</li>
                        <li>4. 过度设计？</li>
                        <li>5. testSuite and benchmark</li>
                        <li>6. LLVM codgen目前涉及到的流程为 LLParse &gt; prelogue &gt;  type leglize &gt; selectDag &gt; combineDag &gt; register allocation &gt; epilogue</li>
                        <li>7. 多核？</li>
                      </ul>

                      <h3>6. 参考资料</h3>
                      <ul>
                        <li>1. LLVM官方教程CPU0 <a href="https://jonathan2251.github.io/lbd/backendstructure.html" target="_blank" >https://jonathan2251.github.io/lbd/backendstructure.html</a></li>
                        <li>2. learn llvm 12 <a href="https://github.com/PacktPublishing/Learn-LLVM-12" target="_blank" >https://github.com/PacktPublishing/Learn-LLVM-12</a></li>                        
                        <li>3. 《深入理解LLVM：代码生成》彭成寒</li>
                        <li>4. 龙书 </li>
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