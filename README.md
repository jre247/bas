Ad Server
===========

Set up
----
### Vagrant
Ensure vagrant is installed:  
https://www.vagrantup.com/docs/installation/  
Install the Docker Compose Vagrant plugin:  
`vagrant plugin install vagrant-docker-compose`  

### Nodemon
Ensure nodemon is installed for local development
`sudo npm i -g nodemon`

Quick Start
----------
`npm run start` - Runs `npm run local`, which starts the AdServer with `local` configuration, and watches for file changes via `nodemon`.

`npm run workbench:redis:local` - Runs `src/workbench/redis.js` in watch mode for quickly testing connection, etc.
