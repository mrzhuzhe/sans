import DisqusBox from '../../components/disqus'

export async function getStaticProps() {
    
  const data = {
      data: {
        Post: {
                  id: "trojan.html",
                  title: "Trojan部署中遇到的进程权限问题",
                  publishedDate: "2021-03-26",
                  brief: "最近把站点的代理从v2ray 换成trojan ，配置了nginx，代理证书等，但是在配置证书的访问权限时， 遇到了一个子进程权限的问题",
                  categories: [{name: "代理"}]  
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
                    <h3>概述</h3> 
                    <br />

                      最近把站点的代理从v2ray 换成trojan
                      <br /><br />


                      配置了nginx，代理证书等<br /><br />


                      注意trojan和nginx都会监听443端口，所以如果开启trojan监听443转发到nginx 80 那么必须将nginx关闭，也可以trojan监听其他端口nginx将443端口部分转发给trojan<br /><br />


                      部署方法参考：<br />
                      1. 官网：https://trojan-gfw.github.io/trojan/<br />
                      2. 非常详细的教程：https://trojan-tutor.github.io/2019/04/10/p41.html<br /><br />

                      但是在根据`文档2` 配置访问证书时， 遇到了一个子进程权限的问题<br /><br />

                     <br />

                     <br />

                      <h3>问题的调用链路：</h3><br />
                     <br />

                      1. 首先创建了用户trojan组为certuser，将https证书文件的所有组改成了certuser组，且把linux当前用户也加到了certuser组中，这是 certbot 证书文件夹的权限：<br /><br />


                      <code>            
                        drwxr-x--- 4 trojan root      4096 Mar  6 14:48 accounts<br />
            
                        drwxr-x--- 3 trojan certusers 4096 Mar  6 14:35 archive<br />
            
                        drwxr-x--- 2 trojan root      4096 Mar  6 14:34 csr<br />
            
                        drwxr-x--- 2 trojan root      4096 Mar  6 14:34 keys<br />
            
                        drwxr-x--- 3 trojan certusers 4096 Mar  6 14:35 live<br />
            
                        -rwxr-x--- 1 trojan root       721 Mar  6 14:32 options-ssl-nginx.conf<br />
            
                        drwxr-x--- 2 trojan root      4096 Mar  6 14:35 renewal<br />
                        drwxr-x--- 5 trojan root      4096 Mar  6 14:32 renewal-hooks<br />
                        -rwxr-x--- 1 trojan root       424 Mar  6 14:32 ssl-dhparams.pem<br /><br />
                      </code>
                      
                     <br />

                     <br />

                      <br />
                      2. 然后在systemctl中建了一个启动用户为torjan的unit<br />
                      
                      <code> 
                      [Unit]<br />
                      Description=trojan<br />
                      Documentation=man:trojan(1) https://trojan-gfw.github.io/trojan/config https://trojan-gfw.github.io/trojan/<br />
                      After=network.target network-online.target nss-lookup.target mysql.service mariadb.service mysqld.service<br /><br />

                                            [Service]<br />
                      Type=simple<br />
                      StandardError=journal<br />
                      User=trojan<br />
                      AmbientCapabilities=CAP_NET_BIND_SERVICE<br />
                      ExecStart=/usr/bin/trojan /etc/trojan/config.json<br />
                      ExecReload=/bin/kill -HUP $MAINPID<br />
                      Restart=on-failure<br />
                      RestartSec=3s<br /><br />

                                            [Install]<br />
                      WantedBy=multi-user.target<br />
                      </code>

                     <br />

                     <br />

                      <br />
                      3. 用systemctl 启动 trojan ，报错无权限读取证书，报错如下<br />
                      <code> 
                                  Mar 07 08:37:24 instance-1 systemd[1]: Started trojan.<br />
                                  Mar 07 08:37:24 instance-1 trojan[11066]: Welcome to trojan 1.14.1<br />
                                  Mar 07 08:37:24 instance-1 trojan[11066]: [2021-03-07 08:37:24] [FATAL] fatal: use_certificate_chain_file: Permission denied<br />
                                  Mar 07 08:37:24 instance-1 trojan[11066]: [2021-03-07 08:37:24] [FATAL] exiting. . .<br />
                                  Mar 07 08:37:24 instance-1 systemd[1]: trojan.service: Main process exited, code=exited, status=1/FAILURE<br />
                                  Mar 07 08:37:24 instance-1 systemd[1]: trojan.service: Failed with result 'exit-code'.<br />
                                  Mar 07 08:37:27 instance-1 systemd[1]: trojan.service: Scheduled restart job, restart counter is at 14.<br />
                                  Mar 07 08:37:27 instance-1 systemd[1]: Stopped trojan.<br />
                      </code> 
                     <br />

                     <br />

                      4.  将证书所在文件夹改为 755 权限才可以 用 750 权限就不行，但是如下可以<br /><br />

                      <code> 
                                drwxr-xr-x 4 trojan root      4096 Mar  6 14:48 accounts<br />
                                drwxr-xr-x 3 trojan certusers 4096 Mar  6 14:35 archive<br />
                                drwxr-xr-x 2 trojan root      4096 Mar  6 14:34 csr<br />
                                drwxr-xr-x 2 trojan root      4096 Mar  6 14:34 keys<br />
                                drwxr-xr-x 3 trojan certusers 4096 Mar  6 14:35 live<br />
                                -rwxr-xr-x 1 trojan root       721 Mar  6 14:32 options-ssl-nginx.conf<br />
                                drwxr-xr-x 2 trojan root      4096 Mar  6 14:35 renewal<br />
                                drwxr-xr-x 5 trojan root      4096 Mar  6 14:32 renewal-hooks<br />
                                -rwxr-xr-x 1 trojan root       424 Mar  6 14:32 ssl-dhparams.pem<br />
                     </code> 
                   <br />

                   <br />

                      <br />
                    <h3>问题分析：</h3>
                   <br />

                    - 可能原因：<br />
                    1. 是systemctl 启动后的用户改变了么？但是当前用户也加到了证书可访问的组里了<br />
                    2. 还是访问证书借用了其他属于其他人的进程？<br /><br />

                   <br />

                    <br />
                    - 可能尝试的办法<br />
                    1. 看是否有办法查看证书文件的访问记录，确认是哪个进程在访问

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