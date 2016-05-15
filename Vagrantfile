# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrant Version 2. Don't change it unless you know what you're doing.
Vagrant.configure(2) do |config|

  config.vm.box = "ubuntu/trusty64"

  # config.vm.define "redis01" do |r01|
  #   r01.vm.hostname = "dev-adserver-redis-01"
  #   r01.vm.network :private_network, ip: "192.168.33.22"
  #   r01.vm.provider :virtualbox do |vb|
  #     vb.customize ["modifyvm", :id, "--memory", "2048"]
  #   end
  #   r01.vm.provision "shell", path: "vagrant/provision.sh", :args => "1"
  #   r01.vm.provision :docker_compose, yml: "/vagrant/images/docker-compose.yml", run: "always"
  # end


  config.vm.define "redis-master" do |r01|
    r01.vm.hostname = "dev-adserver-redis-master"
    r01.vm.network :private_network, ip: "192.168.33.200"
    r01.vm.provider :virtualbox do |vb|
      vb.customize ["modifyvm", :id, "--memory", "2048"]
    end
    r01.vm.provision "shell", path: "vagrant/provision_redis_master.sh", :args => "1"
  end

  config.vm.define "redis-slave" do |r01|
    r01.vm.hostname = "dev-adserver-redis-slave"
    r01.vm.network :private_network, ip: "192.168.33.301"
    r01.vm.provider :virtualbox do |vb|
      vb.customize ["modifyvm", :id, "--memory", "2048"]
    end
    r01.vm.provision "shell", path: "vagrant/provision_redis_slave.sh", :args => "1"
  end

end
