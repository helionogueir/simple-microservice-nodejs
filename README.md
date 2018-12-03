# simple-microservice-nodejs
Simple Micro-service with NodeJS

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Introduction 
Step by step to create environment for application execution. The instructions below are for Linux OS.

## Getting Started
1.	Install Docker
2.	Prepare Containers
3.	Execute Application

## Contribute
- [Helio Nogueira](mail:helio.nogueir@gmail.com)

---
## 1. Install Docker
For install Docker, follow the instructions in [Docker](https://www.docker.com/community-edition#/download).

---
## 2. Prepare Containers
Instructions for preparing application containers.

### 2.1. Packages
```bash
$ mkdir -p "${HOME}/workspace"
$ cd "${HOME}/workspace"
$ git clone "https://github.com/helionogueir/simple-microservice-nodejs.git"
$ cd "${HOME}/workspace/simple-microservice-nodejs"
$ cp "config.example.json" "config.json" 
```

### 2.2. Database Container
Follow the instructions below.

```bash
$ docker run \
    --name "simple-microservice-nodejs-database" \
    --env "MYSQL_ROOT_PASSWORD=root" \
    --detach "mysql:5.7"
```

#### 2.3. Populate Datase
Follow the instructions below.

```bash
$ docker exec -it "simple-microservice-nodejs-database" /bin/bash
$ mysql -uroot -proot
```

If you're seeing "mysql>" in your display, means you're connected. Now follow the instructions below. 

```sql
mysql> CREATE SCHEMA `simple-microservice-nodejs` DEFAULT CHARACTER SET utf8;
mysql> USE `simple-microservice-nodejs`;
mysql> CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(18) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `age` int(3) NOT NULL,
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
mysql> INSERT INTO `users` (`name`, `age`) VALUES ('August Maynard', '18');
INSERT INTO `users` (`name`, `age`) VALUES ('Owais Gibson', '57');
INSERT INTO `users` (`name`, `age`) VALUES ('Shay Tillman', '38');
INSERT INTO `users` (`name`, `age`) VALUES ('Ryley Klein', '11');
INSERT INTO `users` (`name`, `age`) VALUES ('Vinay Dunne', '12');
INSERT INTO `users` (`name`, `age`) VALUES ('Esme Wagstaff', '15');
INSERT INTO `users` (`name`, `age`) VALUES ('Skylar Olsen', '98');
INSERT INTO `users` (`name`, `age`) VALUES ('Manuel Butler', '112');
INSERT INTO `users` (`name`, `age`) VALUES ('Kamron Lam', '1');
INSERT INTO `users` (`name`, `age`) VALUES ('Buddy Gilmore', '33');
mysql> SELECT * FROM `users`;
```

### 2.4. Application Container
Follow the instructions below.

```bash
$ docker run \
    --name "simple-microservice-nodejs-application" \
    --volume "${HOME}/workspace/simple-microservice-nodejs":/var/www/application \
    --link "simple-microservice-nodejs-database" \
    --tty --interactive node:8.10 /bin/bash
```

## 3. Execute Application
Here you will prepare and execute the application. Follow the instructions below. You need connected on container "simple-microservice-nodejs-application".

```bash
$ cd "/var/www/application"
$ npm install
$ npm start
```
