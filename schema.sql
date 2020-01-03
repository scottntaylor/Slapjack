-- Drops the blogger if it exists currently --
DROP DATABASE IF EXISTS slapjack_db;
-- Creates the "blogger" database --
CREATE DATABASE slapjack_db;

USE DATABASE slapjack_db;

CREATE TABLE card_Deck(
    Name VARCHAR(30) NOT NULL,
    Value Integer(2) NOT NULL

);

CREATE TABLE Users(
    User_name VARCHAR(30) NOT NULL,
    Score Integer(10) NOT Null
);
