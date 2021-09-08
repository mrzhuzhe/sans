import DisqusBox from '../../components/disqus'

export async function getStaticProps() {
    
  const data = {
      data: {
        Post: {
                  id: "covid19",
                  title: "SIIM covid19比赛总结",
                  publishedDate: "2021-09-08",
                  brief: "",
                  categories: [{name: "cv" }, {name: "kaggle" }]  
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
            <header className="w3-panel w3-center w3-opacity" style={{ padding: "128px 16px" }}>
            <h1 className="w3-xlarge">Starofus</h1>
            <h1>你好呀，我是Sans</h1>    
            <div className="w3-padding-32">
                <div className="w3-bar w3-border">
                <a href="/index" className="w3-bar-item w3-button">Home</a>
                <a href="/list" className="w3-bar-item w3-button w3-light-grey">Works</a>
                <a href="https://github.com/mrzhuzhe" className="w3-bar-item w3-button">Github</a>
                <a href="/contact" className="w3-bar-item w3-button">Contact</a>
                </div>
            </div>
            </header>
            { /* Context */ }
            <div className="w3-row-padding" >
                <div className="post postdetail" >
                    <h3 className="title" >{_post.title}</h3>
                    <div className="date">{_post.publishedDate}</div>
                    <p className="bref">{_post.brief}</p>
                    <div className="extended">
                        <h3>目录</h3>
                        <ul>
                            <li>1. 概述</li>
                            <li>2. 问题分析</li>
                            <li>3. Baseline</li>
                            <li>4. 度量指标Map的bug</li>
                            <li>5. 我的实验记录</li>
                            <li>6. top方案</li>
                            <li>7. 展望</li>
                        </ul>
                        <h3>1. 概述</h3>
                        <p>
                            <a href="https://www.kaggle.com/c/siim-covid19-detection">比赛链接</a> 
                        </p>
                        <p>
                            比赛提供了4000多个病人的新冠肺炎患者的肺部影像，因为一个病人可能有多张影像，照片有约5500张，其中少部分有用图像识别的方框标出肺炎位置。
                        </p>
                        <p> 
                            赛选手的目标：
                            <ul>
                                <li>1. 标出肺部异常区域的位置</li>
                                <li>2. 综合多张影像 判断病人 （a）典型 （b）非典型 （c）不确定 （d）无病 的概率</li>
                            </ul>                                                    
                        </p>
                        <p>比赛开始时数据标注有误，导致很多选手不满弃赛。虽然数据量少，质量也差，最终结果却没有大的shakeup我的排名是32名，获得银牌一枚</p>
                        <h3>2. 问题分析</h3>
                        <p>
                            <ul>
                                <li>1. 既是目标检测又是分类问题，但是分类并不是对检测到的目标分类，而是综合整体情况对病患整体的疾病分类</li>
                                <li>2. 如何有效的利用多任务的相关性信息来互相提升精度，是比赛的key idea</li>
                                <li>3. 比赛的metric map存在很多bug可以利用，这个后面会详细说</li>
                                <li>4. 这个比赛属于那种延续性的比赛，kaggle上有很多医疗影像相关的feature比赛RSNA SIIM VIN这些组织都周期性的组织比赛，
                                    这就导致这类比赛历史可借鉴的方案都比较多，方案的大方向比较固定。很难出现解题思路五花八门的情况</li>
                            </ul>
                        </p>
                        <h3>3. Baseline</h3>
                        <p>
                            <ul>
                                <li>1. 比赛里hengck有参赛，很快他就实验成功了在efficientnet的前几个卷积层上使用aux的loss产生图像分割的输出的方案<a href="https://www.kaggle.com/c/siim-covid19-detection/discussion/240233">Hengck的masterpieces</a> </li>
                                <li>2. 上面这个方案也有一些变种，比如用多输出做aux loss<a href="https://www.kaggle.com/c/siim-covid19-detection/discussion/263658">多输出</a>，或者auxloss接到多层上等</li>
                                <li>3. 但是训练还是非常不稳定，非常容易过拟合</li>
                            </ul>
                        </p>
                        <h3>4. 度量指标Map的bug</h3>
                        <p>
                            Map是一个非常诡异的判断标准
                        </p>
                        <p>
                            <ul>
                                <li>1. 在分类问题中，把四个分类全部都弄的有概率比只提交一个概率分数高很多，包括 “none” 这一分类的概率 <a href="https://www.kaggle.com/c/siim-covid19-detection/discussion/246536">Dark magic</a></li>
                                <li>2. 在检测问题中，不断增加目标的bbox也不会减分 <a href="https://www.kaggle.com/c/vinbigdata-chest-xray-abnormalities-detection/discussion/229637">Metric is very like auc</a></li>
                            </ul>
                        </p>
                        <p>以至于最后提交时提交都成了这样</p>
                        <p>四分类：</p>
                        <p><code>id,PredictionString
00188a671292_study,negative 0.840249 0 0 1 1 typical 0.278024 0 0 1 1 indeterminate 0.371947 0 0 1 1 atypical 0.277659 0 0 1 1</code></p>
                        <p>目标检测：</p>
                        <p><code>id,PredictionString
f6293b1c49e2_image, opacity 0.24799  688 1416 1347 1976 opacity 0.21650  661 1003 1305 1922 opacity 0.17933 2207 1466 2863 2008 opacity 0.11744 2421 1491 2829 1882 opacity 0.11233  668  936 1146 1575 opacity 0.09901  928 1492 1411 1877 opacity 0.09123  791 1605 1259 1963 opacity 0.09113  683 1112 1072 1745 opacity 0.08826 2431 1530 2940 2072 opacity 0.08656  938 1271 1519 1963 opacity 0.08370 2067 1200 2775 2054 opacity 0.08369  787 1515 1557 2057 opacity 0.07770  611 1210 1051 2034 opacity 0.07399  636 1562 1166 2030 opacity 0.07264 2022 1624 2796 2099 opacity 0.07117 2261 1516 2724 1864 opacity 0.06971  768  838 1425 1676 opacity 0.06937 2366 1212 2880 1907 opacity 0.06781 2464 1538 2751 1795 opacity 0.06582  778 1255 1266 1857 opacity 0.06121  800 1186 1222 1549 opacity 0.05923 2213 1317 2763 1811 opacity 0.05374  705 1637 1344 2140 opacity 0.05219  807 1692 1132 1943 opacity 0.05066  766  861 1137 1369</code></p>
                        <h3>5. 我的实验记录</h3>
                        <p>
                            我的大方向：在这次比赛中能够通过改模型结构来提分
                        </p>
                        <p>
                            首先我复现了hengck的整体baseline，然后弄了一个yolo来做目标检测，最开始单独弄了一个efficientNet来做none的分类。
                            <br />
                            很快我就放弃了单独none的分类，改用negative来当作none
                            <br />
                            因为efficientnetv2一直过拟合，试了加dropout，droppath，梯度聚集等方法，最后才发现是数据自增设置的不对。
                            <br />
                            <ul>
                                <li>1. 预处理数据时没有把同patientid的分在一个fold里，导致训练下来方差很大</li>
                                <li>2. 最后yolo的参数根本没调好，平均map只有5.2 远低于top方案的5.9</li>  
                            </ul>
                            
                            <br />
                            实验记录：https://github.com/mrzhuzhe/pepper/blob/master/kaggle-beginner/compete/covid.md
                        </p>
                        <h3>6. Top方案：</h3>
                        <p>Top方案都总结到了这里：https://github.com/mrzhuzhe/pepper/blob/master/kaggle-beginner/compete/covid-rew.md</p>
                        <h3>7. 展望：</h3>
                        <p>
                            比赛结束后我去看了NYC的自监督学习的课程
                            <br />
                            也仔细看了一下Top方案的代码，看到他们很多都用了RSNA VIN Chexpert的方案，因此也仔细看了一下这些比赛的top方案
                            <br />
                            大的方向主要集中在下面几个方向吧
                            <ul>
                                <li>1. [无监督] 只有noise student这种自蒸馏用的比较多，其他的能量模型似乎太费gpu了，跑不起来</li>
                                <li>2. [标签平滑] 似乎和自蒸馏 或者psedulael的原理 也有一些关系，都是利用接近概率的隐只是</li>
                                <li>3. [pcam池化 auxloss multi stage 或者 multi channel] 似乎都是让模型更集中于某一块的特征</li>
                                <li>4. [mixup 等数据自增] 这个真的很玄乎 看起来很简单实际上对结果影响极大，而且跟能量模型有关</li>
                                <li>5. [focal loss] 看一下具体代码和超参 </li>
                                <li>6. [滑动平均] 不知道起啥作用</li>
                            </ul>
                        </p>
                        <p>总体来说：
                            <ul>
                                <li>1. 从改模型结构方向入手</li>
                                <li>2. 从更有效的利用数据入手</li>
                                <li>3. 更好的优化方法和结构化表征方法</li>
                                <li>4. 利用metric的bug来做后处理</li>
                                <li>5. 利用最新的技术和模型</li>
                                <li>6. 更有效率的的采样或着预处理</li>
                            </ul>
                            </p>                            
                        <p>
                            <img src="https://res.cloudinary.com/dgdhoenf1/image/upload/v1631099778/E1LJjMrVEAEwrgh_owddn8.jpg" width="400"/>
                        </p>
                    </div>
                    <div className="tags">{ _post.categories.map((item, index) => (
                        <span key={index}> { item.name} </span>
                    ))}</div>
                </div>
                
              <div className="DisqusComp">      
                <DisqusBox />
              </div>
            
            </div>  
        </div>
        <footer className="w3-container w3-padding-64 w3-light-grey w3-center w3-large">   
        <p>2021 No right recived</p>
        <p className="small">太陽系を抜け出して平行線で交わろう</p>
        </footer>
    </div>
}


export default post