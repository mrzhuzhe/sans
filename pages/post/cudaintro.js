import DisqusBox from '../../components/disqus'
import Header from '../../components/header'
import Footer from '../../components/footer'
import KeywordsTags from '../../components/keywordsTags'

export async function getStaticProps() {
    
  const data = {
      data: {
        Post: {
                  id: "cudaintro",
                  title: "【HPC 04】用Cuda实现和调试一些常见算法",
                  publishedDate: "2023-4-1",
                  brief: "高性能计算的整体蓝图，Cuda openmp SIMD指令 TVM 和 高性能计算",
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
                      <p><img src="https://res.cloudinary.com/dgdhoenf1/image/upload/v1680447679/cuda/02.png" alt="整体架构"  /></p>                      
                      <p><strong className='red'>为什要有并行计算?：</strong></p>
                      <ul>
                        <li>理论上可以不断进行算法层面的优化，减少算法复杂度来提升程序性能(实际上不行)</li>
                        <li>单线程的处理效率在2000年左右就到了瓶颈，目前cpu都是单cpu多核心，单线程程序的执行效率有限</li>
                        <li>针对单一领域算法的fpga缺乏范用性，你不能指望硬件的内存线程完全配合你的应用来</li>
                        <li>现在的gpu并行计算模型，和应用，大行其道</li>
                        <li>其实现在gpu的性能也到了瓶颈 只能通过改gpgpu的硬件 <a href="https://www.nvidia.com/en-us/data-center/tensor-cores/" target="_blank">tensor core</a> NPU 如苹果的<a href="https://developer.apple.com/documentation/vision/classifying_images_with_vision_and_core_ml?language=objc">core ml</a>来针对领域应用优化性能</li>
                        <li>cpu gpu的(我猜是电路设计的原因)指令集一般都支持指令向量化（arm_neon x86 的 sse vvx）一次执行多条（4/8）条计算指令（指令可以并行执行）</li>                        
                      </ul>
                      <p><strong className='red'>因此：</strong></p>
                      <p>在算法层面：</p>
                      <ul>
                        <li>我们只能用并行编程的模型来在cpu和gpu中并发的开启多个线程来coding，所以需要考虑数据竞争的情况，需要用到锁，障碍，原子操作等处理竞争关系</li>
                        <li>gpgpu的和cpu的并行编程模型不太一样，增加了grid block thread warp 同步 等概念，算法本身需要针对硬件环境</li>
                        <li>针对精度要求可以用半精度或者更小精度，配合指令向量化一次执行多条计算（取舍）</li>
                        <li>用特定数据结构aos soa等配合cpu缓存和预取机制</li>
                      </ul>
                      <p>在内存层面：</p>
                      <ul>
                        <li>减少内存读取</li>
                        <li>提升内存读取的局部性利用CPU GPU的L1 L2缓存</li>
                        <li>利用默认的缓存prefech机制</li>
                        <li>利用硬件特制的内存，如N卡的Block shared_memory</li>
                        <li>还有一些特制的只读内存如cuda 的 texure 可以减少读取开销</li>                     
                      </ul>
                      <p><strong className='red'>还有其他办法吗</strong></p>
                      <p>在编译器层面</p>
                      <ul>
                        <li>计算图表示的层面优化：TVM代表的<a href="https://github.com/mlc-ai/notebooks">算子融合 替换</a></li>
                        <li>多面体优化 <a href='https://www.zhihu.com/question/338039895/answer/839949892' target='blank'>深度学习编译器有哪些有价值的研究方向和参考文献？</a> <a href='https://polyhedral.info/' target='blank'>https://polyhedral.info/</a></li>
                      </ul>
                      
                      <p><strong className='red'>目前：</strong></p>
                      <p>我做了什么?：</p>
                      <ul>
                        <li>cuda的练习</li>
                        <li>neon指令集的练习</li>                        
                      </ul>
                     
                      <h3>2. 相关工作</h3>
                      <p>最开始想弄cuda和编译器是由于看了taichi的分享，taichi用python前端，可以选择生成cpu还是gpu平台的代码，通过vulkan实现了跨平台metal和cuda</p>
                      <p>并且在稀疏数据结构上做了一些功夫，让代码执行效率几乎不输原生cuda</p>
                      <p><img src="https://res.cloudinary.com/dgdhoenf1/image/upload/v1680447679/cuda/04.png" alt="编译器抽象" /></p>
                      <p>这样做的好处是代码不用写c++可以更<span className='yellow'>专注于更上层的抽象</span>，默认<span className='yellow'>跨平台</span>还有<span className='yellow'>非常不错</span>的性能</p>
                      <ul>
                        <li>1. <a href='https://www.bilibili.com/video/BV1pa411S7b6/?spm_id_from=333.999.0.0&vd_source=357616f412db6079b853b68278dc03db' target='blank'>入门必备｜想要吃透 Taichi 代码库？快速区分 field 和 kernel，速览 Taichi 底层架构</a></li>
                        <li>2. <a href='https://www.bilibili.com/video/BV1RG411n7PY/?spm_id_from=333.999.0.0&vd_source=357616f412db6079b853b68278dc03db' target='blank'>原理解析 | Taichi 代码从编译到执行，都要经历哪些过程？</a></li>
                      </ul>                      
                      
                      <p>但是<span className='yellow'>坏处</span>或者说<span className='yellow'>取舍</span>也十分明显</p>
                      <p>为什么？</p>
                      <ul>
                        <li>1. 虽然给python加了语法糖，支持并行化，但是还是取消了指针和细粒度的线程控制</li>
                        <li>2. 虽然用field实现了极高性能的内存结构，稀疏数据结构，但是还是取消了细粒度的内存控制</li>
                        <li>3. 跨平台非常好用，但是对平台的支持完全依赖于taichi内部实现，不保证能完全利用该平台的新特性</li>
                      </ul>
                      <p>所以类似的工作如<a href='https://github.com/LuisaGroup/LuisaRender' target='blank'>LuisaRender/Compute</a>都是走了这个路线，只是“取舍的程度不同”</p>
                      <br></br>
                      
                      <p>这次我们从cuda的角度来看：</p>
                      <p><img src="https://res.cloudinary.com/dgdhoenf1/image/upload/v1680447679/cuda/03.png" alt="代码module" /></p>
                      <p></p>

                      <p><strong>Cuda提供了哪些功能呢？</strong></p>
                      <p><img src="https://res.cloudinary.com/dgdhoenf1/image/upload/v1680447679/cuda/05.png" all="cuda模型" /></p>
                      <ul>
                        <li>1. cublas cudnn等计算库，高效实现的矩阵计算，张量存储等常见算子和功能的封装</li>
                        <li>2. nsight compute 等新能检测工具</li>
                        <li>3. 迭代了无数版本的cuda硬件，和用户社区中的无数资料</li>
                        <li>3. cuda 编程模型，让我们给予他能开发各种应用 <a href='https://docs.nvidia.com/cuda/cuda-c-programming-guide/index.html#programming-model' target='blank'>cuda programming guide</a>
                        <br></br>
                        <img src="https://res.cloudinary.com/dgdhoenf1/image/upload/v1680619152/cuda/cuda.drawio.png" alt="cuda 功能分级"  />
                        </li>
                      </ul>

                      <h3>3. 实验设计</h3>
                      <p>此处演示，代码都在riven下</p>
                      <ul>                        
                        <li>1. openmp <pre className='code'>/openmp</pre></li>
                        <li>2. neon 指令集<pre className='code'>/neon</pre></li>
                        <li>3. Cuda 编程模型： 归并/扫描 

                          <pre className='code'>/cuda_test/warp
                            ./build/reduction
                            <br/>
                            Time= 4.202200 msec, bandwidth= 15.969936 GB/s
                            <br/>
                            host 16777216.000000, device 16981248.000000
                            <br/>
                            <br/>
                            ./build/reduction_shared 
                            <br/>
                            Time= 0.524270 msec, bandwidth= 128.004395 GB/s
                            <br/>
                            host 16777216.000000, device 16777216.000000 
                            <br/>
                            <br/>
                            ./build/wp  // block 跨步循环 + warp 原语 和 balance balance_opt 差不多
                            <br/>
                            Time= 0.262390 msec, bandwidth= 255.759979 GB/s
                            <br/>
                            host 16777216.000000, device 16777216.000000
                            <br/>
                            <br/>
                            是否有diverge
                            <br/>
                            <br/>
                            大部分为不执行（diverge）代码和shared相同
                            <br/>
                                Time= 0.514730 msec, bandwidth= 130.376831 GB/s
                            <br/>
                                host 16777216.000000, device 16777216.000000
                            <br/>
                            大部分为执行
                            <br/>
                                Time= 0.419230 msec, bandwidth= 160.076477 GB/s
                            <br/>
                                host 16777216.000000, device 16777216.000000
                            <br/>
                            <br/>
                            ./build/cg  //  协程组 默认 block level 似乎影响不大
                            <br/>
                            Time= 0.245920 msec, bandwidth= 272.889008 GB/s
                            <br/>
                            host 16777216.000000, device 16777216.000000
                            <br/>
                            <br/>
                            pipline 下还有一个grid level cg 用了 cudaLaunchCooperativeKernel 待研究
                            <br/>
                            Time= 0.092800 msec, bandwidth= 723.155884 GB/s
                            <br/>
                            host 16777216.000000, device 16777216.000000
                            <br/>
                            <br/>
                            ./build/atomic_blk  // 用 block level cg 在一个block内归并 再把block结果atomic add到全局 ， 默认atomic速度非常慢比native实现还慢五六倍
                            <br/>
                            Time= 0.248800 msec, bandwidth= 269.730164 GB/s
                            <br/>
                            host 16777216.000000, device 16777216.000000
                            <br/>
                            <br/>

                          </pre>  
                          <pre className='code'>
                            /cuda_test/pipline
                            <br />
                            手动设置stream 优先级等，似乎效果不明显
                            <br />
                            MPI 部分目前还没有做
                            <br />
                            还有一些常见操作比如 
                            <br />
                            卷积 / 扫描 / 快排等
                            <br />
                            多体问题 - 向量化
                          </pre> 
                        </li>
                        <li>4. Cuda 只读内存（在流体模拟里）</li>
                        <li>5. Cuda 常见库：实现一个cuda神经网络【TODO】 <pre className='code'>/cuda_test/nn</pre></li>
                        <li>6. Cuda 实现拉格朗日流体模拟【TODO】 <pre className='code'>/cuda_fluid</pre></li>
                        <li>7. 混合精度【TODO】</li>
                        <li>8. TVM 入门练习【TODO】<a href='https://github.com/mlc-ai/notebooks' target='blank' >TVM Relay Relax</a>  额外资料：<a href='https://github.com/openmlsys/openmlsys-zh' target='blank'>机器学习系统</a></li>
                        <li>9. 用nsight compute来performance gdb debugger</li>
                      </ul>

                      <h3>4. 实验结果</h3>
                      <ul>
                        <li>内存往往昂贵于计算
                          <br></br>
                          <img src="https://res.cloudinary.com/dgdhoenf1/image/upload/v1680619152/cuda/memory-hierarchy.png" alt="cuda 内存层级" width="640"  />
                          
                        </li>
                        <li>L1 L2 缓存和prefecth机制影响很大（内存局部性）</li>
                        <li>低精度量化对减少内存开销影响很大</li>
                        <li>向量化指令集速度很快，但是各个平台不兼容难以统一处理</li>
                        <li>最优化循环的gridsize blocksize，协程组，warp diverge bank conflict其实对结果的影响没那么大</li>
                        <li>cuda sample 中的helper 封装了 cuda error code 转文字 和 timing记时的函数</li>
                        <li>cuda 有些比较偏门的功能和概念 比如 unified memory 和 cluster 也不知兼容性和实际性能如何</li>
                      </ul>
                      <p>一些bug</p>
                      <ul>
                        <li>M1下CMake下和直接clang++编译neon指令集表现不同</li>
                        <li>Learn cuda programming 中 gemm 矩阵乘法的实现是有问题的 需要重新实现 比如参考 <a href='https://github.com/NVIDIA/cutlass' target='blanl'>cutlass</a> <a href='https://bluewaters.ncsa.illinois.edu/liferay-content/image-gallery/content/BLA-final' target="blank">其他资料</a></li>
                      </ul>
                      <h3>5. 总结和展望</h3>
                      <ul>
                        <li>后面会自己实现gemm对比效率</li>
                        <li>熟悉cuda的半精度和warp源，加深对cuda编程模型的理解</li>
                        <li>解决Nsight compute 不能跑的一些bug，测试和熟悉trace profile的详细功能</li>
                        <li>会加紧练习光线追踪和物理渲染的其他应用</li>                        
                        <li>会加紧<a href="<a href='https://github.com/chenzomi12/DeepLearningSystem" target="blank">了解编译器相关知识</a>，针对各个平台的实现目前还在蛮荒时代，需要做一些自动优化的工具</li>
                        <li>后面参考和学习fastertransformer oneflow tensorrt 之类的实现</li>
                        <li>openmpi nccl RDMA megatron deepspeed等？</li>
                        <li>SOC RISC-V 微架构等？</li>
                      </ul>

                      <h3>6. 参考资料</h3>
                      <ul>
                        <li>1.《Learn CUDA Programming》<a href='https://github.com/PacktPublishing/Learn-CUDA-Programming' target="blank">Code Example</a> CUDA 入门书 </li>
                        <li>2.《并行编程方法与优化实践》第二版 （刘文志）</li>
                        <li>3. 高性能并行编程与优化 from 双笙子佯谬 <a href='https://space.bilibili.com/263032155/channel/collectiondetail?sid=53025' target="blank">B站视频</a></li>
                        <li>4. <strong className='red'>强烈推荐</strong> Oneflow团队的 <a href='http://giantpandacv.com/project/OneFlow/' target="blank">Gaintpandacv博客</a>涵盖指令集/编译器/各种backend实践</li>
                        <li>5. 陈天奇的MLC课程 <a href='https://mlc.ai' target="blank">https://mlc.ai（文档和作业）</a> 和 <a href='https://space.bilibili.com/1663273796/channel/series' target="blank">B站视频</a></li>
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