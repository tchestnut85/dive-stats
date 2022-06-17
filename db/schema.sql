DROP DATABASE IF EXISTS diving_db;

CREATE DATABASE diving_db;

\c diving_db;

CREATE DOMAIN UNSIGNED AS INTEGER CHECK (VALUE > 0);

CREATE TABLE certifications (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  minimum_age UNSIGNED,
  required_hours UNSIGNED
);
