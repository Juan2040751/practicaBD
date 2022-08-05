-- Database: mande_db

-- DROP DATABASE mande_db;

CREATE DATABASE mande_db
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    TEMPLATE template0;

\c mande_db

CREATE TABLE Ptype(
	ptype_id SERIAL PRIMARY KEY,
	ptype VARCHAR(60),
	breed VARCHAR(60),
    pdescription  VARCHAR(60) DEFAULT ' '
);
CREATE TABLE Pet(
	pet_id SERIAL PRIMARY KEY,
	pet_name VARCHAR(60),
	age INT,
    ptype_id INT,
    FOREIGN KEY(ptype_id) REFERENCES Ptype(ptype_id)
);
CREATE TABLE Toy(
	toy_id SERIAL PRIMARY KEY,
	toy_name VARCHAR(60),
	color VARCHAR(60),
    pet_id INT,
    FOREIGN KEY(pet_id) REFERENCES Pet(pet_id)
);