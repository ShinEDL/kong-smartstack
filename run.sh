#!/bin/bash

# start kong
sudo kong start
#sudo kong start --nginx-conf conf/custom_nginx.template

# 配置smartstack
nohup /bin/bash -l -c 'nerve -c /project/smartstack/nerve/nerve.conf.json' &
nohup /bin/bash -l -c 'synapse -c /project/smartstack/synapse/synapse.conf.json' 



