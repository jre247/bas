sudo apt-get update
sudo apt-get install -y ntp dstat software-properties-common python-software-properties screen git wget

#ufw
sudo ufw enable
sudo ufw default deny
# ssh
sudo ufw allow 22
# redis

#docker
# sudo apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
# sudo touch /etc/apt/sources.list.d/docker.list
# sudo sh -c 'echo deb https://apt.dockerproject.org/repo ubuntu-trusty main > /etc/apt/sources.list.d/docker.list'
# apt-get update
# apt-get purge lxc-docker
# apt-cache policy docker-engine
# sudo apt-get update
# sudo apt-get install -y linux-image-extra-$(uname -r)
# sudo apt-get update
# sudo apt-get install -y docker-engine
# sudo usermod -aG docker ubuntu
# sudo usermod -aG docker vagrant
