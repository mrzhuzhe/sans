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
                      <p>本次实现了</p>
                      <ul>
                        <li>1. CPU GEMM 的方向 SIMD分块 &gt; 内存pack分块 </li>
                        <li>2. GPU GEMM 的优化方向 shared memory &gt; stride &gt; warp &gt; cutlass</li>
                        <li>3. CPU 和 GPU 卷积 navie 实现 &gt;  Winogard Img2col Qnnpack （TODO）</li>
                      </ul>

                      <h3>2. 相关工作</h3>
                      <p>BLAS基础线性代数库研究的目标：</p>
                      <ul>
                        <li>矩阵乘法</li>
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
                          5. TODO blis lab2
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