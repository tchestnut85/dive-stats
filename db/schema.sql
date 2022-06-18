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

CREATE TABLE divers (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  is_instructor BOOLEAN DEFAULT FALSE NOT NULL,
  certification_id INTEGER REFERENCES certifications(id) ON DELETE SET NULL
);
