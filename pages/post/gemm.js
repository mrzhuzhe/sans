import DisqusBox from '../../components/disqus'
import Header from '../../components/header'
import Footer from '../../components/footer'
import KeywordsTags from '../../components/keywordsTags'

export async function getStaticProps() {
    
  const data = {
      data: {
        Post: {
                  id: "gemm",
                  title: "【HPC 05】Cuda实现GEMM和卷积",
                  publishedDate: "2023-5-12",
                  brief: "cpu 和 GPU 的 GEMM 实现，CUDA卷积",
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
                      <ul>
                        <li>1. CPU GEMM 的路径 pack 分块 SIMD </li>
                        <li>2. GPU GEMM 的路径 winogard img2col qnnpack </li>
                        <li>3. CPU 和 GPU 卷积</li>
                        <li>4. L1 L2 </li>
                        <li>5. </li>
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
                      <p>GEMM 相关</p>
                      <ul>
                        <li>1. 从分块到汇编指令排部 https://github.com/flame/blislab</li>
                        <li>2. BLISlab 前三段的解释 https://github.com/flame/how-to-optimize-gemm/</li>
                        <li>3. 以上内容的补充解释 https://zhuanlan.zhihu.com/p/65436463</li>
                        <li>4. 混合精度综述 https://zhuanlan.zhihu.com/p/66958390</li>
                        <li>5. ncnn https://zhuanlan.zhihu.com/p/457443433</li>
                      </ul>
                      <p>CUDA GEMM</p>
                      <ul>
                        <li>1. https://zhuanlan.zhihu.com/p/478846788</li>
                        <li>2. cuda convnet https://code.google.com/archive/p/cuda-convnet/</li>
                        <li>3. caffe https://github.com/Yangqing/caffe/wiki/Convolution-in-Caffe:-a-memo</li>
                        <li>4. cutlass</li>
                        <li>5. mega conv https://zhuanlan.zhihu.com/p/372973726</li>
                        <li>6. gemm 到 cublas https://zhuanlan.zhihu.com/p/518857175</li>
                      </ul>
                      <p>完整自定义算子项目</p>
                      <ul>
                        <li>1. 自定义精简版推理库 https://github.com/zjhellofss/KuiperInfer</li>
                        <li>2. ncnn https://github.com/Tencent/ncnn</li>
                        <li>3. faster-transformer</li>
                      </ul>
                      <p>PERF工具</p>
                      <ul>
                        <li>1. perf https://zhuanlan.zhihu.com/p/471379451</li>
                      </ul>
                      <p>混合精度</p>
                      <ul>
                        <li>1. https://github.com/google/gemmlowp</li>
                        <li>2. qnnpack https://engineering.fb.com/2018/10/29/ml-applications/qnnpack/</li>
                        <li>3. nvidia apex https://github.com/NVIDIA/apex 混合精度</li>
                        <li>4. 半精度模拟单精度 https://arxiv.org/abs/2203.03341 作者博客 https://enp1s0.github.io/</li>                                                
                      </ul>
                      <p>量化</p>
                      <ul>
                        <li>1. 综述：https://zhuanlan.zhihu.com/p/58182172</li>
                      </ul>
                      <p>数值计算</p>
                      <ul>
                        <li>1. 高性能求解器 https://www.bilibili.com/video/BV1LB4y1p7QP/?spm_id_from=pageDriver&vd_source=357616f412db6079b853b68278dc03db</li>
                        <li>quant-taichi</li>
                      </ul>
                      <p>体系结构</p>
                      <ul>
                        <li>1. L1 L2 https://zhuanlan.zhihu.com/p/488531131</li>
                        <li>2. SIMD 指令排布</li>
                        <li>3. <span className='red'>cuda 体系结构的逆向分析</span>（极其推荐） https://zhuanlan.zhihu.com/p/166180054 cuAssemble https://zhuanlan.zhihu.com/p/348234642</li>
                      </ul>
                      <p>LLVM</p>
                      <p>TVM</p>
                      <ul>
                        <li>halide</li>                      
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