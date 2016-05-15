sudo sh /vagrant/vagrant/provision_redis.sh

echo "Copying redis.conf"

sudo cp -f /vagrant/images/redis/master/redis.conf /etc/redis

sudo service redis-server restart
