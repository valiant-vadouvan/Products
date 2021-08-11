DROP TABLE IF EXISTS products;

CREATE DATABASE products;

USE products;

CREATE TABLE products.products (
  id SERIAL PRIMARY KEY,
  name TEXT, // change text to varchar
  slogan TEXT,
  description TEXT,
  category TEXT,
  default_price INT
);

CREATE TABLE products.features (
  id SERIAL PRIMARY KEY,
  feature TEXT,
  value TEXT,
  FOREIGN KEY (id) REFERENCES products(id)
);

CREATE TABLE products.styles (
  id SERIAL PRIMARY KEY,
  style_id INT,
  name TEXT,
  original_price INT,
  sale_price INT,
  default BOOLEAN,
  FOREIGN KEY (id) REFERENCES products(id)
);

CREATE TABLE products.photos (
  id SERIAL PRIMARY KEY,
  style_id INT,
  thumbnail_url TEXT,
  url TEXT,
  FOREIGN KEY (id) REFERENCES products(id)
);

CREATE TABLE products.skus (
  id SERIAL PRIMARY KEY,
  sku_id INT,
  quantity INT,
  size TEXT, // (enum, S/M/L, shoe size)
  FOREIGN KEY (id) REFERENCES products(id)
);

CREATE TABLE products.related (
  id SERIAL PRIMARY KEY,
  related_id INT,
  FOREIGN KEY (id) REFERENCES products(id)
);