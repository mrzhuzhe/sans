// graphql https://nextjs.org/docs/basic-features/pages
import ReactMarkdown from 'react-markdown'
import DisqusBox from '../../components/disqus'
import gfm from 'remark-gfm'

export async function getServerSideProps(context) {
    // Fetch data from external API
    const GET_ONE_POST = `query getOnePost($id: ID!) {
      Post(where: {
          id:	$id
        }) {
        id
        title
        author {
          name
        }
        state
        publishedDate
        brief
        extended
        categories {
          name
        }
      }
    }`
    const res = await fetch('http://localhost:3000/admin/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: GET_ONE_POST,
          variables: {
            "id": context.params.id
          }
        }),
      })
    const data = await res.json();
    //  console.log(data)
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
                      <ReactMarkdown plugins={[gfm]}>
                        { _post.extended }
                      </ReactMarkdown>
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