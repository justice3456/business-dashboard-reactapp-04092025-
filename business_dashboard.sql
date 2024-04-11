-- Create Database if not exists
CREATE DATABASE IF NOT EXISTS business_dashboard;

-- Use the created database
USE business_dashboard;

-- Create Inventory Table
CREATE TABLE IF NOT EXISTS Inventory (
    ItemID INT PRIMARY KEY AUTO_INCREMENT,
    ItemName VARCHAR(255),
    Description TEXT,
    Quantity INT,
    CostPrice DECIMAL(10, 2),
    SellingPrice DECIMAL(10, 2),
    DateAdded DATE,
    LastUpdated TIMESTAMP
);

-- Create Customers Table
CREATE TABLE IF NOT EXISTS Customers (
    CustomerID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255),
    Email VARCHAR(255),
    PhoneNumber VARCHAR(20),
    Address TEXT
);

-- Create Sales Table
CREATE TABLE IF NOT EXISTS Sales (
    SaleID INT PRIMARY KEY AUTO_INCREMENT,
    CustomerID INT,
    ItemID INT,
    DateOfSale DATE,
    TotalAmount DECIMAL(10, 2),
    PaymentMethod VARCHAR(50),
    Status VARCHAR(20),
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID),
    FOREIGN KEY (ItemID) REFERENCES Inventory(ItemID)
);

-- Create User Table
CREATE TABLE IF NOT EXISTS Users (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    Email VARCHAR(255),
    Password VARCHAR(255),
    Firstname VARCHAR(255),
    Lastname VARCHAR(255)
);
