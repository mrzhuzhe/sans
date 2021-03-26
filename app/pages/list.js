// graphql https://www.keystonejs.com/guides/intro-to-graphql
/*
    query getAllPosts($first: Int) {
        allPosts(first: $first) {
        id
        title
        author {
          name
        }
        publishedDate
        brief
        categories {
          name
        }
      }
    }
 */
export async function getServerSideProps() {
    // Fetch data from external API
    const GET_ALL_POSTS = `query getAllPosts($sortBy: [SortPostsBy!] ) {
        allPosts(sortBy: $sortBy) {
        id
        title
        publishedDate
        brief
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
            query: GET_ALL_POSTS,
            variables: {
                "orderBy": "publishedDate",
                "sortBy": "publishedDate_DESC"
            }
        }),
    })
    const data = await res.json();
    //  console.log(data)
    // Pass data to the page via props
    return { props: data }
}

function list({ data }) {
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
                <div className="postlist">
                    {  data.allPosts.map((e, i) => (
                        <a href={"/post/"+ e.id} key={i}>
                            <div className="item post" >
                                <h3>{e.title}</h3>
                                <div className="date">{e.publishedDate}</div>
                                <p className="bref">{e.brief}</p>
                                <div className="tags">{ e.categories.map((item, index) => (
                                    <span key={index}> { item.name} </span>
                                ))}</div>
                            </div>
                        </a>                        
                    ))  }
                </div>
            </div>  
        </div>
        <footer className="w3-container w3-padding-64 w3-light-grey w3-center w3-large">   
        <p>2021 No right recived</p>
        <p className="small">太陽系を抜け出して平行線で交わろう</p>
        </footer>
    </div>
}

export default list