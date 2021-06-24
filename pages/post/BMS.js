import DisqusBox from '../../components/disqus'

export async function getStaticProps() {
    
  const data = {
      data: {
        Post: {
                  id: "BMS",
                  title: "BMS分子结构图像翻译比赛总结",
                  publishedDate: "2021-06-24",
                  brief: "Bristol-Myers Squibb – Molecular Translation，分子结构图像转文字比赛总结",
                  categories: [{name: "kaggle" }, { name: "vit" }, { name: "transformer" }]  
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
                    <p><br /></p>
                    <h3>概述：</h3>
                    <p>链接：https://www.kaggle.com/c/bms-molecular-translation/</p>
                    <p><strong>目标和数据</strong>：比赛举办方提供了400w张分子结构的图像和标注</p>
                    <p>比如：
                      <img src="https://res.cloudinary.com/dgdhoenf1/image/upload/v1624518663/blog/sans/000019cc0cd2.png" width="300" />
                      </p>
                    <p>对应标注：InChI=1S/C13H20OS/c1-9(2)8-15-13-6-5-10(3)7-12(13)11(4)14/h5-7,9,11,14H,8H2,1-4H3</p>
                    <p>这个inchi标注似乎是某种类似分子式的东西，目标就是训练出一个神经网络，自动总结规律，输入是图像，输出是这个分子式</p>
                    <p><br /></p>
                    <p><strong>思路1：</strong>用CNN 获取输入的embedding，然后用RNN解码（cnn + lstm ， cnn + attention lstm， cnn + transformer decoder， vision transformer等）</p>
                    <p><strong>思路2：</strong>用OCR识别局部分子结构, 再根据局部结构的排列方式得到整体结构的结果</p>
                    <p><strong>思路3：</strong>在比赛早期选手们就发现比赛分子结构似乎是用一个叫rdkit软件生成再加入噪声产生的，噪声包括燥点，删除原子标注等，因此用rdkit生成更多的分子图形来增大数据集，或者利用rdkit本身的“在理想状况”下可以识别分子图形的能力来实现这个功能</p>
                    <p><br /></p>
                    <h3>我的尝试和遇到的困难</h3>
                    <p>一开始我就定了一个方向，从头搭建一个baseline</p>
                    <p><strong>尝试1:</strong> 模仿青蛙哥hengk的 transformer in transformer</p>
                    <p>1. 预处理：https://www.kaggle.com/drzhuzhe/bms-preprocess-data-parallel</p>
                    <p>
                      <ul>
                        <li>裁剪了原图, 对宽小于长的图片做了旋转九十度, 图片按长短排序，将图片分了fold</li>
                        <li>把图片拆分成了patch sequence padding到等长，对应transformer的batch输入，减少了空白区域，增加了加载速度 <br /><img src="https://res.cloudinary.com/dgdhoenf1/image/upload/v1624521946/blog/sans/1624521881990.jpg" width="300" /></li>
                        <li>我做的优化：将预处理拆分成多线程执行速度提升4倍，另外提交时发现kaggle不会对notebook output 提交自动打zip包，如果生成文件非常多，超过1小时上传时间就会超时，见这个说明：https://www.kaggle.com/product-feedback/233383</li>
                      </ul>
                    </p>
                    <p>2. transformer in transformer 模型：https://www.kaggle.com/drzhuzhe/training-on-gpu-bms</p>
                    <p>
                      <ul>
                        <li>TNT是华为诺亚实验室的新sota，牛掰归牛掰但是训练开销实在是太大了，训练一个epoch要10小时左右，而且内存我只跑了十分之一数据就超过16gb一直爆内存OOM</li>
                        <li>因为尝试1的失败，我决定后面完全用tpu来做实验，这个版本大概调了一周半，我在dataset和gc层面尝试解决内存问题，但是没有成功</li>
                        <li><strong>【事后】</strong>其实按照最后讨论：应该对400w张图片做分层抽样，用百分之十的数据做实验，一样是可以收敛的，最后再换完整数据和大模型</li>
                      </ul>
                    </p>
                    <p><br /></p>
                    <p><strong>尝试2:</strong> cnn + transformer decoder </p>
                    <p>代码：https://www.kaggle.com/c/bms-molecular-translation/discussion/241557</p>
                    <p>
                      <ul>
                        <li>这个版本其实就是把efficientnet 和 transformer decoder 直接接到了一起，模型结构其实很明确，但是因为我是第一次从头手动搭建模型，所以训练起来loss不下降我一直以为是模型结构问题一直在查结构，优化器，loss函数等</li>
                        <li>因为一直loss train不下去我试了好多种学习率，调了2周一直在查模型本身是不是错了，却又找不到错误，所以我只能归结于cnn 不能直接接到transformer上来，或者必须又上游任务来初始化权重。我在绝望中在kaggle上发了个帖子，就是上面这个帖子</li>
                        <li>结果真有人遇到跟我一样问题，他写了非常详细的代码告诉我是学习率的问题，根据transformer原本的论文，transformer必需要用noam学习率，其实就是<strong className="red">transformer必须warmup</strong>才能train的动</li>
                        <li>果然加了warmup 这个版本也能train到 acc 99% 左右</li>
                        <li>transforemrinfer 极其慢比train还慢得多, train要六个多小时</li>
                      </ul>
                    </p>
                    <p><br /></p>
                    <p><strong>尝试3:</strong> 自己搭建vision transformer 并且 train from scratch</p>
                    <p>代码1: https://www.kaggle.com/drzhuzhe/bms-vision-transformer </p>
                    <p>代码2: https://www.kaggle.com/drzhuzhe/fine-tune-of-bms-vision-transformer</p>
                    <p>我尝试按keras教程从头搭建了vit16 用卷积层换掉了dense层做输入，参数完全按照vit 16</p>
                    <p>用warmup竟然能train的动，但是梯度过了几个epoch就爆了，我加了个梯度裁剪，训练是能训练，不过10个周期内 acc一直卡在88%左右不下去</p>
                    <p>loss 不降这个问题我试了 noam学习率训练8个周期， 再用cycle learning rate 或者手动 decay 学习率来 finetune，效果都不明显 </p>
                    <p>除了训练更慢了，这个版本更让我崩溃的是infer更慢了，训练4个epoch动则10小时以上</p>
                    <p>acc 很低的原因可能是因为没有上游任务</p>
                    <p>vit这种超级大模型确实非常难调试, 搞到最后我都没有一个拿得出手的cv结果去提交</p>

                    <h3>百花齐放的Top solution</h3>
                    
                    <p>如开头所说，top solution 有 lstm/ocr+nn/rdkit+nn 三个大方向，再依次有各种小的idea，有好几十种baseline</p>
                    <p>
                      <ul>
                        <li>1. 青蛙哥hengk 的vit tnt + beam search + rdkit normalize https://www.kaggle.com/c/bms-molecular-translation/discussion/243766</li>
                        <li>2. 仅使用4m参数纯colab 对原子和角度建模 https://www.kaggle.com/c/bms-molecular-translation/discussion/243917</li>
                        <li>3. 使用ocr 对分子结构进行重建 https://www.kaggle.com/c/bms-molecular-translation/discussion/243809</li>
                      </ul>
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