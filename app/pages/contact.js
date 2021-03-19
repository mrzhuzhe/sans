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
            <div class="item" name="contact" id="contact" >
              <h1>这里的主人是谁？</h1>
              <p>一个独立开发者</p>
              <p>业余爱好 游戏，旅游，实体玩具，Money 和 Thicc</p>
              <p>居无定所</p>
              <p>年长的萌豚</p>          
              <p><strong>兴趣：</strong></p>
              <p># 机器学习和机器人学</p>
              <p>学习：</p>
              <ul>
                <li>线性代数 和 概率过程</li>
                <li>抽象代数，拓扑学</li>
                <li>凸优化</li>
                <li>非线性控制</li>
              </ul>
              <p>应用：</p>
              <ul>
                <li>强化学习</li>
                <li>3d视觉</li>
                <li>web 3d</li>
              </ul>
              <p># 网络安全</p>
              <p>学习：</p>
              <ul>
                <li>apue 和 uep</li>
                <li>密码学</li>
              </ul>
              <p>应用：</p>
              <ul>
                <li>加解密</li>
                <li>虚拟化</li>
              </ul>
            </div>            
          </div>
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