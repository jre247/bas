sudo sh /vagrant/vagrant/provision.sh


sudo ufw allow 6379

# Cluster bus port for node-node communication.
# Refer to http://redis.io/topics/cluster-tutorial
sudo ufw allow 32768

sudo add-apt-repository ppa:chris-lea/redis-server
sudo apt-get update
sudo apt-get install -y redis-server
