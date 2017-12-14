CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
item_id int auto_increment not null,
product_name varchar(255) null,
department_name varchar(255) null,
price int null,
stock_quantity int null,
primary key(item_id)
);


insert into
products (product_name,department_name,price,stock_quantity)
values
("Baseball Cards", "Sporting Goods", 2, 50),
("Athletic Shorts", "Sporting Goods", 30, 25),
("Nikes", "Shoes", 80, 15),
("Sandles", "Shoes", 15, 45),
("T-Shirt", "Clothing", 10, 60),
("Sweater", "Clothing", 24, 20),
("Cereal", "Grocery", 2, 100),
("Milk", "Grocery", 2, 55),
("CD", "Electronics", 9, 75),
("Headphones", "Electronics", 20, 18);
