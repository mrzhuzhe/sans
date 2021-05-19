import DisqusBox from '../../components/disqus'

export async function getStaticProps() {
    
  const data = {
      data: {
        Post: {
                  id: "kidney",
                  title: "kaggle hack the kidney 比赛总结",
                  publishedDate: "2021-05-11",
                  brief: "实验记录，未实现的方案记录，获胜方案，总结，后面的方向",
                  categories: [{name: "kaggle"}]  
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
                    <h3>{_post.title}</h3>
                    <div className="date">{_post.publishedDate}</div>
                    <p className="bref">{_post.brief}</p>
                    <div className="extended">
                      
                      <h3>背景</h3>
                      <p><a href="https://www.kaggle.com/c/hubmap-kidney-segmentation">Hsacking the kidney</a></p>
                      <p>一个非常典型的1（2）元图像分割的场景，把肾小球从背景图上框出来</p>
                      <p>例如这样</p>
                      <p><img src="https://res.cloudinary.com/dgdhoenf1/image/upload/v1621398289/kidnet01_um3d3o.png" width="500" /></p>
                      <p><img src="https://res.cloudinary.com/dgdhoenf1/image/upload/v1621398288/kidnet02_lsaenj.png" width="500" /></p>
                      <p>
                        比赛时间非常之久长达5个月，导致很多人都弃赛了<br/>
                        原因是因为在初期，很多人发现赛题所有的标注都向一个方向跑偏，移动回来后就会提升很大的精确度<br/>
                        所以主办方大幅更改了数据集的标注，然后延长了比赛2个月的时间
                      </p>
                      <p>
                        但是在后来还是有一个巨大的问题，那就是在标注数据的其中一张图片（下称d48图片），中存在少量错误标注的FC肾小球<br />
                        其他图片中没有这种类型的数据，所以有人发现如果手动标注这部分数据，就能大幅提升分数<br />                      
                      </p>
                      <p>
                        但是这个情况产生了一个<strong class="red" >巨大的风险</strong>，<strong class="red" >如果把fc肾小球纳入分割</strong>，但是隐藏数据集里没有fc肾小球，那么这些标注就会变成噪音<br /> 
                      </p>
                      <p>
                        所以最后大家都在猜测最终的隐藏数据集里到底对fc有没有标注
                      </p>
                      <p>&nbsp;</p>
                      <h3>
                        主要的开源baseline方案有三种：
                      </h3>
                      <ul>
                        <li>1. 对全部数据做tilling efficientnet + unet 来自 Wojtek Rosa</li>
                        <li>2. 对全部数据做tilling resnext + unet  来自hengk蛤蟆大神 </li>
                        <li>3. 对数据做重要采样，肾的不同区域采集不同数量的图片 最后用efficientnet + unet 来自 matjs </li>
                      </ul>
                      <p>&nbsp;</p>
                      <h3>方案的分析和实验</h3>
                      <p>
                        比赛前我想可能的方向有这些                      
                      </p>
                      <ul>
                        <li>对业务场景的理解（这块我是没办法，毕竟我之前都没实际在benchmark上训练过模型）</li>
                        <li>模型结构上的调整</li>
                        <li>优化器</li>
                        <li>损失函数调整</li>
                        <li>预处理和后处理</li>
                      </ul>
                      <p>当然还有bug修复</p>
                      <p><strong class="red">下面这几个情况严重影响了选手心态</strong>，导致很多人觉得这个比赛没有意义</p>
                      <ul>
                        <li>handlabel手工标注</li>
                        <li>额外数据</li>
                        <li>图像分辨率带来的算力问题</li>
                      </ul>
                      <p>但是实际比赛结束时：第一 二个问题被证明没有重要作用，第三个问题可以用重要采样来解决</p>
                      <p>后面我会在我的实验记录里对以上问题分别补充说明</p>
                      <p>&nbsp;</p>
                      <h3>我的实验记录</h3>
                      <p>链接 <a href="https://github.com/mrzhuzhe/pepper/blob/master/kaggle-beginner/compete/hpa.md" target="_blank">github</a> 总结如下</p>
                      <ul>
                        <li>【不同分割架构】测试了unet linknet 感觉分数其实差不多, 另外我观察了其他人fpn的模型感觉也差不多</li>
                        <li>【不同backbone】测试了efficientnet b0 b2 b4 感觉backbone容量<strong>不可小于图像分辨率</strong>会造成严重的减分，但是似乎可以大于图像分辨率，当然参数提升也会造成过拟合和巨大的算力开销问题</li>
                        <li>【调参】增大batchsize提升训练速度，epoch对结果的影响，数据自增对收敛情况的影响，kfold等</li>
                        <li>【tpu】tpu下无法使用np.function 导致无法在运行过程中做完整的数据自增，理论上可以用tensorflow的计算图来重新实现 这块我最多调到了cv 9.33 lb 9.30 pb 9.40</li>
                        <li>【zarr的baseline】我在比赛临近结束前测试了zarr的baseline，在加了全部augment后可以达到 lb:9.3 pb9.47 </li>
                        <li>【优化器】就瞎试验，从结果看起来 lookahead似乎可以提分不少  </li>
                        <li>【可视化验证】这块我仅仅把图像打印看了一下，没有把fp fn区域可视化出来分析原因 </li>
                        <li>【psedulabel】 我把测试数据集的psedulabel加入训练集训练，lb没有提分 pb却有提分</li>
                        <li>【handlabel】用了d48的手工标注 lb大幅提分 </li>
                        <li>【tta】可以提升稳定性和提分 </li>
                        <li>【不同loss】测试了bce但是在大batch下一直进次优解 </li>
                      </ul>
                      <p>&nbsp;</p>
                      <p>想做但是没做的</p>
                      <ul>
                        <li>分层抽样：根据mask的大小把数据分为几类，从每一类中抽出同比例数据来训练和验证</li>
                        <li>重要采样：划定范围来tilling把周边空白区域的内容都丢掉</li>
                        <li>买机器，用更大分辨率来训练，这个不能说没想过</li>
                        <li>尝试用gan迁移特征到正常的样本上，来处理边缘标注的噪声，这个尝试了gan但是没有在这个项目中用上</li>
                        <li>设想过用sigfix或者先验知识对分割做微调，但是没有尝试</li>
                      </ul>
                      <p>结果呢最终pb和lb都只有前18%</p>
                      <p>&nbsp;</p>
                      <h3>获胜方案</h3>
                      <p>数据预处理阶段</p>
                      <ul>
                        <li>【大幅提升速度】最印象深刻的就是matjs的zarr的重要采样了这块其实实现起来比我想象的还简单，他竟然只是取了中间点</li>
                        <li>【分辨率】总体来说高的分辨率似乎效果要好很多</li>
                      </ul>
                      <p>&nbsp;</p>
                      <p>训练阶段</p>
                      <ul>
                        <li>【有用的】ranger优化器</li>
                        <li>【不明显】dice, bce dice, bce, 甚至是focal 和 lavos </li>
                        <li>【不明显】不同模型架构，除了resnext似乎最终表现比efficientnet好其他都不明显 </li>
                      </ul>
                      <p>&nbsp;</p>
                      <p>验证阶段</p>
                      <ul>
                        <li>【可视化fn/pn验证】还有基于能量的fn/pn验证</li>
                        <li>可视化概率热图</li>
                      </ul>
                      <p>&nbsp;</p>
                      <p>预测阶段</p>
                      <ul>
                        <li>【扩张融合】对图片采集区域扩张n倍来预测</li>
                      </ul>
                      <p>&nbsp;</p>
                      <h3>总结</h3>
                      <p>1. 很多人赛前都以为handlabel更多的数据，可以提升精度，主办方回答说允许handlabel时，kaggler们都骂街了，实际上证明过多的handlabel真的没啥用</p>
                      <p>2. 分辨率造成的精度损失固然重要，但是效率的取舍更加重要</p>
                      <p>3. 经验很重要，不同框架的特性，常见问题的应对方式 例如边缘效应很重要</p>
                      <p>4. 对业务的理解很重要 本次比赛有两个很打动我的高手除了matjs的zarr， 另一个是第四名对问题的理解，他把问题转化为了分类问题而非单纯分割问题</p>
                      <p>&nbsp;</p>
                      <h3>后面的方向</h3>
                      <p>1. 多读论文 追顶会</p>
                      <p>2. 多参加比赛 提升效率</p>
                      <p>&nbsp;</p>
                      <p>&nbsp;</p>
                      <h3>Refferrence</h3>
                      <p>1. 我自己的notebook <a href="https://www.kaggle.com/drzhuzhe/efficientnet-linknet-or-unet" target="_blank">Efficientnet + Linknet or Unet</a></p>
                      <p>2. 第四名对赛题的深刻理解 <a href="https://www.kaggle.com/c/hubmap-kidney-segmentation/discussion/238024" target="_blank">4th place solution</a></p>
                      <p>3. 第一名和第三名的 avoid edge effect 和 resnext
                        <a href="https://www.kaggle.com/c/hubmap-kidney-segmentation/discussion/238198" target="_blank">1th place solution</a>
                        <a href="https://www.kaggle.com/c/hubmap-kidney-segmentation/discussion/238013" target="_blank">3th place solution</a>                      
                      </p>                      
                      <p>4. 28名，另一种采样方式 <a href="https://www.kaggle.com/c/hubmap-kidney-segmentation/discussion/238308" target="_blank">28th place solution</a></p>
                      <p>5. 无冕之王 <a href="https://www.kaggle.com/matjes/hubmap-deepflash2-judge-price" target="_blank">judge price</a></p>
                    
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