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
                  brief: "搭建了Gcc toolchain 基于 opencm3 开发 stm32f103c8t6, 测试了 UART USB I2C SPI 等通信协议, PWM ADC 等数模转换, CAN 总线等 ",
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
                      <ul>
                        <li></li>
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
                        <li></li>
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