import DisqusBox from '../../components/disqus'
import Header from '../../components/header'
import Footer from '../../components/footer'
import KeywordsTags from '../../components/keywordsTags'

export async function getStaticProps() {
    
  const data = {
      data: {
        Post: {
                  id: "tfjs-speech",
                  title: "online speech recognize",
                  publishedDate: "2022-3-3",
                  brief: "a simple demo of tensorflowjs speech recognizer",
                  categories: [{name: "tensorflowjs" }]  
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
            <script src="/libs/tfjs.js"></script>
            <script src="/libs/speech-commands.js"></script>
            <Header />
            
            { /* Context */ }
            
            <div className="w3-row-padding" >
                <div className="post postdetail" >
                    <h3 className="title" >{_post.title}</h3>
                    <div className="date">{_post.publishedDate}</div>
                    <p className="bref">{_post.brief}</p>
                    <div className="extended">

                    <div><h3 id="console" className='red'></h3></div>
                    <p>Refferrence: </p>
                    <ul>
                      <li>https://www.tensorflow.org/js/tutorials/transfer/audio_recognizer </li>
                      <li>https://github.com/tensorflow/tfjs-models/tree/master/speech-commands</li>
                    </ul>

                    <p>you can say </p>
                    <p>"zero" to "nine", "up", "down", "left", "right", "go", "stop", "yes", "no"</p>
                    <p>then it will be print on this page</p>
                    </div>
                    
                    <KeywordsTags tagList={ _post.categories } />
                    
                </div>
              <script src="/tfjs-speech/index.js"></script>
              <div className="DisqusComp">      
                <DisqusBox />
              </div>
            
            </div>  
        </div>

        <Footer />

    </div>
}


export default post