import DisqusBox from '../../components/disqus'
import Header from '../../components/header'
import Footer from '../../components/footer'
import KeywordsTags from '../../components/keywordsTags'

export async function getStaticProps() {
    
  const data = {
      data: {
        Post: {
                  id: "kaggleFail",
                  title: "2021-回顾和计划",
                  publishedDate: "2021/09/10",
                  brief: "之前定的目标的回顾，如何提问题，和解决问题，以后怎么办",
                  categories: [{name: "杂谈" }]  
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
                    { /* start */ }
                      
                      <h3>目录</h3>
                      <p>
                        <ul>
                          <li>1. 之前的计划</li>
                          <li>2. 了解的东西</li>
                          <li>3. 做的东西</li>
                          <li>4. 参加的比赛</li>
                          <li>5. 工厂的活儿</li>
                          <li>6. 做的好的</li>
                          <li>7. 做的不好的</li>
                          <li>8. 接下来的计划</li>
                        </ul>
                      </p>

                      <h3>1. 之前的计划</h3>
                      <p>
                        2021年初终于结束了7年半的奋斗逼生涯。
                        <br />
                        不想干了的主要原因是：现有的工作无论是技术上看起来只会越做越差。
                        <br />
                        而如果一直不做出取舍，浪费时间只会让自己离想做的工作越来越远。
                        <br />
                      </p>
                      <p>
                        在离职之前3年，我就确定了转型的计划。
                        <br />
                        19年中旬到21年1月，我挤出很多业余时间看了一些网上的教程。
                        <br />
                        定了一个粗略的方向
                        <ul>
                          <li>1. 机器学习</li>
                          <li>2. 安全</li>
                        </ul>
                        为什么选这两个方向呢？后面会详细说。
                      </p>
                      <p>
                        最早我看的网上的教程是：吴恩达的机器学习 和 gilbert strange的线性代数。
                        <br />
                        从这两个课程为起点，我补了数学分析相关的很多基础课程
                      </p>
                    { /* end */ }
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