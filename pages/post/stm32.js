import DisqusBox from '../../components/disqus'
import Header from '../../components/header'
import Footer from '../../components/footer'
import KeywordsTags from '../../components/keywordsTags'

export async function getStaticProps() {
    
  const data = {
      data: {
        Post: {
                  id: "stm32",
                  title: "【Sim2real】03 用opencm3开发 stm32f107c8t6",
                  publishedDate: "2024-10-26",
                  brief: " 基于 opencm3 尝试了开发 stm32f107c8t6最小系统板的嵌入式开发， 搭建了Gcc toolchain, 测试了 UART USB I2C SPI 等通信协议, PWM ADC 等数模转换, CAN 总线等 ",
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
                      <p>目标：开发自定义硬件</p> 
                      <p>阅读<a href='https://lwn.net/Kernel/LDD3/' target='_blank'>《Linux Device Drivers, Third Edition》</a>这本书有了一个初步的概念</p> 
                      <p>操作系统包含</p> 
                      <ul>
                        <li>区分内核态和用户态</li>
                        <li>内核态支持系统调用</li>
                        <li>内核负责：内存管理，文件系统，中断处理，任务schedule,网络协议等</li>
                        <li>内核和硬件EPROM固件通信，通过固件来操作寄存器和内存来命令硬件</li>
                        <li>硬件电路由VHDL定义，ALU risc-spm, uart transmitter等IP模块来支持固件, 参考《advanced digital design with the verilog hdl》By Michael D. Ciletti</li>
                      </ul>   
                      <p>练习： </p>       
                      <ul>
                        <li>之前参考<a href='https://wiki.osdev.org/Bare_Bones' target="_blank">osdev.org</a>做了一些 x86 系统boot / 驱动 的练习</li>
                        <li><p>希望有个平台可以尝试固件的开发，因此搜索到了STM32平台</p>
                            <p>本次使用 stm32f107c8t6 最小系统板 </p>
                            <p><img src="https://res.cloudinary.com/dgdhoenf1/image/upload/v1729952175/stm32/stm32.jpg" width="960" /></p>
                        </li>
                      </ul>                                           
                      <br />
                      <h3>2. 相关工作</h3>
                      <ul>
                        <li>本次的练习大量参考了 <a href='https://www.bilibili.com/video/BV1th411z7sn/?spm_id_from=333.999.0.0' target="_blank">江协科技《STM32入门教程-2023版》</a>  
                        &nbsp; 和<a href='https://github.com/coderwhq/learning-STM32' target="_blank">一位网友的代码</a></li>
                        <li>Opencm3 部分参考了 <a href='https://github.com/ve3wwg/stm32f103c8t6' target="_blank">《Beginning STM32 : Developing with FreeRTOS, libopencm3 and GCC》</a></li>
                        <li>stm32f1xx 系列<a href='https://www.st.com/resource/en/reference_manual/rm0008-stm32f101xx-stm32f102xx-stm32f103xx-stm32f105xx-and-stm32f107xx-advanced-armbased-32bit-mcus-stmicroelectronics.pdf' target="_blank">产品手册 RM0008</a> 详细列出了每一种协议和功能的所需配置</li>
                      </ul>

                      <h3>3. 演示</h3>
                      <ul>
                        <li><p>演示1： PWM 控制电机</p>
                        <p>Todo 此处添加b站演示</p></li>
                        <li><p>演示2： A2D 读取传感器</p>
                        <p>Todo 此处添加b站演示</p></li>
                        <li><p>演示3： UART tty通信</p>
                          <div className='code'>
                            # 注意这里要设置波特率 <br />
                            # baud rate to 38400, 8 bits, 1 stop bit, no parity: <br />
                            $chmod 666 /dev/ttyUSB0 <br />
                            $stty -F /dev/ttyUSB0 38400 cs8 -cstopb -parenb -echo -icanon -onlcr
                          </div>
                        </li>
                      </ul>
                      
                      <h3>4. 实验设计和结果</h3>
                      <ul>
                        <li>GPIO
                          <p><a href='https://github.com/mrzhuzhe/peasant/blob/main/stm32/CrossCompile.md' target="_blank">arm-none-eabi 交叉编译环境如何设置看这里</a></p>
                          <p>下载 opencm3 stlink-v2 freertos 的代码并编译</p>
                          <p> 得到一个这样的目录结构，对应makefile中寻找freertos和opencm3依赖库的路径</p>
                          <p><img src="https://res.cloudinary.com/dgdhoenf1/image/upload/v1730013957/stm32/Screenshot_from_2024-10-27_15-22-17.png" width="320"/></p>                         
                          <p>工程模板</p>
                          <div className='code'>
                            // GPIO 测试， 仅使用opencm3 <br />
                            /stm32/led_test/ <br />
                            <br />
                            // rtos gpio 测试 <br />
                            /stm32/rtos-template <br />
                          </div>
                          <p>注意其中 stm32f103c8t6.ld 指定了代码段的内存分布</p>
                        </li>
                        <li>I2C
                          <p>用来和OLED， tb6612cnf电机控制器，MPU6050陀螺仪等外设通信</p>
                          <div className='code'>
                            // 用软件i2c连接oled和mpu6050陀螺仪<br />
                            /stm32/rtos-mpu<br />
                            <br />
                            // 用软件i2c连接oled<br />
                            /stm32/rtos-oled
                          </div>
                          <br />
                        </li>
                        <li>SPI
                          <p>用来和winbond w25q64外部flash芯片通信，速度更快</p>
                          <p>Todo 目前芯片烧了 待验证</p>
                        </li>
                        <li>UART
                          <p>用来和电脑 ttyUSB 通信</p>
                          <div className='code'>
                            // uart 通信<br />
                            /stm32/uart_test/
                          </div>
                          <br />
                        </li>
                        <li>USB
                          <p>USB cdc 串口通信</p>
                          <div className='code'>
                            // usb 连接 , 【注意】用这个连接时一定要拔掉电源，因为usb本身就是电源<br />
                            /stm32/rtos-usbcdc
                          </div>
                          <br />
                        </li>
                        <li>A2D
                          <p>用来接各种外部传感器</p>
                          <div className='code'>
                            // 模拟信号转换为数字信号<br />
                            /stm32/rtos-adc
                          </div>
                          <br />
                        </li>
                        <li>PWM
                          <p>用来把数字信号转为模拟信号，驱动外部电机，舵机等，需要用到TIM</p>
                          <div className='code'>
                            // pwn 驱动舵机和电机 用的电机控制芯片是 tb6612fng<br />
                            /stm32/pwm
                          </div>
                          <br />
                        </li>
                        <li>DMA
                          <p>代替cpu来访问内存，节约CPU io开销，可以用来篡改内存</p>
                          <div className='code'>
                            // 用dma搬运adc数据<br />
                            /stm32/rtos-dma
                          </div>
                          <br />
                        </li>
                        <li>CAN 总线
                          <p>用来在多个设备之间通过统一的通信协议通信，距离远抗干扰</p>
                          <p>这里因为我只有一个芯片，所以开启了回环模式，在一个芯片里也可以xmit 和 receive</p>
                          <div className='code'>
                            // can 总线<br />
                            /stm32/rtos-can
                          </div>
                        </li>
                      </ul>

                      <h3>5. 遇到的问题</h3>
                      
                      <ul>
                        <li>
                          <p>1. STlink 有debug的功能，在接通的情况下可以直接debug stm32单片机中的代码</p>
                          <div className='code'>
                          #启动远程调试server<br />
                          $st-util -p 4500<br />
                          #启动arm gdb<br />
                          $arm-none-eabi-gdb<br />
                          (arm-none-eabi-gdb) target extended-remote localhost:4500<br />

                          (arm-none-eabi-gdb) file your_path/your app.elf
                          </div>
                          <br />
                        </li>
                        <li>
                          <p>2. 有时如果有代码禁用了stm32 开发板上对应 stlink的IO 引脚 pin</p>
                          <p>会导致无法flash烧录代码，这个时候需要按住reset模式，再用stlink erase删除flash中的代码才能继续烧录</p>
                          <br />
                        </li>
                      </ul>
                      
                      
                      <h3>6. 后续工作</h3>                      
                      <ul>
                        <li>1. 后续会结合 <a href='https://docs.kernel.org/' target="_blank">https://docs.kernel.org/</a> 和 <a href='https://github.com/ROCm/ROCm' target="_blank">ROCm</a> 和 龙芯 等开源硬件平台 练习开发操作系统内核和驱动 </li>                      
                        <li>2. wifi 模块 / I2C 拓展板等 继续熟悉stm32的各种细节 </li>
                        <li>3. PCIE总线 </li>
                        <li>4.  <a href='https://github.com/tianocore/edk2' target="_blank">UEFI tianoCore</a> 固件平台</li>
                        <li>5. 通过Fpga开发板尝试常见IP模块的实现</li>
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