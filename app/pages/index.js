function HomePage() {
    return <div>
      <div class="w3-content" style={{ maxWidth:1500 + "px" }}>
      <header class="w3-panel w3-center w3-opacity" style={{ padding: "128px 16px" }}>
        <h1 class="w3-xlarge">Starofus</h1>
        <h1>你好呀，我是Sans</h1>    
        <div class="w3-padding-32">
          <div class="w3-bar w3-border">
            <a href="/index" class="w3-bar-item w3-button w3-light-grey">Home</a>
            <a href="/list" class="w3-bar-item w3-button">Works</a>
            <a href="https://github.com/mrzhuzhe" class="w3-bar-item w3-button">Github</a>
            <a href="/contact" class="w3-bar-item w3-button">Contact</a>
          </div>
        </div>
      </header>
      { /* Context */ }
      <div class="w3-row-padding" >
        <div class="index-main">
          <div class="list">    
            <div class="item" name="works" id="dog" >
              <h1>一条狗子</h1>
              <a href="#galley"><img alt="anonyDog" src="/static/anonyDog.jpeg" style={{ width:120 + "px" }} /></a>
            </div>                
            <div class="item" name="works" id="works" >      
              <h1>待写的文章：</h1>
              <ul>
                <li>特征值和PCA</li>
                <li>抽象代数和拓扑学</li>
                <li>open3d实践的总结</li>
                <li>流加密，https和tls伪装的分析</li>
              </ul>
            </div>
          </div>
        </div>
      </div>   
      <div class="w3-row-padding" name="galley" id="galley" >
        <h1>放点图撑撑场面</h1>
      </div>    
      { /*  Photo Grid */ } 
      <div class="w3-row-padding" style={{ marginBottom: 128 + "px" }} >  
        <div class="w3-half">
          <img alt="花Q" src="/static/huaq.jpeg" style={{ width: 100 + "%" }} />
        </div> 
        <div class="w3-half">
          <img alt="这张图很有上海的感觉" src="./static/funky_panda.jpeg" style={{ width: 100 + "%" }} />
          <img alt="LazarusGroup" src="/static/LazarusGroup.jpg" style={{ width: 100 + "%" }} />
        </div>  
      </div>    
      { /* End Page Content */ }
      </div>    
      { /* Footer */ }
      <footer class="w3-container w3-padding-64 w3-light-grey w3-center w3-large">   
        <p>2021 No right recived</p>
        <p class="small">太陽系を抜け出して平行線で交わろう</p>
      </footer>
    </div>
}
export default HomePage