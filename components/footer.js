import React from 'react'

export default class Footer extends React.Component {
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
    return (<footer className="w3-container w3-padding-64 w3-light-grey w3-center w3-large">   
    <p>2021 to future, No right recived</p>
    <p className="small">太陽系を抜け出して平行線で交わろう</p>
    </footer>)
  } 
}



