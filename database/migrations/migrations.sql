Drop DATABASE ReIMG;
CREATE DATABASE ReIMG;

use ReIMG;

CREATE TABLE config (
	name VARCHAR(50) NOT NULL,
	value VARCHAR(200) NOT NULL
);

INSERT INTO config(name, value) VALUES('storage_dir', '');
