#!/bin/bash

rm -r /tmp/app_pe
mkdir -p /tmp/app_pe
cp -r deploy/ /tmp/app_pe
cd /tmp/app_pe/deploy
find . -name "*.py" -exec sed -i 's/deploy\.//g' {} +
eb init -p python-3.8 ethSambaApi --region sa-east-1
eb deploy
