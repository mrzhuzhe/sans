## r01
```
server {
    listen              80;
#   listen              443 ssl;
    server_name         starofus.xyz;
    root                /data/mysites/sans/template;
    index               index.html;
    ssl_certificate     /etc/letsencrypt/live/starofus.xyz/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/starofus.xyz/privkey.pem;
    ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers         HIGH:!aNULL:!MD5;
}
```

## r02
`
upstream sansks5 {
    server localhost:3000;
    
}
server {
    listen              80;
#   listen              443 ssl;
    server_name         starofus.xyz;
#   root                /data/mysites/sans/template;
    location / {
        proxy_pass          http://sansks5;
    }
#   index               index.html;
    ssl_certificate     /etc/letsencrypt/live/starofus.xyz/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/starofus.xyz/privkey.pem;
    ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers         HIGH:!aNULL:!MD5;
}
`

## r03

`
upstream sansks5 {
    server localhost:3000;

}
server {
    listen              80;
#   listen              443 ssl;
    server_name         starofus.xyz;
#   root                /data/mysites/sans/template;
    location / {            
        proxy_set_header   X-Real-IP           $remote_addr;
        proxy_set_header   X-Forwarded-For     $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto   $scheme;
        proxy_set_header   X-Forwarded-Host    $host;
        proxy_set_header   X-Forwarded-Port    $server_port;
        proxy_pass         http://sansks5;
    }
#   index               index.html;
    ssl_certificate     /etc/letsencrypt/live/starofus.xyz/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/starofus.xyz/privkey.pem;
    ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers         HIGH:!aNULL:!MD5;
}
`

## r04
`
upstream sansks5 {
    server localhost:3000;

}
server {
    listen              80;
#   listen              443 ssl;
    server_name         starofus.xyz;
#   root                /data/mysites/sans/template;
    location / {
#        proxy_set_header   X-Real-IP           $remote_addr;
#        proxy_set_header   X-Forwarded-For     $proxy_add_x_forwarded_for;
#        proxy_set_header   X-Forwarded-Proto   $scheme;
#        proxy_set_header   X-Forwarded-Host    $host;
#        proxy_set_header   X-Forwarded-Port    $server_port;
        proxy_pass         http://sansks5;
    }
#   index               index.html;
    ssl_certificate     /etc/letsencrypt/live/starofus.xyz/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/starofus.xyz/privkey.pem;
    ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers         HIGH:!aNULL:!MD5;
}
`
