#!/bin/bash
apt-get install -y curl
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
apt-get install -y nodejs

echo "Installing nodejs..."
if [ ! -e /usr/bin/npm ]; then
  echo "Installing npm manually. Probably in precise32"
  apt-get install -y python-software-properties
  add-apt-repository ppa:chris-lea/node.js
  apt-get update
  apt-get install -y nodejs
fi

