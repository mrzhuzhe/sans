import DisqusBox from '../../components/disqus'
import Header from '../../components/header'
import Footer from '../../components/footer'
import KeywordsTags from '../../components/keywordsTags'

export async function getStaticProps() {
    
  const data = {
      data: {
        Post: {
                  id: "llvm-passes",
                  title: "【HPC 08】如何用LLVM 插件调试 Pass",
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
                        <li>4. 为开发LLVM后端适配自定义硬件做准备 </li>
                        <li>5. PASS 也可以用来实现自定义runtime库 </li>
                      </ul>

                      <h3>2. 相关工作</h3>
                      <ul>
                        <li>1. llvm passManager, 代码分析，代码插入，代码插桩 </li>
                        <li>2. LLVM auto-vecotirze Vplan <a href="https://llvm.org/devmtg/2017-03/assets/slides/introducing_vplan_to_the_loop_vectorizer.pdf" target="_blank">Introducing_vplan_to_the_loop_vectorizer(2017)</a></li>
                        <li>3. llvm .ll 中间表示 IR  </li>
                        <li>4. llvm JIT ， 参考 llvm cuda backend的最小例子 </li>
                        <li>5. llvm backend codegen CPU0， 我自己的练习 <a href="https://github.com/mrzhuzhe/LLVM-12X" target="_blank" >https://github.com/mrzhuzhe/LLVM-12X</a>
                          <br />里面的分支就是各个chapter的代码
                          </li>
                      </ul>

                      <h3>3. 实验设计</h3>
                      <h4>3.1 提取 llvm loopVectorize 插件中遇到的实际问题</h4>
                      <p>版本 llvm 22.0</p>
                      <ul>
                        <li>1. RTTI 选项问题</li>
                        <li>2. .ll中 attribute 设置问题</li>
                      </ul>
                      <h4>3.2 Debug loopVectorize 插件中遇到的世纪问题</h4>
                      <ul>
                        <li>1. cl 和 pass 类名不能重复 </li>
                        <li>2. 上下游的插件依赖</li>
                      </ul>
                      

                      <h3>4. 实验结果</h3>
                      <h4>4.1 一些GCC中遇到过的能手工向量化却不能向量化的问题，LLVM中是如何处理的？</h4>
                      <ul>
                        <li>1. Alias 分析深度限制</li>
                        <li>2. Control in loop</li>
                        <li>3. Gather in loop</li>
                      </ul>


                      <h3>5. 总结和展望</h3>
                      <p>编译器的一些变态又合理的行为</p>
                      <ul>
                        <li>1. IEEE 754 浮点计算约定：满足交换律，不满足结合律: 例如 a * b *c != a * (b*c) 编译器一定会保证计算顺序</li>
                        <li>2. IEEE 754 复数浮点数的异常处理：会导致复数乘法比手动计算慢五十倍 <a href="https://stackoverflow.com/questions/42659668/stdcomplex-multiplication-is-extremely-slow" _target="blank">stdcomplex-multiplication-is-extremely-slow</a></li>
                        <li>3. 激进的策略 fast-math <a href='https://scicomp.stackexchange.com/questions/20867/what-does-ffast-math-do' _target="blank">what-does-ffast-math-do</a></li>
                      </ul>
                      <p>一些思考</p>
                      <ul>
                        <li>
                          为什么要有IR和方言，我把所有信息保存下来不行吗？
                            <br />答：不行，内容太多不分层会难以维护，例如：向量化阶段不做指令选择
                        </li>
                        <li>
                          为什么要有虚拟机存在
                            <br />答：对硬件资源和数学过程的建模
                        </li>
                        <li>
                          编译器如何与硬件协同设计
                        </li>
                      </ul>
                      
                      <p>后续计划</p>
                      <ul>
                        <li>1. 开发自定义LLVM后端支持新硬件</li>
                        <li>2. JIT 虚拟机 和 浏览器 </li>
                        <li>3. 如何跟上LLVM 的 roadMap ?</li>
                      </ul>

                      <h3>6. 参考资料</h3>
                      <ul>
                        <li>1. 如何实现一个llvm前端 <a href="https://github.com/ghaiklor/llvm-kaleidoscope" target="_blank" >LLVM kaleidoscope</a></li>
                        <li>2. <a href="https://jonathan2251.github.io/lbd/backendstructure.html" target="_blank">LLVM CPU0 Backend</a></li>
                        <li>3. GCC internal GIMPLE auto-vectorize</li>
                        <li>4. 一生一芯 集成电路前后端</li>
                        <li>5. PLCT 实验室的 V8 引擎流程解释 torque ignite ... </li>
                        <li>6. ROCm / qemu / Linuv divice driver / Stm32 driver / tcp ip illustrate </li>
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