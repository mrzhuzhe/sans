import DisqusBox from '../../components/disqus'
import Header from '../../components/header'
import Footer from '../../components/footer'
import KeywordsTags from '../../components/keywordsTags'

export async function getStaticProps() {
    
  const data = {
      data: {
        Post: {
                  id: "cudaintro",
                  title: "【HPC 04】Cuda openmp SIMD指令 TVM 和 高性能计算",
                  publishedDate: "2023-4-1",
                  brief: "高性能计算的整体蓝图",
                  categories: [{name: "高性能计算" }]  
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
                      <h3 className="code">代码：<a href='https://github.com/mrzhuzhe/riven' target="_blank">https://github.com/mrzhuzhe/riven</a></h3>
                      <h3>1. 概述</h3>
                      <p>由于之前深度学习，物理仿真，渲染等都需要用到高性能计算，cpu/gpu下并行编程，所以最近做了一些cuda相关的练习</p>
                      <p><strong>为什要有并行计算?：</strong></p>
                      <ul>
                        <li>理论上可以不断进行算法层面的优化，减少算法复杂度来提升程序性能(实际上不行)</li>
                        <li>单线程的处理效率在2000年左右就到了瓶颈，目前cpu都是单cpu多核心，单线程程序的执行效率有限</li>
                        <li>针对单一领域算法的fpga缺乏范用性，你不能指望硬件的内存线程完全配合你的应用来</li>
                        <li>现在的gpu并行计算模型，和应用，大行其道</li>
                        <li>其实现在gpu的性能也到了瓶颈 只能通过改gpgpu的硬件 <a href="https://www.nvidia.com/en-us/data-center/tensor-cores/" target="_blank">tensor core</a> NPU 如苹果的<a href="https://developer.apple.com/documentation/vision/classifying_images_with_vision_and_core_ml?language=objc">core ml</a>来针对领域应用优化性能</li>
                        <li>cpu gpu的(我猜是电路设计的原因)指令集一般都支持指令向量化（arm_neon x86 的 sse vvx）一次执行多条（4/8）条计算指令（指令可以并行执行）</li>                        
                      </ul>
                      <p><strong>因此</strong></p>
                      <p>在算法层面：</p>
                      <ul>
                        <li>我们只能用并行编程的模型来在cpu和gpu中并发的开启多个线程来coding，所以需要考虑数据竞争的情况，需要用到锁，障碍，原子操作等处理竞争关系</li>
                        <li>gpgpu的和cpu的并行编程模型不太一样，增加了grid block thread warp 同步 等概念，算法本身需要针对硬件环境</li>
                        <li>针对精度要求可以用半精度或者更小精度，配合指令向量化</li>
                      </ul>
                      <p>在内存层面：</p>
                      <ul>
                        <li>减少内存读取</li>
                        <li>提升内存读取的局部性利用CPU GPU的L1 L2缓存</li>
                        <li>利用默认的缓存prefech机制</li>
                        <li>利用硬件特制的内存，如N卡的Block shared_memory</li>                      
                      </ul>
                      <p><strong>还有其他办法吗</strong></p>
                      <p>在编译器层面</p>
                      <ul>
                        <li>计算图表示的层面优化</li>
                      </ul>
                      

                      <p>目前我做了什么?：</p>
                      <ul>
                        <li>目前做了cuda neon指令集等的练习</li>
                      </ul>
                     

                      <h3>2. 相关工作</h3>
                      <ul>
                        <li></li>
                      </ul>

                      <h3>3. 实验设计</h3>
                      <ul>
                        <li></li>
                      </ul>

                      <h3>4. 实验结果</h3>
                      <ul>
                        <li></li>
                      </ul>


                      <h3>5. 总结和展望</h3>
                      <ul>
                        <li></li>
                      </ul>

                      <h3>6. 参考资料</h3>
                      <ul>
                        <li>1.《Learn CUDA Programming》<a href='https://github.com/PacktPublishing/Learn-CUDA-Programming' target="blank">Code Example</a> CUDA 入门书 </li>
                        <li>2. 高性能并行编程与优化 from 双笙子佯谬 <a href='https://space.bilibili.com/263032155/channel/collectiondetail?sid=53025' target="blank">B站视频</a></li>
                        <li>3. <strong className='red'>强烈推荐</strong> Oneflow团队的 <a href='http://giantpandacv.com/project/OneFlow/' target="blank">Gaintpandacv博客</a>涵盖指令集/编译器/各种backend实践</li>
                        <li>4. 陈天奇的MLC课程 <a href='https://mlc.ai' target="blank">https://mlc.ai（文档和作业）</a> 和 <a href='https://space.bilibili.com/1663273796/channel/series' target="blank">B站视频</a></li>
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