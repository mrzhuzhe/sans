import DisqusBox from '../../components/disqus'
import Header from '../../components/header'
import Footer from '../../components/footer'
import KeywordsTags from '../../components/keywordsTags'

export async function getStaticProps() {
    
  const data = {
      data: {
        Post: {
                  id: "gemm",
                  title: "【HPC 05】CPU 和 CUDA 的 BLAS",
                  publishedDate: "2023-5-12",
                  brief: "CPU 和 GPU 的 GEMM 实现，CUDA卷积",
                  categories: [{name: "HPC" }]  
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
                    <h3 className="code">代码：<a href='###' target="_blank">https://github.com/mrzhuzhe/riven</a></h3>
                      <h3>1. 概述</h3>
                      <p>BLAS Basic Linear Algebra Subprograms 就是指线性代数基础库，内容是矩阵乘法在多种硬件如x86和ARM/CPU/GPU上的实现，一般会作为其他库的底层模块来调用</p>
                      <p>市面上比较好的实现有openBLAS/intelMKL/Eigen等</p>
                      <p>这个最主要的意义是：理解矩阵成法可以用硬件的哪些特性来优化，总结优化方法的模式pattern，可以广泛的推广用在其他定制算子开发设计中</p>
                      <p>本次实现了</p>
                      <ul>
                        <li>1. CPU 的 GEMM： SIMD分块 &gt; 内存pack分块 &gt; AVX 和 SSE 指令集的细粒度调优 &gt; 汇编指令优化 </li>
                        <li>2. GPU GEMM 的优化方向 shared memory &gt; stride &gt; warp &gt; cutlass【TODO】</li>
                        <li>3. CPU 和 GPU 卷积 navie 实现 &gt;  Winogard Img2col Qnnpack 【TODO】</li>
                      </ul>
                      <p>这是我的Cpu信息</p>
                      <div className='code'>
                          Architecture:                    x86_64<br></br>
                          CPU op-mode(s):                  32-bit, 64-bit<br></br>
                          Byte Order:                      Little Endian<br></br>
                          Address sizes:                   39 bits physical, 48 bits virtual<br></br>
                          CPU(s):                          16<br></br>
                          On-line CPU(s) list:             0-15<br></br>
                          Thread(s) per core:              2<br></br>
                          Core(s) per socket:              8<br></br>
                          Socket(s):                       1<br></br>
                          NUMA node(s):                    1<br></br>
                          Vendor ID:                       GenuineIntel<br></br>
                          CPU family:                      6<br></br>
                          Model:                           167<br></br>
                          Model name:                      11th Gen Intel(R) Core(TM) i9-11900 @ 2.50GHz<br></br>                                                          
                          Stepping:                        1<br></br>
                          CPU MHz:                         2500.000<br></br>
                          CPU max MHz:                     5200.0000<br></br>
                          CPU min MHz:                     800.0000<br></br>
                          BogoMIPS:                        4992.00<br></br>
                          Virtualization:                  VT-x<br></br>
                          L1d cache:                       384 KiB<br></br>
                          L1i cache:                       256 KiB<br></br>
                          L2 cache:                        4 MiB<br></br>
                          L3 cache:                        16 MiB<br></br>
                          NUMA node0 CPU(s):               0-15<br></br>
                          Vulnerability Itlb multihit:     Not affected<br></br>
                          Vulnerability L1tf:              Not affected<br></br>
                          Vulnerability Mds:               Not affected<br></br>
                          Vulnerability Meltdown:          Not affected<br></br>
                          Vulnerability Mmio stale data:   Mitigation; Clear CPU buffers; SMT vulnerable<br></br>
                          Vulnerability Retbleed:          Mitigation; Enhanced IBRS<br></br>
                          Vulnerability Spec store bypass: Mitigation; Speculative Store Bypass disabl
                                                          ed via prctl and seccomp<br></br>
                          Vulnerability Spectre v1:        Mitigation; usercopy/swapgs barriers and __
                                                          user pointer sanitization<br></br>
                          Vulnerability Spectre v2:        Mitigation; Enhanced IBRS, IBPB conditional
                                                          , RSB filling, PBRSB-eIBRS SW sequence<br></br>
                          Vulnerability Srbds:             Not affected<br></br>
                          Vulnerability Tsx async abort:   Not affected<br></br>
                          Flags:                           fpu vme de pse tsc msr pae mce cx8 apic sep
                                                            mtrr pge mca cmov pat pse36 clflush dts ac
                                                          pi mmx fxsr sse sse2 ss ht tm pbe syscall n
                                                          x pdpe1gb rdtscp lm constant_tsc art arch_p
                                                          erfmon pebs bts rep_good nopl xtopology non
                                                          stop_tsc cpuid aperfmperf tsc_known_freq pn
                                                          i pclmulqdq dtes64 monitor ds_cpl vmx smx e
                                                          st tm2 ssse3 sdbg fma cx16 xtpr pdcm pcid s
                                                          se4_1 sse4_2 x2apic movbe popcnt tsc_deadli
                                                          ne_timer aes xsave avx f16c rdrand lahf_lm 
                                                          abm 3dnowprefetch cpuid_fault epb invpcid_s
                                                          ingle ssbd ibrs ibpb stibp ibrs_enhanced tp
                                                          r_shadow vnmi flexpriority ept vpid ept_ad 
                                                          fsgsbase tsc_adjust bmi1 avx2 smep bmi2 erm
                                                          s invpcid mpx avx512f avx512dq rdseed adx s
                                                          map avx512ifma clflushopt intel_pt avx512cd
                                                            sha_ni avx512bw avx512vl xsaveopt xsavec x
                                                          getbv1 xsaves dtherm ida arat pln pts hwp h
                                                          wp_notify hwp_act_window hwp_epp hwp_pkg_re
                                                          q avx512vbmi umip pku ospke avx512_vbmi2 gf
                                                          ni vaes vpclmulqdq avx512_vnni avx512_bital
                                                          g avx512_vpopcntdq rdpid fsrm md_clear flus
                                                          h_l1d arch_capabilities
                          </div>

                      <h3>2. 相关工作</h3>
                      <p>为什矩阵乘法这么重要：</p>
                      <ul>
                        <li>因为矩阵乘法是 卷积/线性方程度直接求解/迭代求解的基础</li>
                        <li>卷积转化为矩阵乘法</li>
                        <li>稀疏矩阵乘法</li>
                      </ul>
                      <p>用途</p>
                      <ul>
                        <li>信号处理FFT</li>
                        <li><strong className='red'>解线性微分方程方程</strong> 最优化问题/动力学/深度学习贝叶斯 等</li>
                      </ul>
                      <p>需要大量用到的知识：计算机体系结构</p>
                      <ul>
                        <li>L-cache</li>
                        <li>GPU 体系结构 异构众核硬件 </li>
                        <li>内存通信（TODO）</li>
                      </ul>

                      <h3>3. 实验设计</h3>
                      <p>CPU 下 GEMM</p>
                      <ul>
                        <li>
                          1. 循环跨步:一个循环中进行多次操作 4次 
                          <span className='code'>riven/gemm/src/MMult5.c</span>
                        </li>
                        <li>
                          2. 使用寄存器 减少内存读取
                          <span className='code'>riven/gemm/src/MMult6.c</span>
                        </li>
                        <li>
                          3. 4x4分块，并且手动开启SIMD指令
                          <span className='code'>riven/gemm/src/MMult16.c</span>
                        </li>
                        <li>
                          4. 对矩阵大小进行z轴分块，注意必须先把分块好的矩阵存下来访问才能触发L1缓存 注意这个函数：PackMatrixA
                          <span className='code'>
                            riven/gemm/src/MMult18.c                           
                          </span>    
                          <br />
                          另外注意pack其实只需pack一次，如果每次都pack反而会引起性能下降                     
                        </li>
                        <li>                          
                          5.  到这一步就已经抵达了 Blislab的 Step3 不同的是 BLISLab 提供了除了默认的AVX SIMD指令版本 还提供了汇编的版本的MICRO KERNEL 内层循环
                          <img src="https://res.cloudinary.com/dgdhoenf1/image/upload/v1684080758/gemm/01.jpg" alt="这个版本的整体架构图"></img>
                          <br></br>似乎blislab的手写asm 比 avx 性能低 
                          <br></br>而 8x6 6x8 12*4 在 x86 上有问题
                          
                          <br></br>【TODO】把十三年前学的汇编都忘光了，补习中
                        </li>
                        <li>
                          6. 多核 【TODO】注意和对比 private 和 shared 的设置
                        </li>
                        <li>
                          7. arm 和 single
                        </li>
                      </ul>
                      <p>GPU 下 GEMM</p>
                      <ul>
                        <li>1. v2 使用shared memory </li>
                        <li>2. v3 跨步循环减少 BLOCK数量</li>
                        <li>3. v5 内存对齐</li>
                        <li>4. v6 warp 优化 【TODO】后续内容 7 8 9</li>
                      </ul>
                      <p>GPU 下 卷积</p>
                      <ul>
                        <li>1. v1 shared memory 并未加速</li>
                        <li>2. v3 纹理并未加速</li>
                        
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
                      <p>GEMM 相关</p>
                      <ul>
                        <li>1. 从分块到汇编指令排部 <a href="https://github.com/flame/blislab" target="blank">https://github.com/flame/blislab</a></li>
                        <li>2. BLISlab 前三段的解释 <a href="https://github.com/flame/how-to-optimize-gemm/" target="blank">https://github.com/flame/how-to-optimize-gemm/</a></li>
                        <li>3. 以上内容的补充解释 <a href="https://zhuanlan.zhihu.com/p/65436463" target="blank">https://zhuanlan.zhihu.com/p/65436463</a></li>
                        <li>4. 混合精度综述 <a href="https://zhuanlan.zhihu.com/p/66958390" target="blank">https://zhuanlan.zhihu.com/p/66958390</a></li>
                        <li>5. Ncnn <a href="https://zhuanlan.zhihu.com/p/457443433" target="blank">https://zhuanlan.zhihu.com/p/457443433</a></li>
                      </ul>
                      <p>CUDA GEMM</p>
                      <ul>
                        <li>1. <a href="https://zhuanlan.zhihu.com/p/478846788" target="blank">https://zhuanlan.zhihu.com/p/478846788</a></li>
                        <li>2. Cuda ConvNet <a href="https://code.google.com/archive/p/cuda-convnet/" target="blank">https://code.google.com/archive/p/cuda-convnet/</a></li>
                        <li>3. Caffe <a href="https://github.com/Yangqing/caffe/wiki/Convolution-in-Caffe:-a-memo" target="blank">https://github.com/Yangqing/caffe/wiki/Convolution-in-Caffe:-a-memo</a></li>
                        <li>4. Cutlass</li>
                        <li>5. Mega Conv <a href="https://zhuanlan.zhihu.com/p/372973726" target="blank">https://zhuanlan.zhihu.com/p/372973726</a></li>
                        <li>6. Gemm 到 Cublas <a href="https://zhuanlan.zhihu.com/p/518857175" target="blank">https://zhuanlan.zhihu.com/p/518857175</a></li>
                      </ul>
                      <p>完整自定义算子项目</p>
                      <ul>
                        <li>1. 自定义精简版推理库 <a href="https://github.com/zjhellofss/KuiperInfer" target="blank">https://github.com/zjhellofss/KuiperInfer</a></li>
                        <li>2. Ncnn <a href="https://github.com/Tencent/ncnn" target="blank">https://github.com/Tencent/ncnn</a></li>
                        <li>3. Faster-transformer</li>
                      </ul>
                      <p>PERF工具</p>
                      <ul>
                        <li>1. Perf <a href="https://zhuanlan.zhihu.com/p/471379451" target="blank">https://zhuanlan.zhihu.com/p/471379451</a></li>                        
                      </ul>
                      <p>混合精度</p>
                      <ul>
                        <li>1. <a href="https://github.com/google/gemmlowp" target="blank">https://github.com/google/gemmlowp</a></li>
                        <li>2. Qnnpack <a href="https://engineering.fb.com/2018/10/29/ml-applications/qnnpack/" target="blank">https://engineering.fb.com/2018/10/29/ml-applications/qnnpack/</a></li>
                        <li>3. Nvidia Apex <a href="https://github.com/NVIDIA/apex" target="blank">https://github.com/NVIDIA/apex</a> 混合精度</li>
                        <li>4. 半精度模拟单精度 <a href="https://arxiv.org/abs/2203.03341" target="blank">https://arxiv.org/abs/2203.03341</a> 作者博客 <a href="https://enp1s0.github.io/" target="blank">https://enp1s0.github.io/</a></li>                                                
                      </ul>
                      <p>量化</p>
                      <ul>
                        <li>1. 综述：<a href="https://zhuanlan.zhihu.com/p/58182172" target="blank">https://zhuanlan.zhihu.com/p/58182172</a></li>
                      </ul>
                      <p>数值计算</p>
                      <ul>
                        <li>1. 混合精度求解器 <a href="https://www.bilibili.com/video/BV1LB4y1p7QP/" target="blank">https://www.bilibili.com/video/BV1LB4y1p7QP/</a></li>
                        <li>2. Quant-taichi</li>
                      </ul>
                      <p>体系结构</p>
                      <ul>
                        <li>1. L1 L2 <a href="https://zhuanlan.zhihu.com/p/488531131" target="blank">https://zhuanlan.zhihu.com/p/488531131</a></li>
                        <li>2. <strong className='red'>Cuda 体系结构的逆向分析（极其推荐）</strong> <a href="https://zhuanlan.zhihu.com/p/166180054" target="blank">https://zhuanlan.zhihu.com/p/166180054</a> CuAssemble <a href="https://zhuanlan.zhihu.com/p/348234642" target="blank">https://zhuanlan.zhihu.com/p/348234642</a></li>
                      </ul>
                      <h3>后续</h3>
                      <ul>
                        <li>稀疏矩阵求解</li>
                        <li>SIMD 指令排布</li>
                        <li>CuAssemble</li>
                        <li>Arm 下 powerperf nvidia nsight compute</li>
                        <li>TVM halide 发展历史</li>
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