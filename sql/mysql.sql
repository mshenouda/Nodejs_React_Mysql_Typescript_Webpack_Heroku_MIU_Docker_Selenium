CREATE DATABASE IF NOT EXISTS reactapp;

USE testapp;
CREATE TABLE IF NOT EXISTS tutorials (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
    title NVARCHAR(25) NOT NULL, 
    description NVARCHAR(25) NOT NULL, 
    published BOOLEAN NOT NULL);

CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
    password NVARCHAR(50) NOT NULL, 
    userName NVARCHAR(50) NOT NULL);

CREATE TABLE IF NOT EXISTS loggers (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
    level NVARCHAR(12) NOT NULL, 
    func NVARCHAR(20) NOT NULL,  
    message NVARCHAR(100) NOT NULL);

use reactapp;
ALTER TABLE Users ADD CONSTRAINT UC_User UNIQUE (userName);
