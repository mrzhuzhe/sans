import React from 'react'

export default class Header extends React.Component {
  componentDidMount (prevProps, prevState) {
      /**
      *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
      *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables    */
      /*
      var disqus_config = function () {
      this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
      this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
      };
      */
  }
  render () {
    return (<header className="w3-panel w3-center w3-opacity" style={{ padding: "128px 16px" }}>
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
    </header>)
  } 
}
