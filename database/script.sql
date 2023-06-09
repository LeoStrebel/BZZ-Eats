drop database if exists bzzeats;
create database bzzeats;
use bzzeats;

CREATE TABLE restaurant (
  id INT PRIMARY KEY,
  restaurantname text,
  score double,
  ratings int,
  category varchar(255),
  full_address varchar(255)
);

CREATE TABLE menu (
  id INT PRIMARY KEY auto_increment,
  restaurantid int,
  menuname varchar(255),
  menudescription text,
  price double,
  FOREIGN KEY (restaurantid) REFERENCES restaurant(id)
);

