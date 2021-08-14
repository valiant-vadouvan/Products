DROP DATABASE IF EXISTS products;
CREATE DATABASE products;

\c  products;

CREATE TABLE products (
    id SERIAL NOT NULL,
    name VARCHAR(32) NOT NULL,
    slogan VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(32) NOT NULL,
    default_price DECIMAL NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE features (
    id SERIAL NOT NULL,
    product_id INT NOT NULL,
    feature TEXT NOT NULL,
    value TEXT DEFAULT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE related_products (
    id INT NOT NULL,
    current_product_id INT NOT NULL,
    related_product_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (current_product_id) REFERENCES products(id)
);

CREATE TABLE styles (
    style_id INT NOT NULL,
    product_id INT NOT NULL,
    name VARCHAR(32) NOT NULL,
    sale_price INT,
    original_price INT NOT NULL,
    default_style BOOL NOT NULL,
    PRIMARY KEY (style_id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE photos (
    style_id INT NOT NULL,
    url TEXT NOT NULL,
    thumbnail_url TEXT NOT NULL,
    FOREIGN KEY (style_id) REFERENCES styles(style_id)
);

CREATE TABLE skus (
    id SERIAL NOT NULL,
    style_id INT NOT NULL,
    size TEXT NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (style_id) REFERENCES styles(style_id)
);

COPY products(id, name, slogan, description, category, default_price) FROM '/Users/nhumai/HackReactor/SDCProducts/data/product.csv' DELIMITER ',' CSV HEADER;

COPY features(id, product_id, feature, value) FROM '/Users/nhumai/HackReactor/SDCProducts/data/features.csv' WITH (FORMAT CSV, NULL 'null', HEADER);

COPY related_products(id, current_product_id, related_product_id) FROM '/Users/nhumai/HackReactor/SDCProducts/data/related.csv' DELIMITER ',' CSV HEADER;

COPY styles(style_id, product_id, name, sale_price, original_price, default_style) FROM '/Users/nhumai/HackReactor/SDCProducts/data/styles.csv' WITH (FORMAT CSV, NULL 'null', HEADER);

COPY photos(style_id, url, thumbnail_url) FROM '/Users/nhumai/HackReactor/SDCProducts/data/photos.csv' DELIMITER ',' CSV HEADER;

COPY skus(id, style_id, size, quantity) FROM '/Users/nhumai/HackReactor/SDCProducts/data/skus.csv' DELIMITER ',' CSV HEADER;