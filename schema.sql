Drop database if exists employeedb;
CREATE DATABASE employeedb;

USE employeedb;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);
 
 CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL(10,2),
  department_id INT NULL,
  constraint fk_department FOREIGN KEY (department_id) REFERENCES department(id),
  PRIMARY KEY (id)
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NULL,
  manager_id INT NULL,
  constraint fk_role FOREIGN KEY (role_id) REFERENCES role(id),
  constraint fk_manager FOREIGN KEY (manager_id) REFERENCES employees(id),
  PRIMARY KEY (id)
);