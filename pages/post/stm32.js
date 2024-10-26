import DisqusBox from '../../components/disqus'
import Header from '../../components/header'
import Footer from '../../components/footer'
import KeywordsTags from '../../components/keywordsTags'

export async function getStaticProps() {
    
  const data = {
      data: {
        Post: {
                  id: "stm32",
                  title: "【Sim2real】03 用opencm3开发stm32f1",
                  publishedDate: "2024-10-26",
                  brief: " 基于 opencm3 尝试了开发 stm32f103c8t6最小系统板的嵌入式开发， 搭建了Gcc toolchain, 测试了 UART USB I2C SPI 等通信协议, PWM ADC 等数模转换, CAN 总线等 ",
                  categories: [{name: "stm32" }, {name: "opencm3" }, {name: "rtos" }]  
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
                    <h3 className="code">代码：<a href='https://github.com/mrzhuzhe/peasant/tree/main/stm32' target="_blank">https://github.com/mrzhuzhe/peasant/tree/main/stm32</a></h3>
                      <h3>1. 概述</h3>
                      之前参考<a href='https://wiki.osdev.org/Bare_Bones' target="_blank">osdev.org</a>做了一些 x86 系统boot / 驱动 的练习
                      <ul>
                        <li>启动流程 https://github.com/mrzhuzhe/peasant/tree/main/boot_test  </li>
                        <li>内核模块 https://github.com/mrzhuzhe/peasant/tree/main/kernel_test </li>
                      </ul>
                      希望有个平台可以尝试固件的开发，因此搜索到了STM32平台
                      &nbsp;
                      <br />

                      <h3>2. 相关工作</h3>
                      <ul>
                        <li>VHDL IP核 </li>
                        <li>firmware固件开发</li>
                        <li>驱动开发</li>
                        <li>内核开发</li>
                      </ul>

                      <h3>3. 实验设计</h3>
                      <ul>
                        <li>GPIO</li>
                        <li>I2C</li>
                        <li>SPI</li>
                        <li>UART</li>
                        <li>USB</li>
                        <li>A2D</li>
                        <li>PWM</li>
                        <li>DMA</li>
                        <li>CAN 总线</li>
                      </ul>

                      <h3>4. 实验结果</h3>
                      <ul>
                        <li>演示1： PWM 控制电机</li>
                        <li>演示2： A2D 读取传感器</li>
                        <li>演示3： UART tty通信</li>
                      </ul>


                      <h3>5. 总结和展望</h3>
                      结合AMD的HSA标准和ROCm openstak开发CPU 和 GPU驱动
                      <ul>
                        <li>1. HSA </li>
                        <li>2. ROCm </li>
                        <li>3. kernel.org </li>
                      </ul>
                      <br />
                      后续工作
                      <ul>
                        <li>1. wifi 模块 / I2C 拓展板等 </li>
                        <li>2. PCIE总线 </li>
                        <li>3. UEFI tianoCore </li>
                      </ul>

                      <h3>6. 参考资料</h3>
                      <ul>
                        <li>1. 《Beginning STM32 : Developing with FreeRTOS, libopencm3 and GCC》https://github.com/ve3wwg/stm32f103c8t6 </li>
                        <li>2. 江协科技《STM32入门教程-2023版》 https://www.bilibili.com/video/BV1th411z7sn/?spm_id_from=333.999.0.0 https://github.com/coderwhq/learning-STM32 </li>
                        <li>3. Stm32 手册 rm0008 https://www.st.com/resource/en/reference_manual/rm0008-stm32f101xx-stm32f102xx-stm32f103xx-stm32f105xx-and-stm32f107xx-advanced-armbased-32bit-mcus-stmicroelectronics.pdf</li>
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