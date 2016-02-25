echo "Installing vim and git..."
apt-get update
apt-get install -y vim
apt-get install -y git

echo Installing MongoDB...
sudo mkdir -p /data/db
sudo chown vagrant /data/db
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
apt-get update
apt-get install -y mongodb-10gen

/home/vagrant/Crescendo/nodejs.sh
/home/vagrant/Crescendo/heroku.sh
/home/vagrant/Crescendo/npm.sh

echo "Cleanup..."
apt-get upgrade
apt-get autoremove
echo "Done!"

