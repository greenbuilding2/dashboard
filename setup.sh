#!/bin/sh

sudo apt-get update -y
sudo apt-get install -y nodejs
sudo apt-get install -y npm
sudo apt-get install -y git

git clone https://github.com/Green-Building/dashboard.git
cd dashboard
npm install
nohup node index &
