[Unit]
Description=sanssite

[Service]
Type=simple
StandardError=journal
User=nobody
WorkingDirectory=/data/mysites/sans/
ExecStart=npm run start


[Install]
WantedBy=multi-user.target